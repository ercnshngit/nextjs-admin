'use client'

import { LogService } from '@/services/log.service'
import { useState } from 'react'

export default function UploadForm() {
  const [file, setFile] = useState<File>()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    try {
      const data = new FormData()
      data.set('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })
      // handle the error
      if (!res.ok) throw new Error(await res.text())
    } catch (e: any) {
      const logService = new LogService();
      await logService.createLog({ e });
      // Handle errors here
      console.error(e)
    }
  }

  return (
    <form className="mr-8" onSubmit={onSubmit}>
      <input
        type="file"
        name="file"
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <button type="submit" style={{ backgroundColor: 'blue', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px' }}>Yükle</button>

    </form>
  )
}
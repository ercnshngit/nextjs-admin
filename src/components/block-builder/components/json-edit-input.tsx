"use client";
import React, { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-json";

export default function JSONEditInput() {
  const [code, setCode] = useState([]);
  const [mode, setMode] = useState<"code" | "ui">("code");
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className="w-full relative">
      <pre>
        <code className={"language-json"}>{code}</code>
      </pre>
    </div>
  );
}

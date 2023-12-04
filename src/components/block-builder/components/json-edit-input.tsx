"use client";
import React, { useEffect, useState } from "react";
import "prismjs/themes/prism-tomorrow.css";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { highlight, languages } from "prismjs";
import Editor from "react-simple-code-editor";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css";

export default function JSONEditInput() {
  const [code, setCode] = useState('[{"dsfsdfds":"sdfsdfsdf"}]');
  const [mode, setMode] = useState<"edit" | "code" | "ui">("code");

  const parseCode = (code: string) => {
    try {
      return JSON.stringify(JSON.parse(code), null, 4);
    } catch (e) {
      console.log("hata", e);
      return code;
    }
  };

  const parsedCode = parseCode(code);
  return (
    <div className="w-full h-full flex flex-col gap-4 mt-4">
      <div className="flex items-center gap-2 self-end">
        <Switch
          id="ui-mode-switcher"
          checked={mode === "ui"}
          onCheckedChange={(checked) => setMode(checked ? "ui" : "code")}
        />
        <Label htmlFor="ui-mode-switcher">UI</Label>
      </div>
      {mode === "ui" && <div></div>}
      {mode === "code" && (
        <Editor
          value={parsedCode}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, languages.json, "json")}
          padding={10}
          className="w-full h-full rounded-md text-[#D4D4D4] bg-[#1E1E1E] "
        />
      )}
    </div>
  );
}

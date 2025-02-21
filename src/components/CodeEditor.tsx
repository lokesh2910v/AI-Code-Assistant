import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  code: string;
  language: string;
  onChange: (value: string | undefined) => void;
}

export function CodeEditor({ code, language, onChange }: CodeEditorProps) {
  const handleEditorWillMount = (monaco: any) => {
    monaco.editor.defineTheme('customTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1A1D23',
      },
    });
  };

  return (
    <Editor
      height="450px"
      language={language.toLowerCase()}
      theme="customTheme"
      value={code}
      onChange={onChange}
      beforeMount={handleEditorWillMount}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on',
        automaticLayout: true,
        scrollBeyondLastLine: false,
        lineNumbers: 'on',
        folding: true,
        lineDecorationsWidth: 0,
        padding: { top: 16, bottom: 16 },
      }}
    />
  );
}
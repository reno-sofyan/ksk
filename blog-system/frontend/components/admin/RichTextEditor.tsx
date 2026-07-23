'use client';

import { useEffect, useRef } from 'react';

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const editor = editorRef.current;

    if (editor && editor.innerHTML !== value) {
      editor.innerHTML = value;
    }
  }, [value]);

  function command(name: string, argument?: string) {
    document.execCommand(name, false, argument);
    onChange(editorRef.current?.innerHTML || '');
  }

  return (
    <div>
      <div className="editor-toolbar" aria-label="Editor toolbar">
        <button type="button" onClick={() => command('bold')}>B</button>
        <button type="button" onClick={() => command('italic')}>I</button>
        <button type="button" onClick={() => command('formatBlock', 'h2')}>H2</button>
        <button type="button" onClick={() => command('insertUnorderedList')}>List</button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt('URL link');
            if (url) command('createLink', url);
          }}
        >
          Link
        </button>
        <button type="button" onClick={() => command('removeFormat')}>Clear</button>
      </div>
      <div
        ref={editorRef}
        className="editor"
        contentEditable
        role="textbox"
        aria-multiline="true"
        onInput={() => onChange(editorRef.current?.innerHTML || '')}
        suppressContentEditableWarning
      />
    </div>
  );
}

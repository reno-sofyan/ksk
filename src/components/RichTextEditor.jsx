import React, { useEffect, useRef } from 'react';
import { sanitizeArticleHtml } from '@/lib/blogContent.js';

const COMMANDS = [
  ['formatBlock', 'p', 'Paragraf'],
  ['formatBlock', 'h2', 'H2'],
  ['formatBlock', 'h3', 'H3'],
  ['bold', null, 'Bold'],
  ['italic', null, 'Italic'],
  ['insertOrderedList', null, '1. List'],
  ['insertUnorderedList', null, '• List'],
  ['formatBlock', 'blockquote', 'Quote']
];

const RichTextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = sanitizeArticleHtml(value) || value || '';
    }
  }, [value]);

  const emitChange = () => {
    onChange(sanitizeArticleHtml(editorRef.current?.innerHTML || ''));
  };

  const runCommand = (command, argument) => {
    editorRef.current?.focus();
    document.execCommand(command, false, argument);
    emitChange();
  };

  const addLink = () => {
    const href = window.prompt('Masukkan URL link:');
    if (href) runCommand('createLink', href);
  };

  const addImage = () => {
    const src = window.prompt('Masukkan URL gambar:');
    if (!src) return;
    const alt = window.prompt('Masukkan alt text gambar:') || '';
    runCommand('insertHTML', `<img src="${src.replaceAll('"', '&quot;')}" alt="${alt.replaceAll('"', '&quot;')}">`);
  };

  return (
    <div className="overflow-hidden rounded-md border border-input bg-white">
      <div className="flex flex-wrap gap-1 border-b border-primary/10 bg-secondary/50 p-2" aria-label="Toolbar editor artikel">
        {COMMANDS.map(([command, argument, label]) => (
          <button key={label} type="button" className="rounded border border-primary/10 bg-white px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-accent" onClick={() => runCommand(command, argument)}>
            {label}
          </button>
        ))}
        <button type="button" className="rounded border border-primary/10 bg-white px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-accent" onClick={addLink}>Link</button>
        <button type="button" className="rounded border border-primary/10 bg-white px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-accent" onClick={addImage}>Gambar</button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="min-h-72 px-4 py-3 text-base leading-8 text-foreground outline-none [&_a]:text-primary [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-accent [&_blockquote]:pl-4 [&_h2]:mt-7 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-bold [&_img]:my-5 [&_img]:max-w-full [&_ol]:ml-6 [&_ol]:list-decimal [&_ul]:ml-6 [&_ul]:list-disc"
        onInput={emitChange}
        onBlur={emitChange}
        data-placeholder="Tulis isi artikel di sini..."
      />
    </div>
  );
};

export default RichTextEditor;

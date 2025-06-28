import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Link from "@tiptap/extension-link";
import Code from "@tiptap/extension-code";
import TextAlign from "@tiptap/extension-text-align";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Image from "@tiptap/extension-image";
import { useEffect } from "react";

export default function BlogEditor({
  content,
  setContent,
}: {
  content: string;
  setContent: (value: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // disable default heading
      }),
      Heading.configure({ levels: [1, 2, 3] }),
      Bold,
      Italic,
      Underline,
      BulletList,
      OrderedList,
      ListItem,
      Link,
      Code,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Subscript,
      Superscript,
      Image,
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose max-w-none min-h-[300px] focus:outline-none px-4 py-2 border border-gray-300 rounded-md",
      },
    },
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b pb-2 mb-2">
        <button onClick={() => editor.chain().focus().undo().run()} className="btn">↶</button>
        <button onClick={() => editor.chain().focus().redo().run()} className="btn">↷</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className="btn">H1</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className="btn">H2</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="btn">•</button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="btn">1.</button>
        <button onClick={() => editor.chain().focus().toggleBold().run()} className="btn font-bold">B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className="btn italic">I</button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="btn underline">U</button>
        <button onClick={() => editor.chain().focus().toggleCode().run()} className="btn">{"</>"}</button>
        <button onClick={() => editor.chain().focus().setTextAlign("left").run()} className="btn">←</button>
        <button onClick={() => editor.chain().focus().setTextAlign("center").run()} className="btn">≡</button>
        <button onClick={() => editor.chain().focus().setTextAlign("right").run()} className="btn">→</button>
        <button onClick={() => {
          const url = prompt("Enter image URL");
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }} className="btn">🖼</button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}

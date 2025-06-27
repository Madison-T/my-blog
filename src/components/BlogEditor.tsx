import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function BlogEditor({
    content,
    setContent,
}: {
    content: string;
    setContent: (value: string) => void;
}) {
    const editor = useEditor({
        extensions: [StarterKit],
        content,
        onUpdate({ editor }) {
            setContent(editor.getHTML());
        },
    });

    return (
        <div className="editor-box">
            <EditorContent editor={editor} />
        </div>
    );
}
import { useState } from "react";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

export default function Page() {
  const [content, setContent] = useState("");

  return (
    <div className="min-h-screen bg-[var(--background)] px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <SimpleEditor content={content} onUpdate={setContent} />
      </div>
    </div>
  );
}

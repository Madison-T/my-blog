import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useAuth } from "@/context/AuthContext";
import { useEditorContext } from "../components/tiptap-templates/simple/use-editor-context";
import { collection, addDoc, Timestamp, query, where, getDocs } from "firebase/firestore";
import  { db } from "@/lib/firebase";

function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") //remove nonword characters
    .replace(/\s+/g,"-") // replace spaces with dashes
    .replace(/--+/g, "-"); //collapse multiple dashes
}

async function getUniqueSlug(title: string): Promise<string> {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const q = query(collection(db, "posts"), where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (snapshot.empty){
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

// Dynamically import SimpleEditor to avoid SSR issues
const SimpleEditor = dynamic(
  () => import("@/components/tiptap-templates/simple/simple-editor").then(mod => mod.SimpleEditor),
  { ssr: false }
);

function EditorContentTracker({ onChange }: { onChange: (html: string) => void }) {
  const { editor } = useEditorContext();
  useEffect(() => {
  if (!editor) return;

  const update = () => onChange(editor.getHTML());
  editor.on("update", update);

  return () => {
    editor.off("update", update);
  };
}, [editor, onChange]);

  return null;
}

export default function EditorPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [user, router]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content are required.");
      return;
    }

    try {
      const slug = await getUniqueSlug(title);

      const docRef = await addDoc(collection(db, "posts"), {
        title: title.trim(),
        slug,
        content,
        createdAt: Timestamp.now(),
      });
      alert("Post saved!");
      router.push(`/posts/${slug}`);
    } catch (err) {
      console.error("Error saving post:", err);
      alert("Failed to save post. Check console for details");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen max-h-screen overflow-y-auto bg-[var(--background)] px-4 py-6 sm:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Blog Editor</h1>
          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="px-4 py-2 bg-[var(--accent-blue)] hover:bg-[var(--accent-hover)] text-white rounded-md transition"
          >
            Log Out
          </button>
        </div>

        {/* Title input */}
        <input
          type="text"
          placeholder="Enter post title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-lg bg-[var(--background)]"
        />

        <div className="relative max-h-[80vh] overflow-y-auto">
          <SimpleEditor content={content} onUpdate={setContent} />
        </div>
        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-[var(--accent-blue)] hover:bg-[var(--accent-hover)] text-white py-3 rounded-md text-lg font-medium transition"
        >
          Save Draft
        </button>
      </div>
    </div>
  );
}

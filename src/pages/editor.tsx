import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import BlogEditor from "@/components/BlogEditor";

export default function EditorPage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        if(user === null) {
            router.push("/login");
        } else {
            setLoading(false);
        }
    }, [user, router]);

    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    const handleSave = () => {
        console.log("Post Saved:", { title, content });
        // next step
    };

    return (
        <div className="editor-container">
            <div className="editor-header">
                <h1 className="editor-title">Blog Editor</h1>
                <button
                onClick={() => {
                    logout();
                    router.push("/");
                }}
                className="primary-button"
                >
                    Log Out
                </button>
            </div>
            <input 
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-style"
            />
            
            <BlogEditor content={content} setContent={setContent} />

            <button onClick={handleSave} className="primary-button">
                Save Draft
            </button>
        </div>
    );
}
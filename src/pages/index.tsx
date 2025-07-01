import Link from "next/link";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // NEW

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const results = snapshot.docs.map(doc => doc.data());
        setPosts(results);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      } finally {
        setLoading(false); // Done fetching
      }
    };
    fetchPosts();
  }, []);

return (
  <div className="min-h-screen max-h-screen overflow-y-auto bg-[var(--background)] px-4 py-8">
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-[var(--foreground)]">Published Posts</h1>
      {loading ? (
          <p className="text-[var(--secondary-text)]">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-[var(--secondary-text)]">No posts found.</p>
        ) : (
        posts.map((post) => (
          <div key={post.slug} className="bg-white shadow rounded-md p-6">
            <Link
              href={`/posts/${post.slug}`}
              className="text-xl font-semibold text-[var(--accent-blue)] hover:underline"
            >
              {post.title}
            </Link>
            <div
              className="text-[var(--secondary-text)] mt-2 line-clamp-3 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        ))
      )}
    </div>
  </div>
);

}

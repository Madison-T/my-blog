import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function PostPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      const q = query(collection(db, "posts"), where("slug", "==", slug));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        setPost(snapshot.docs[0].data());
      } else {
        setPost(null);
      }
    };

    fetchPost();
  }, [slug]);

  if (post === null) {
    return <p className="p-6">Loading or not found...</p>;
  }

return (
  <div className="min-h-screen max-h-screen overflow-y-auto bg-[var(--background)] px-4 py-8 pb-24">
    <h1 className="max-w-3xl mx-auto text-[2.25rem] font-bold mb-4 px-4">{post.title}</h1>
    <div className="max-w-3xl mx-auto bg-white shadow rounded-md p-6">
      <div className="prose max-w-none dark:prose-invert">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  </div>
);
}

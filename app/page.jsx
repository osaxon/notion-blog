import FeaturedPosts from "@/components/Organisms/FeaturedPosts";
import { getFeaturedPosts } from "@/utils/notion";

export default async function Home() {
    const { posts } = await getFeaturedPosts();
    return (
        <main className="mx-auto min-h-screen top-0">
            <FeaturedPosts posts={posts} />
            <section className="layout h-[70vh]"></section>
        </main>
    );
}

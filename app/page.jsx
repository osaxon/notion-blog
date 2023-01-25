import FeaturedPosts from "@/components/Organisms/FeaturedPosts";
import { getFeaturedPosts } from "@/utils/notion";
import { getAllPosts } from "@/lib/notionAPI";
import NotionPage from "./NotionPage";

export default async function Home() {
    const { posts } = await getFeaturedPosts();
    // const allPosts = await getAllPosts();
    // console.log(allPosts);
    return (
        <main className="mx-auto min-h-screen top-0">
            <FeaturedPosts posts={posts} />
            {/* <section className="layout h-[70vh]">
                <NotionPage recordMap={allPosts} />
            </section> */}
        </main>
    );
}

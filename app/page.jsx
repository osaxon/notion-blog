import { FeaturedPosts, LatestPost } from "../components/Organisms";
import { getFeaturedPosts } from "../utils/notion";

export default async function Home() {
    const { posts } = await getFeaturedPosts({ limit: 6 });
    // const allPosts = await getAllPosts();
    // console.log(allPosts);
    return (
        <main className="mx-auto min-h-screen top-0 flex flex-col gap-10">
            <LatestPost post={posts[0]} />
            <FeaturedPosts posts={posts} />
        </main>
    );
}

export const revalidate = 60;

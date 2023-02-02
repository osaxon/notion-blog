import {
    FeaturedPosts,
    LatestPost,
    LatestPhotos,
} from "../components/Organisms";
import { getFeaturedPosts } from "../utils/notion";

export default async function Home({ searchParams: { image } }) {
    const { posts } = await getFeaturedPosts({ limit: 6 });
    return (
        <main className="mx-auto min-h-screen top-0 flex flex-col gap-10">
            <LatestPost post={posts[0]} />
            <FeaturedPosts posts={posts} />
            <LatestPhotos image={image} />
        </main>
    );
}

export const revalidate = 60;

import {
    FeaturedPosts,
    LatestPost,
    LatestPhotos,
} from "../components/Organisms";
import AboutUs from "../components/Organisms/AboutUs";
import { getFeaturedPosts } from "../utils/notion";

export default async function Home({ searchParams: { image } }) {
    const { posts } = await getFeaturedPosts({ limit: 6 });
    return (
        <main className="top-0 mx-auto flex min-h-screen flex-col gap-10">
            <LatestPost post={posts[0]} />
            <AboutUs />
            <FeaturedPosts posts={posts.slice(1)} />
            <LatestPhotos image={image} />
        </main>
    );
}

export const revalidate = 60;

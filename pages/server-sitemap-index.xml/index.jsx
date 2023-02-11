import { getServerSideSitemapIndex } from "next-sitemap";
import { getPosts } from "../../utils/notion";
import { getPostSlug } from "../../lib/helpers";
import siteConfig from "../../site.config";

const { url } = siteConfig;

export async function getServerSideProps(ctx) {
    const { posts } = await getPosts();

    return getServerSideSitemapIndex(
        ctx,
        posts.map((post) => `${url}/${getPostSlug(post)}`)
    );
}

export default function SitemapIndex() {}

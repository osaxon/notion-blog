import Image from "next/image";
import Link from "next/link";
import {
    getFeaturedPosts,
    getPostsByTag,
    getTags,
    likePage,
} from "@/utils/notion";
import {
    getPostCoverImage,
    getPostTitle,
    getPostSlug,
    getPostExcerpt,
} from "@/lib/helpers";
import { ScreenSizes, ContainerSizes } from "../Atoms/TailwindContainerSizes";

export default async function FeaturedPosts() {
    const { posts } = await getFeaturedPosts();

    function nextSlide(current) {
        const total = posts.length;
        if (current < posts.length) {
            return current + 1;
        } else if (current == posts.length) {
            return 1;
        }
    }

    function previousSlide(current) {
        const total = posts.length;
        if (current > 1) {
            return current - 1;
        } else if (current == 1) {
            return posts.length;
        }
    }

    return (
        <section className="h-[70vh] w-full relative">
            <div className="absolute inset-0">
                <ul className="w-full carousel min-h-full">
                    {posts &&
                        posts.map((post, index) => (
                            <li
                                className="relative carousel-item w-full min-h-full"
                                key={post.id}
                                id={`slide${index + 1}`}
                            >
                                <Image
                                    src={getPostCoverImage(post)}
                                    fill
                                    alt="cover image"
                                    className="absolute -z-50 object-cover"
                                />
                                <div className="absolute layout flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a
                                        href={`#slide${previousSlide(
                                            index + 1
                                        )}`}
                                        className="btn btn-circle text-base-content bg-secondary-content border-0 bg-opacity-50"
                                    >
                                        ❮
                                    </a>
                                    <a
                                        href={`#slide${nextSlide(index + 1)}`}
                                        className="btn btn-circle text-base-content bg-secondary-content border-0 bg-opacity-50"
                                    >
                                        ❯
                                    </a>
                                </div>
                                <div className="flex items-end w-full">
                                    <div className="w-full bg-secondary-content backdrop-blur-sm bg-opacity-40">
                                        <Link href={`/${getPostSlug(post)}`}>
                                            <div className="text-base-content  layout">
                                                <h2 className="text-3xl font-bold">
                                                    {getPostTitle(post)}
                                                </h2>
                                                <p className="text-2xl">
                                                    {getPostExcerpt(post)}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </section>
    );
}

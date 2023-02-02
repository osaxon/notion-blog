"use client";
import Link from "next/link";

import { FeaturedCard } from "../Molecules";

import React from "react";

export default function FeaturedPosts({ posts }) {
    return (
        <section className="layout py-3 @container h-full flex flex-col items-start">
            <h2 className="text-4xl font-bold bg-primary text-base-100 mb-2">
                {"/// Featured Posts"}
            </h2>
            <ul className="grid grid-cols-1 @xl:grid-cols-2 gap-3 w-full">
                {posts &&
                    posts.map((post) => {
                        return (
                            <li key={post.id}>
                                <FeaturedCard post={post} />
                            </li>
                        );
                    })}

                <Link
                    className="h-full border bg-primary text-primary-content text-3xl font-bold"
                    href="/"
                >
                    View More...
                </Link>
            </ul>
        </section>
    );
}

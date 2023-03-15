"use client";
import Link from "next/link";

import { FeaturedCard } from "../Molecules";

import React from "react";

export default function FeaturedPosts({ posts }) {
    return (
        <section className="layout flex h-full flex-col items-start py-3 @container">
            <h2 className="mb-2 bg-primary text-4xl font-bold text-base-100">
                {"/// Featured Posts"}
            </h2>
            <ul className="grid w-full grid-cols-1 gap-3 @xl:grid-cols-2">
                {posts &&
                    posts.map((post) => {
                        return (
                            <li key={post.id}>
                                <FeaturedCard post={post} />
                            </li>
                        );
                    })}
            </ul>
        </section>
    );
}

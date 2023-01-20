import React from "react";

const PostSkeleton = () => {
    return (
        <section className="flex gap-x-4 py-10 w-full ">
            <div className="flex flex-col gap-2 w-full h-screen">
                <h1 className="h-10 bg-primary-content bg-opacity-25 animate-pulse rounded-md" />
                <div className="h-80 w-full bg-primary-content bg-opacity-25 animate-pulse rounded-md" />
                <br />
                <div className="h-8 bg-primary-content bg-opacity-20 animate-pulse rounded-md" />
                <div className="h-6 bg-primary-content bg-opacity-20 animate-pulse rounded-md" />
                <div className="h-6 bg-primary-content bg-opacity-20 animate-pulse rounded-md" />
                <div className="h-6 bg-primary-content bg-opacity-20 animate-pulse rounded-md" />
                <br />
                <div className="h-8 bg-primary-content bg-opacity-20 animate-pulse rounded-md" />
                <div className="h-6 bg-primary-content bg-opacity-20 animate-pulse rounded-md" />
                <div className="h-6 bg-primary-content bg-opacity-20 animate-pulse rounded-md" />
                <div className="h-6 bg-primary-content bg-opacity-20 animate-pulse rounded-md" />
            </div>
            <aside className="hidden ml-4 mt-12 sm:block basis-40 md:basis-44 lg:basis-60 shrink-0">
                <div className="w-full sticky top-20 justify-start gap-y-10 h-[450px] bg-primary-content animate-pulse flex flex-col" />
            </aside>
        </section>
    );
};

export default PostSkeleton;

import React from "react";

const HomeSkeleton = () => {
    return (
        <div className="h-[100vh] bg-base-200 fixed inset-0 animate-pulse flex flex-col items-center justify-center">
            <p className="font-bold font-mono">Loading...</p>
        </div>
    );
};

export default HomeSkeleton;

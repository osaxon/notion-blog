import React from "react";

const messages = ["Hang on...", "Wait a sec", "Beep boop...", "One min..."];

const HomeSkeleton = () => {
    return (
        <div className="flex h-[100vh] animate-pulse flex-col items-center justify-center bg-base-200">
            <p>{messages[Math.floor(Math.random() * messages.length)]}</p>
            <progress className="progress w-56"></progress>
        </div>
    );
};

export default HomeSkeleton;

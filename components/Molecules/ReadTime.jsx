"use client";

import React, { useEffect, useState } from "react";

function calcReadTime(wordCount) {
    const wpm = 255;
    return Math.ceil(wordCount / wpm);
}

const ReadTime = () => {
    const [wordCount, setWordCount] = useState(0);

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll("p, h2"))
            .map((element) => element.textContent)
            .join(" ");
        const words = elements.split(" ");
        let wordCount = 0;
        words.forEach((word) => {
            if (word.trim() !== "") {
                wordCount++;
            }
        });
        setWordCount(wordCount);
    }, []);

    return (
        <span className="italic font-mono text-base-content">
            {calcReadTime(wordCount)}m read
        </span>
    );
};

export default ReadTime;

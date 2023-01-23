"use client";

import React, { useEffect, useState, useRef } from "react";

function calcReadTime(wordCount) {
    const wpm = 255;
    return Math.ceil(wordCount / wpm);
}

const ReadTime = () => {
    const [wordCount, setWordCount] = useState(0);
    let readTime = useRef();

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
        readTime.current = calcReadTime(wordCount);
    }, []);

    return (
        <span className="italic font-mono text-base-content">
            {readTime.current}m read
        </span>
    );
};

export default ReadTime;

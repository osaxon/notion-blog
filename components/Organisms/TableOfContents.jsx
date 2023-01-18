"use client";
import React, { useState, useEffect } from "react";
import useScrollSpy from "@/hooks/useScrollSpy";

function useHeadings() {
    const [headings, setHeadings] = useState([]);

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll("h2, h3, h4"))
            .filter((element) => element.id)
            .map((element) => ({
                id: element.id,
                text: element.textContent ?? "",
                level: Number(element.tagName.substring(1)),
            }));
        setHeadings(elements);
    }, []);
    return headings;
}

const TableOfContents = () => {
    const headings = useHeadings();
    const activeId = useScrollSpy(
        headings.map(({ id }) => id),
        { rootMargin: "0% 0% -25% 0%" }
    );

    return (
        <nav className="overflow-auto pb-4">
            <ul className="mt-4 flex flex-col space-y-2">
                {headings.map((heading) => (
                    <li key={heading.id}>
                        <a
                            style={{
                                marginLeft: `${heading.level - 2}em`,
                                fontWeight:
                                    activeId === heading.id ? "bold" : "normal",
                            }}
                            href={`#${heading.id}`}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default TableOfContents;

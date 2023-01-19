"use client";
import React, { useState, useEffect } from "react";
import useScrollSpy from "@/hooks/useScrollSpy";
import clsx from "clsx";

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
        <nav>
            <ul className="mt-4 flex flex-col space-y-2">
                {headings.map((heading) => (
                    <li key={heading.id}>
                        <a
                            className={clsx(
                                "font-medium text-xl",
                                activeId === heading.id
                                    ? "font-bold"
                                    : "font-normal"
                            )}
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

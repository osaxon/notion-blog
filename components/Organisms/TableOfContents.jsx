"use client";
import React, { useState, useEffect } from "react";
import useScrollSpy from "../../hooks/useScrollSpy";
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
        console.log(headings);
    }, []);
    return headings;
}

const TableOfContents = () => {
    const headings = useHeadings();
    const activeId = useScrollSpy(
        headings.map(({ id }) => id),
        { rootMargin: "0% 0% 50% 0%" }
    );

    return (
        <nav className="hidden lg:block">
            <p className="font-bold text-lg py-4">Contents:</p>
            <ul className="flex flex-col space-y-1">
                {headings.map((heading) => (
                    <li key={heading.id}>
                        <a
                            className={clsx(
                                "font-medium text-primary text-lg",
                                activeId === heading.id
                                    ? "font-bold text-success"
                                    : "font-normal",
                                heading.level === 3 ? "ml-2 text-base" : ""
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

"use client";
import Link from "next/link";
import clsx from "clsx";

import React, { useRef } from "react";

const buttonConfig = {
    blue: "bg-blue-400 text-blue-50 border",
    orange: "bg-orange-400 text-orange-50",
    green: "bg-green-400 text-green-50",
    red: "bg-red-400 text-red-50",
    purple: "bg-purple-400 text-purple-50",
    yellow: "bg-yellow-400 text-yellow-50",
    gray: "bg-gray-400 text-gray-50",
};

const TagButton = ({ tag }) => {
    return (
        <Link
            className={clsx(
                `rounded-md px-2 py-1 bg-opacity-60 shadow ${
                    buttonConfig[tag.color]
                }`
            )}
            href="/"
        >
            {tag.name}
        </Link>
    );
};

export default TagButton;

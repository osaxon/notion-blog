"use client";
import Link from "next/link";
import clsx from "clsx";

import React, { useRef } from "react";

const buttonConfig = new Map();
buttonConfig.set("blue", "bg-info text-blue-50 border");
buttonConfig.set("orange", "bg-orange-400 text-orange-50");
buttonConfig.set("green", "bg-success text-green-50");
buttonConfig.set("red", "bg-error text-red-50");
buttonConfig.set("purple", "bg-purple-400 text-purple-50");
buttonConfig.set("yellow", "bg-yellow-400 text-yellow-50");
buttonConfig.set("gray", "bg-primary text-gray-50");
buttonConfig.set("default", "bg-primary text-primary-content");

const TagButton = ({ tag }) => {
    return (
        <Link
            className={clsx(
                `rounded-md bg-opacity-60 px-2 py-1 shadow ${buttonConfig.get(
                    tag.color
                )}`
            )}
            href="/"
        >
            {tag.name}
        </Link>
    );
};

export default TagButton;

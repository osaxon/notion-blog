import siteConfig from "../site.config";
import React from "react";

const SEO = ({ title, postPage = false }) => {
    const slug = postPage ? title : null;
    return (
        <>
            <title>{title}</title>
            <meta
                content="width=device-width, initial-scale=1"
                name="viewport"
            />
            <meta name="robots" content={siteConfig.robots} />
            <meta name="description" content={siteConfig.description} />
            <link
                rel="canonical"
                href={!slug ? siteConfig.url : `${siteConfig.url}/${slug}`}
            />
            {/* Open Graph */}
            <meta property="og:type" content={siteConfig.type} />
            <meta property="og:site_name" content={siteConfig.name} />
            <meta property="og:description" content={siteConfig.description} />
            <meta property="og:title" content={siteConfig.title} />
            <meta name="image" property="og:image" content={siteConfig.image} />
            {/* Favicons */}
            {favicons.map((linkProps) => (
                <link key={linkProps.href} {...linkProps} />
            ))}
        </>
    );
};

const favicons = [
    {
        rel: "apple-touch-icon",
        sizes: "70x70",
        href: "/favicon/apple-icon-70x70.png",
    },
    {
        rel: "apple-touch-icon",
        sizes: "144x144",
        href: "/favicon/apple-icon-144x144.png",
    },
    {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        href: "/favicon/android-icon-192x192.png",
    },
    {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon/favicon-32x32.png",
    },
    {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon/favicon-16x16.png",
    },
    {
        rel: "manifest",
        href: "/favicon/site.webmanifest.json",
    },
];

export default SEO;

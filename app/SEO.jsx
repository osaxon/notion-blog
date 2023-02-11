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
        </>
    );
};

export default SEO;

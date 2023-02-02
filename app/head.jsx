import siteConfig from "../site.config";

export default function Head() {
    return (
        <>
            <title>{siteConfig.title}</title>
            <meta
                content="width=device-width, initial-scale=1"
                name="viewport"
            />
            <meta name="description" content={siteConfig.description} />
        </>
    );
}

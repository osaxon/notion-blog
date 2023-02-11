import SEO from "./SEO";
import siteConfig from "../site.config";

export default function Head() {
    return <SEO title={siteConfig.title} />;
}

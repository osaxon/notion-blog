import SEO from "../SEO";

export default function Head({ params: { slug } }) {
    return <SEO title={slug} postPage={true} />;
}

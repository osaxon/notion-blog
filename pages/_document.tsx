import Document, { Head, Html, Main, NextScript } from "next/document";
import SEO from "../app/SEO";

class MyDocument extends Document {
    render() {
        return (
            <Html data-theme="lofi" lang="en">
                <Head>
                    <SEO title="Gallery page" />
                </Head>
                <body className="bg-black antialiased">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css";

// used for rendering equations (optional)
import "katex/dist/katex.min.css";
import { Source_Code_Pro } from "@next/font/google";
const sourceCodePro = Source_Code_Pro({ subsets: ["latin"] });

import "../styles/index.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import AppWrapper from "./AppWrapper";

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-theme="lofi">
            <head />

            <body className={sourceCodePro.className}>
                <Header />
                <AppWrapper>{children}</AppWrapper>
                <Footer />
            </body>
        </html>
    );
}

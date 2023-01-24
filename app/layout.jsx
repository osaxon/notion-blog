import "./globals.css";
import Header from "@/components/Header";
import AppWrapper from "./AppWrapper";
import { Suspense } from "react";
import HomeSkeleton from "./HomeSkeleton";

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-theme="emerald">
            {/*
        <head /> will contain the components returned by the nearest parent
        head.jsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
            <head />

            <body>
                <Header />
                <AppWrapper>{children}</AppWrapper>
            </body>
        </html>
    );
}

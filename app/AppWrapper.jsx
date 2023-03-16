"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRef } from "react";

export default function AppWrapper({ children }) {
    const queryClient = useRef(
        new QueryClient({
            defaultOptions: {
                retry: false,
            },
        })
    );

    return (
        <QueryClientProvider client={queryClient.current}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

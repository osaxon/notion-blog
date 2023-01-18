"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef } from "react";

export default function AppWrapper({ children }) {
  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        retry: false,
        staleTime: 5 * 60 * 1000,
      },
    })
  );
  return (
    <QueryClientProvider client={queryClient.current}>
      {children}
    </QueryClientProvider>
  );
}

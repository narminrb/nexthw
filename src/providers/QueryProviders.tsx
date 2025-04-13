"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const QueryProvider = ({
  children,
}: {
  readonly children: React.ReactNode;
}) => {
  const queryClinet = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClinet}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
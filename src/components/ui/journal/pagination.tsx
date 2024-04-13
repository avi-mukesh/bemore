"use client";

import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

type PropsType = {
  totalPages: number;
};

const generatePagination = (currentPage: number, totalPages: number) => {
  // if total number of pages is 7 or less
  // display all pages without any ellipsis
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // if current page is among the first 3 pages,
  // show the first 3 , an ellipsis, and the last 2 pages
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // if current page is among the last 3
  // show the first 2, an ellipsis and the last 3
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // if the current page is somewhere in the middle
  // show the first page, an ellipsis, the current page and its neighbours
  // another ellipsis and the last page
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export default function JournalPagination({ totalPages }: PropsType) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        {allPages.map((page, index) => (
          <PaginationItem key={page}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink href={createPageURL(page)}>{page}</PaginationLink>
            )}
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
}

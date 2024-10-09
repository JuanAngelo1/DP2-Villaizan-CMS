import { useState } from "react";

interface PaginationProps<T> {
  items: any[];
  startingEntriesPerPage: number;
}

function usePagination<T>({ items, startingEntriesPerPage }: PaginationProps<T>) {
  const [page, setPage] = useState<number>(1);
  const [entriesPerPage, setEntriesPerPage] = useState<number>(startingEntriesPerPage);
  const totalPages = items.length !== 0 ? Math.ceil(items.length / entriesPerPage) : 0;
  const currentPageItems: T[] = items.slice((page - 1) * entriesPerPage, page * entriesPerPage);

  const nextPage = () => {
    setPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const prevPage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return {
    page,
    entriesPerPage,
    setEntriesPerPage,
    totalPages,
    currentPageItems,
    nextPage,
    prevPage,
  };
}
export default usePagination;

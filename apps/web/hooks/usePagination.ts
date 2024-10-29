import { useEffect, useMemo, useState } from "react";

interface PaginationProps<T> {
  items: any[];
  startingEntriesPerPage: number;
  filters?: any[]; // Optional filters
  filterFunction?: (item: T) => boolean; // Optional filter function
}

function usePagination<T>({
  items,
  startingEntriesPerPage,
  filters = [],
  filterFunction,
}: PaginationProps<T>) {
  const [page, setPage] = useState<number>(1);
  const [entriesPerPage, setEntriesPerPage] = useState<number>(startingEntriesPerPage);

  const filteredItems = useMemo(() => {
    return filterFunction ? items.filter(filterFunction) : items;
  }, [items, filterFunction]);

  const totalPages = filteredItems.length !== 0 ? Math.ceil(filteredItems.length / entriesPerPage) : 0;
  const currentPageItems: T[] = filteredItems.slice((page - 1) * entriesPerPage, page * entriesPerPage);
  const indexOfFirstItemOfCurrentPage = filteredItems.length === 0 ? 0 : (page - 1) * entriesPerPage + 1;
  const indexOfLastItemOfCurrentPage =
    page * entriesPerPage > filteredItems.length ? filteredItems.length : page * entriesPerPage;

  useEffect(() => {
    setPage(1);
  }, [...filters, entriesPerPage]);

  useEffect(() => {
    if (entriesPerPage === 0) setPage(1);
  }, [entriesPerPage]);

  const changeEntriesPerPage = (newEntriesPerPage: string) => {
    if (newEntriesPerPage === "") {
      setEntriesPerPage(1);
      return;
    }
    if (isNaN(parseInt(newEntriesPerPage))) return;
    if (parseInt(newEntriesPerPage) < 1 || parseInt(newEntriesPerPage) > 20) return;

    setEntriesPerPage(parseInt(newEntriesPerPage));
  };

  const nextPage = () => {
    setPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const prevPage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return {
    page,
    totalPages,
    entriesPerPage,
    setEntriesPerPage: changeEntriesPerPage,
    allFilteredItems: filteredItems,
    indexOfFirstItemOfCurrentPage,
    indexOfLastItemOfCurrentPage,
    currentPageItems,
    nextPage,
    prevPage,
  };
}
export default usePagination;

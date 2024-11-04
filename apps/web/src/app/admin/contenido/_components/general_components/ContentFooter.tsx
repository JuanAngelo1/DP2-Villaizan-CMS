import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@repo/ui/components/button";

function ContentFooter({
  page,
  totalPages,
  allFilteredItems,
  indexOfFirstItemOfCurrentPage,
  indexOfLastItemOfCurrentPage,
  prevPage,
  nextPage,
  itemName = "items",
}: {
  page: number;
  totalPages: number;
  allFilteredItems: any[];
  indexOfFirstItemOfCurrentPage: number;
  indexOfLastItemOfCurrentPage: number;
  prevPage: () => void;
  nextPage: () => void;
  itemName?: string;
}) {
  return (
    <section className="mt-1 flex flex-row items-center justify-between">
      <div className="flex items-center gap-1 text-xs sm:text-sm">
        <span className="hidden sm:flex">Mostrando </span>
        <span className="font-bold">{`${indexOfFirstItemOfCurrentPage}-${indexOfLastItemOfCurrentPage}`}</span>{" "}
        de <span className="font-bold">{allFilteredItems.length}</span> {itemName}
      </div>
      <div className="flex items-center space-x-3">
        <Button variant={"secondary"} onClick={prevPage} disabled={page === 1} className="text-xs sm:text-sm">
          <ChevronLeft className="h-4 w-4 shrink-0 sm:hidden" />
          <p className="hidden sm:block">Anterior</p>
        </Button>
        <p className="text-xs sm:text-sm">{`${page} / ${totalPages}`}</p>
        <Button
          variant={"secondary"}
          onClick={nextPage}
          disabled={page === totalPages || totalPages === 0}
          className="text-xs sm:text-sm"
        >
          <ChevronRight className="h-4 w-4 shrink-0 sm:hidden" />
          <p className="hidden sm:block">Siguiente</p>
        </Button>
      </div>
    </section>
  );
}
export default ContentFooter;

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
    <section className="flex flex-row items-center justify-between">
      <div className="flex items-center gap-1 text-sm">
        <span className="hidden sm:flex">Mostrando </span>
        <span className="font-bold">{`${indexOfFirstItemOfCurrentPage}-${indexOfLastItemOfCurrentPage}`}</span>{" "}
        de <span className="font-bold">{allFilteredItems.length}</span> {itemName}
      </div>
      <div className="flex items-center space-x-3">
        <Button variant={"secondary"} onClick={prevPage} disabled={page === 1}>
          Anterior
        </Button>
        <p className="text-sm">{`${page} / ${totalPages}`}</p>
        <Button variant={"secondary"} onClick={nextPage} disabled={page === totalPages || totalPages === 0}>
          Siguiente
        </Button>
      </div>
    </section>
  );
}
export default ContentFooter;

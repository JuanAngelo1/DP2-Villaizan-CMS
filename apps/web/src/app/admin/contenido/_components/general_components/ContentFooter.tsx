import { Button } from "@repo/ui/components/button";

function ContentFooter({
  page,
  entriesPerPage,
  totalPages,
  items,
  prevPage,
  nextPage,
}: {
  page: number;
  entriesPerPage: number;
  totalPages: number;
  items: any[];
  prevPage: () => void;
  nextPage: () => void;
}) {
  return (
    <section className="flex flex-row items-center justify-between">
      <div className="flex items-center gap-1 text-sm">
        <span className="hidden sm:flex">Mostrando </span>
        <span className="font-bold">{`${(page - 1) * entriesPerPage + 1}-${page * entriesPerPage > items.length ? items.length : page * entriesPerPage}`}</span>{" "}
        de <span className="font-bold">{items.length}</span> items
      </div>
      <div className="space-x-2">
        <Button variant={"secondary"} onClick={prevPage} disabled={page === 1}>
          Anterior
        </Button>
        <Button variant={"secondary"} onClick={nextPage} disabled={page === totalPages || totalPages === 0}>
          Siguiente
        </Button>
      </div>
    </section>
  );
}
export default ContentFooter;

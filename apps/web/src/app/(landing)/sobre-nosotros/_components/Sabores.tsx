import { cn } from "@repo/ui/lib/utils"

function Sabores({className}: {className?: string}) {
  return (
    <section>
      <h1 className={cn("text-5xl", className)}>Quienes son nuestros sabores?</h1>
    </section>
  )
}
export default Sabores
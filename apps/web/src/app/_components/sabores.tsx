import { Button } from "@repo/ui/components/button";
import Image from "next/image";
function Sabores() {
  return (
    <div className="max-w-5xl mx-auto py-12 text-center">
      <h1 className="text-4xl font-bold mb-6">Conoce nuestros sabores</h1>
      <p className="text-gray-500 mb-8">Descubre los personajes detrás de nuestros deliciosos helados</p>
      <div className="flex justify-center mb-8">
        <Image
          src="/sabores.png"
          alt="Nuestros sabores"
          width={800}
          height={400}
          className="object-contain"
        />
      </div>

      <div className="flex justify-center">
        <Button variant="secondary" className="text-md">Ver todos</Button>
      </div>
    </div>
  );
}

export default Sabores

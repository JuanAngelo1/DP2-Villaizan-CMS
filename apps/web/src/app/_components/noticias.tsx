import { Button } from "@repo/ui/components/button";
import { Card, CardTitle, CardDescription, CardContent } from "@repo/ui/components/card";
import Image from "next/image";

function Noticias() {
  const noticias = [
    {
      title: "Helado de aguaymanto, ¿por qué?",
      description: "Te presentamos nuestro nuevo sabor hecho de aguaymanto, junto con sus principales beneficios.",
      imageUrl: "/new1.png",
      date: "01/10/2024",
      autor:" Renzo Pinto"
    },
    {
      title: "La influencia de nuestros productos en los niños",
      description: "Descubre cómo nuestros productos afectan de manera positiva a los más pequeños.",
      imageUrl: "/new2.png",
      date: "04/09/2024",
      autor:" Renzo Pinto"
    },
    {
      title: "Helado de chocolate: nuestro clásico reinventado",
      description: "Un nuevo giro al sabor que tanto amas.",
      imageUrl: "/new2.png",
      date: "03/09/2024",
      autor:" Renzo Pinto"
    },
    {
      title: "Nuevas ideas para refrescarte en verano",
      description: "Conoce las mejores combinaciones para mantenerte fresco.",
      imageUrl: "/new2.png",
      date: "02/09/2024",
      autor:" Renzo Pinto"
    },
  ];

  const noticiaDestacada = noticias[0];
  const otrasNoticias = noticias.slice(1);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="font-bold md:text-7xl sm:text-5xl text-4xl">Nuestras noticias</h1>
        <Button variant="secondary" className="text-md">Ver todas</Button>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Entérate de las nuevas novedades dentro de la magia de nuestros helados
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <Image
            src={noticiaDestacada.imageUrl}
            alt={noticiaDestacada.title}
            width={800}
            height={400}
            className="w-full h-[400px] object-cover rounded-[5px] shadow-lg"
          />
          <CardContent className="p-4">
            <CardTitle className="text-2xl font-bold mb-2">
              {noticiaDestacada.title}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 mb-4">
              {noticiaDestacada.description}
            </CardDescription>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Autor: {noticiaDestacada.autor}</span>
              <span>{noticiaDestacada.date}</span>
            </div>
          </CardContent>
        </div>

        <div className="flex flex-col space-y-4">
          {otrasNoticias.map((noticia, index) => (
            <Card key={index} className="bg-white rounded-lg overflow-hidden flex flex-row border-none">
              <div className="w-1/2">
                <Image
                  src={noticia.imageUrl}
                  alt={noticia.title}
                  width={600}
                  height={300}
                  className="w-full h-full rounded-[5px] object-cover"
                />
              </div>
              <CardContent className="py-0 px-4 w-2/3 flex flex-col">
              <span className="text-xs text-gray-500 mb-1 block">Noticias</span>
              <CardTitle className="text-lg font-bold mb-2">{noticia.title}</CardTitle>
              <CardDescription className="text-xs text-gray-600 mb-2">{noticia.description}</CardDescription>
              <span className="text-xs text-gray-500 mt-auto ml-auto">{noticia.date}</span>
            </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Noticias
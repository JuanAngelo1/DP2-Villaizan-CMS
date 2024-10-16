import { Button } from "@repo/ui/components/button";
import { Card, CardTitle, CardContent } from "@repo/ui/components/card";
import Image from "next/image";

function Publicaciones() {
  const publicaciones = [
    {
      title: "La influencia de nuestros sabores en los niños",
      imageUrl: "/new2.png",
      autor: "Renzo Pinto",
      avatarUrl: "/avatar.png"
    },
    {
      title: "La influencia de nuestros sabores en los niños",
      imageUrl: "/new1.png",
      autor: "Renzo Pinto",
      avatarUrl: "/avatar.png"
    },
    {
      title: "La influencia de nuestros sabores en los niños",
      imageUrl: "/new1.png",
      autor: "Renzo Pinto",
      avatarUrl: "/avatar.png"
    },
    {
      title: "La influencia de nuestros sabores en los niños",
      imageUrl: "/new1.png",
      autor: "Renzo Pinto",
      avatarUrl: "/avatar.png"
    },
    {
      title: "La influencia de nuestros sabores en los niños",
      imageUrl: "/new1.png",
      autor: "Renzo Pinto",
      avatarUrl: "/avatar.png"
    },
    {
      title: "La influencia de nuestros sabores en los niños",
      imageUrl: "/new1.png",
      autor: "Renzo Pinto",
      avatarUrl: "/avatar.png"
    },
    {
      title: "La influencia de nuestros sabores en los niños",
      imageUrl: "/new1.png",
      autor: "Renzo Pinto",
      avatarUrl: "/avatar.png"
    },
    {
      title: "La influencia de nuestros sabores en los niños",
      imageUrl: "/new1.png",
      autor: "Renzo Pinto",
      avatarUrl: "/avatar.png"
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12">
      <div className="text-center mb-8">
        <h1 className="font-bold md:text-7xl sm:text-5xl text-4xl">Mira nuestras últimas publicaciones</h1>
        <p className="text-gray-500">Entérate de las nuevas novedades dentro de la magia de nuestros helados</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {publicaciones.map((publicacion, index) => (
          <Card key={index} className="rounded-lg overflow-hidden border-none">
            <Image
              src={publicacion.imageUrl}
              alt={publicacion.title}
              width={400}
              height={200}
              className="w-full rounded-[5px] h-[200px] object-cover"
            />
            <CardContent className="p-4">
              <CardTitle className="text-lg font-bold">{publicacion.title}</CardTitle>
              <div className="flex items-center mt-2">
                <Image
                  src={publicacion.avatarUrl}
                  alt={`Avatar de ${publicacion.autor}`}
                  width={24}
                  height={24}
                  className="rounded-full mr-2"
                />
                <span className="text-sm text-gray-500">{publicacion.autor}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Button variant="secondary" className="text-md">Ver todas</Button>
      </div>
    </div>
  );
}
export default Publicaciones
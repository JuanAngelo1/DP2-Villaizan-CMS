import { Button } from "@repo/ui/components/button";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card"
import { Input } from "@repo/ui/components/input"
import { ScrollArea } from "@repo/ui/components/scroll-area"
import { Separator } from "@repo/ui/components/separator"

export default function BlogPost() {
  return (
    <div className="bg-[#fff1f2] min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">    
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4">
            <Card className="bg-white">
              <CardContent className="p-4">
                <h2 className="font-bold mb-2">Contenido</h2>
                <ScrollArea className="h-[200px]">
                  <ul className="space-y-2">
                    <li><a href="#" className="text-blue-600 hover:underline">Introducción</a></li>
                    <li><a href="#" className="text-blue-600 hover:underline">The standard Lorem Ipsum</a></li>
                    <li><a href="#" className="text-blue-600 hover:underline">Passage used since</a></li>
                    <li><a href="#" className="text-blue-600 hover:underline">The 1500s</a></li>
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>
          </aside>
          
          <main className="md:w-3/4">
            <img 
              src="/image-principal.png"
              alt="Tres generaciones cocinando juntas" 
              className="w-full h-auto object-cover mb-6 rounded-lg"
            />
            
            <h1 className="text-4xl font-bold mb-4 text-gray-900">La influencia de nuestros sabores en los niños</h1>
            
            <div className="text-sm text-gray-600 mb-6">25 de agosto, 2024</div>
            
            <div className="flex items-center mb-6">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                <AvatarFallback>BP</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-900">escrito por Bruno Pinto</span>
            </div>
            
            <div className="prose prose-lg max-w-none mb-8">
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
              </p>
              
              <p>
                Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet", comes from a line in section 1.10.32.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">The standard Lorem Ipsum passage, used since the 1500s</h2>
              
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going.
              </p>
              
              <p>
                Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet", comes from a line in section 1.10.32.
              </p>
            </div>
            
            <img 
              src="/image-secundaria.png"
              alt="Niños tallando calabazas" 
              className="w-full h-auto object-cover mb-8 rounded-lg"
            />
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">0 comentarios</h3>
              <div className="flex items-start space-x-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>TÚ</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <Input placeholder="Danos tu comentario" className="w-full mb-2" />
                </div>
              </div>
            </div>
            
            <Card className="bg-gray-100 mb-8">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="sruno Pinto" />
                    <AvatarFallback>BP</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">Bruno Pinto</p>
                    <p className="text-sm text-gray-600 mb-2">28 de agosto, 2024</p>
                    <p className="text-gray-800">
                      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}
import { Button } from "@repo/ui/components/button";

function Navbar() {
  return (
    <nav className="fixed flex h-[60px] w-full flex-row justify-between p-3 bg-white">
      <img src="VIllaizanLogoV.png" />
      <section className="flex flex-row">
        <Button variant={"link"}>Inicio</Button>
        <Button variant={"link"}>Sabores</Button>
        <Button variant={"link"}>Nosotros</Button>
        <Button variant={"link"}>Publicaciones</Button>
        <Button>Iniciar sesión</Button>
      </section>
    </nav>
  );
}
export default Navbar;

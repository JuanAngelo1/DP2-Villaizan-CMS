// page.tsx
import Nosotros from "./_sections/Nosotros";
import Publicaciones from "./_sections/Publicaciones";
import Sabores from "./_sections/Sabores";
import Start from "./_sections/Start";

export default function Page(): JSX.Element {
  return (
    <>
      <Start />
      <Sabores />
      <Nosotros />
      <Publicaciones />
    </>
  );
}

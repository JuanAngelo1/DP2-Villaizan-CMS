// page.tsx
import Faqs from "./_components/faqs";
import MapComponent from "./_components/map";
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
      <MapComponent />
      <Faqs />
    </>
  );
}

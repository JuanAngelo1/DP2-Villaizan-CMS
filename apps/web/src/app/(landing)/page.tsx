// page.tsx
import Faqs from "./_components/faqs";
import Nosotros from "./_sections/Nosotros";
import Publicaciones from "./_sections/Publicaciones";
import Sabores from "./_sections/Sabores";
import Start from "./_sections/Start";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./_components/map"), { ssr: false });

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

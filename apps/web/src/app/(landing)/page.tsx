// page.tsx
import dynamic from "next/dynamic";
import Faqs from "./_components/faqs";
import Feats from "./_sections/Feats";
import Hero from "./_sections/Hero";
import Nosotros from "./_sections/Nosotros";
import NosotrosV2 from "./_sections/NosotrosV2";
import PromoAction from "./_sections/PromoAction";
import Publicaciones from "./_sections/Publicaciones";
import Sabores from "./_sections/Sabores";

const MapComponent = dynamic(() => import("./_components/map"), { ssr: false });

export default function Page(): JSX.Element {
  return (
    <>
      <Hero />
      <Sabores />
      <Feats />
      <NosotrosV2 />
      <Publicaciones />
      <PromoAction />
      <MapComponent />
      <Faqs />
    </>
  );
}

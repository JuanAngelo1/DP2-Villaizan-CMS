import Footer from "./_components/Footer";
import Header from "./_components/Header";
import Nosotros from "./_components/Nosotros";
import Noticias from "./_components/Noticias";
import Publicaciones from "./_components/Publicaciones";
import Sabores from "./_components/Sabores";
import Start from "./_components/Start";
import "./landing.css";

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col overflow-y-auto bg-white">
      <Header />
      <Start />
      <Sabores />
      <Nosotros />
      <Publicaciones />
      <Noticias />
      <Footer />
    </main>
  );
}

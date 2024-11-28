import { Baby, Map, PackagePlus, Popsicle, Smile, Sun } from "lucide-react";

export interface NumberProofType {
  label: string;
  value: number;
  textBefore?: string;
  image: string;
}

export interface HistoryItemType {
  title: string;
  date: string;
  content: string;
  icon: any;
  image: string;
}

export const historia = `Villaizan, fue fundada en el año 2015 por los esposos Fernando & Andrea, este sueño nace como un proyecto de transformar la fruta Amazónica, en productos naturales comestibles, que lleven alegría y alimentación saludable a sus clientes. La característica principal de estos productos, es que el mayor porcentaje de los insumos sean NATURALES y que su confección sea lo más ARTESANAL posible.
Algo que siempre caracterizó a la familia VILLAIZAN, es formar un equipo humano muy unido, hacer de su empresa un gran hogar, donde cada colaborador sienta que es parte de una gran familia, teniendo muy en cuenta que detrás de una gran empresa, hay un equipo humano muy profesional, sin ese gran valor, la empresa solo sería, maquinaria e infraestructura.
El gran sueño es llegar a cada hogar del País y del mundo, a través de productos que trasladen ese calor de familia y naturalidad.`;

export const vision = `Ser una empresa querida y respetada por la sociedad, que nuestros clientes sientan que al adquirir VILLAIZAN, están recibiendo un producto con insumos caseros y naturales, como si todo hubiese preparado en casa, bajo la supervisión de Mamá. Cada detalle, empaque, lugar de distribución, debe hacer sentir a nuestros clientes, calor de hogar. Ver en nuestra marca un motivo de sonrisa, un motivo de compartir con la familia. VILLAIZAN, más que un producto natural, una experiencia familiar.`;

export const mision = `Producir y comercializar productos artesanales de muy alta calidad, elaborados con insumos naturales de la Amazonia, que lleven alegría a la sociedad, garantizando a nuestros clientes altos estándares de calidad. Desarrollar actitudes y aptitudes en nuestro equipo de trabajo, que les permita un crecimiento sostenido dentro de la organización y del ámbito personal. Crecer constantemente como empresa en rentabilidad y cobertura, haciendo de VILLAIZAN una empresa sólida y con visión de futuro, garantizando su sostenibilidad en el tiempo.`;

export const productFeats = [
  "Artesanía con amor",
  "Frescura garantizada",
  "Sabores únicos",
  "Opciones para todos",
];

export const numberProofs: NumberProofType[] = [
  {
    label: "Años de experiencia",
    value: 5,
    image: "/nosotros/experience.jpg",
  },
  {
    label: "Puntos de venta",
    value: 200,
    textBefore: "+ ",
    image: "/nosotros/store.jpg",
  },
  {
    label: "Variedad de sabores",
    value: 30,
    textBefore: "+ ",
    image: "/nosotros/flavors.jpg",
  },
];

export const historyItems: HistoryItemType[] = [
  {
    title: "Nacimiento de Villaizan",
    date: "Noviembre 2015",
    content:
      "En Chiclayo, nace Paletas Villaizan como un pequeño emprendimiento familiar, inspirado por el amor a lo natural y la frescura. El calor nos provocaba un rico bocado helado, pero al mismo tiempo queríamos algo natural que apoyara nuestra salud. Comenzamos con frutas congeladas que luego tomaron forma de deliciosas paletas.",
    icon: Sun,
    image: "/nosotros/historia-main.jpg",
  },
  {
    title: "La Llegada de María Fe",
    date: "Marzo 2017",
    content:
      "El nacimiento de mi hija María Fe marcó un antes y un después en nuestra historia. Ella se convirtió en nuestra mayor inspiración para expandirnos y compartir la magia de Villaizan con más personas.",
    icon: Baby,
    image: "/image-principal.png",
  },
  {
    title: "Colaboración con una marca reconocida",
    date: "Junio 2017",
    content:
      "Gracias a nuestra dedicación, una reconocida marca del norte en Piura confió en nosotros para fabricar paletas, consolidando nuestra presencia en la región norteña.",
    icon: Map,
    image: "/image-secundaria.png",
  },
  {
    title: "El Cambio a Tarapoto",
    date: "Enero 2020",
    content:
      "Decidimos mudarnos a Tarapoto para iniciar de nuevo. Allí, seguimos trabajando con pasión, manteniendo la calidad y el sabor que nos caracteriza.",
    icon: PackagePlus,
    image: "/nosotros/aboutus7.jpg",
  },
  {
    title: "El Lanzamiento de las MAFELETAS",
    date: "Febrero 2024",
    content:
      "Presentamos las MAFELETAS, una paleta de 63 ml disponible en 10 sabores únicos, sin relleno. Este nuevo formato rinde homenaje a nuestra hija y a nuestra pasión por innovar con productos nuevos para el mercado.",
    icon: Popsicle,
    image: "/nosotros/aboutus3.jpg",
  },
  {
    title: "Presentes y buscando crecer",
    date: "Presente",
    content:
      "Hoy, seguimos creando paletas con amor y dedicación, manteniendo la calidad y frescura que nos caracteriza. Nuestro compromiso es seguir innovando y creciendo, para llevar nuestros productos a más personas y seguir compartiendo momentos de felicidad.",
    icon: Smile,
    image: "/nosotros/aboutus4.jpg",
  },
];

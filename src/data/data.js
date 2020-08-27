import ContactSvg from "../components/svg/ContactSvg";
import CardSvg from "../components/svg/CardSvg";
import ShipmentSvg from "../components/svg/ShipmentSvg";
import InstagramSvg from "../components/svg/InstagramSvg";
import MailSvg from "../components/svg/MailSvg";
import WhatsappSvg from "../components/svg/WhatsappSvg";
import BrushSvg from "../components/svg/BrushSvg";
import WrenchSvg from "../components/svg/WrenchSvg";

export const buttons = [
  { endpoint: "/admin", title: "Inicio" },
  { Logo: WrenchSvg, title: "Administrar" },
  { endpoint: "/admin/categorias", title: "Categorías" },
  { endpoint: "/admin/productos", title: "Productos" },
  { endpoint: "/admin/clientes", title: "Clientes" },
  { endpoint: "/admin/ventas", title: "Ventas" },
  { Logo: BrushSvg, title: "Personalizar" },
  { endpoint: "/admin/configuracion", title: "Configuración" },
];

export const gridOptions = [
  {
    gta: "'p1 p1' 'p1 p1'",
    gtc: "repeat(2, 1fr)",
  },
  {
    gta: "'p1 p2' 'p1 p2'",
    gtc: "repeat(2, 1fr)",
  },
  {
    gta: "'p1 p2' 'p1 p3'",
    gtc: "repeat(2, 1fr)",
  },
  {
    gta: "'p1 p2 p3' 'p1 p4 p4'",
    gtc: "1.3fr 0.85fr 0.85fr",
  },
  {
    gta: "'p1 p2 p3' 'p1 p4 p5'",
    gtc: "1.3fr 0.85fr 0.85fr",
  },
  {
    gta: "'p1 p2 p3' 'p6 p4 p5'",
    gtc: "1.3fr 0.85fr 0.85fr",
  },
  {
    gta: "'p1 p1 p2 p3' 'p4 p5 p6 p7'",
    gtc: "repeat(4, 1fr)",
  },
  {
    gta: "'p1 p2 p3 p4' 'p5 p6 p7 p8'",
    gtc: "repeat(4, 1fr)",
  },
];

export class Config {
  constructor(text, element, ph) {
    this.text = text;
    this.element = element;
    this.ph = ph;
  }
}

export const contactInputs = ["Nombre", "Email", "Teléfono"];

export const contact = [
  {
    link: "https://instagram.com",
    SVG: InstagramSvg,
    width: 25,
  },
  {
    link: "https://wa.me/111111",
    SVG: WhatsappSvg,
    width: 25,
  },
  {
    link: "https://gmail.com",
    SVG: MailSvg,
    width: 50,
  },
];

export const sections = [
  {
    endpoint: "/",
    name: "Inicio",
  },
  {
    endpoint: "/productos",
    name: "Productos",
  },
  {
    endpoint: "/contacto",
    name: "Contacto",
  },
];

export const services = [
  {
    title: "Envíos a todo el país",
    desc: "¡Gratis dentro de Rosario!",
    SVG: ShipmentSvg,
  },
  {
    title: "Aceptamos todas las tarjetas",
    SVG: CardSvg,
  },
  {
    title: "¿Necesitas ayuda?",
    desc: "¡Escribinos!",
    SVG: ContactSvg,
  },
];

import ContactSvg from "../components/svg/ContactSvg";
import CardSvg from "../components/svg/CardSvg";
import ShipmentSvg from "../components/svg/ShipmentSvg";
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
  {
    gta: "'p1 p2 p3' 'p4 p5 p6' 'p7 p8 p9'",
    gtc: "repeat(3, 1fr)",
    gtr: "repeat(3, 1fr)",
  },
];

export class Config {
  constructor(text, element, ph) {
    this.text = text;
    this.element = element;
    this.ph = ph;
  }
}

export const contactInputs = ["Nombre", "Email", "Celular"];

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

export const emptyStock = [
  { size: "S", items: 0, pos: 1 },
  { size: "M", items: 0, pos: 2 },
  { size: "L", items: 0, pos: 3 },
  { size: "XL", items: 0, pos: 4 },
  { size: "XXL", items: 0, pos: 5 },
];

import ContactSvg from "../components/svg/ContactSvg";
import CardSvg from "../components/svg/CardSvg";
import ShipmentSvg from "../components/svg/ShipmentSvg";
import InstagramSvg from "../components/svg/InstagramSvg";
import MailSvg from "../components/svg/MailSvg";
import WhatsappSvg from "../components/svg/WhatsappSvg";

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

export const categories = [
  {
    endpoint: "/abrigos",
    ga: "p1",
    img:
      "https://www.movilzona.es/app/uploads/2018/10/app-foto-movimiento.jpg?x=810",
    title: "SWEATERS Y BUZOS",
  },
  {
    endpoint: "/pantalones",
    ga: "p2",
    img:
      "https://www.movilzona.es/app/uploads/2018/10/app-foto-movimiento.jpg?x=810",
    title: "PANTALONES",
  },
  {
    endpoint: "/remeras",
    ga: "p3",
    img:
      "https://www.movilzona.es/app/uploads/2018/10/app-foto-movimiento.jpg?x=810",
    title: "REMERAS",
  },
  {
    endpoint: "/blusas-camisas",
    ga: "p4",
    img:
      "https://www.movilzona.es/app/uploads/2018/10/app-foto-movimiento.jpg?x=810",
    title: "BLUSAS Y CAMISAS",
  },
];

export const saleProducts = [
  {
    colors: [
      { val: "Rojo" },
      { val: "Negro" },
      { val: "Rojinegro" },
      { val: "Blanco" },
    ],
    endpoint: "/productos/0001",
    description: "♥AMAMOS♥ Comodín para mil conjuntos!",
    info:
      "Todas las prendas tienen cambio. Recordá devolverlas en perfecto estado, con etiqueta y sin uso. NO nos hacemos cargo sobre las prendas manipuladas. Para realizar el cambio contactanos al whatsapp",
    id: "0001",
    img:
      "https://www.instyle.es/medio/2019/01/29/vaqueros-topshop-tobilleros_609f65e7_1200x1800.jpg",
    name: "SACO INDUS",
    payForm: {
      card: "18 cuotas de $208,89",
      cash: "10% de descuento pagando con Efectivo o Transferencia",
    },
    promo: true,
    price: 2299,
    sizes: [{ val: "S" }, { val: "M" }, { val: "L" }, { val: "XL" }],
  },
  {
    endpoint: "/productos/0002",
    colors: ["Beige"],
    id: "0002",
    img:
      "https://www.instyle.es/medio/2019/01/29/vaqueros-topshop-tobilleros_609f65e7_1200x1800.jpg",
    name: "SACO AQUILA",
    promo: true,
    price: 2700,
  },
  {
    endpoint: "/productos/0003",
    colors: ["Blanco"],
    id: "0003",
    img:
      "https://www.instyle.es/medio/2019/01/29/vaqueros-topshop-tobilleros_609f65e7_1200x1800.jpg",
    name: "BABUCHA SAN VICENTE",
    promo: true,
    price: 1900,
  },
  {
    endpoint: "/productos/0004",
    colors: ["Rojo", "Blanco"],
    id: "0004",
    img:
      "https://www.instyle.es/medio/2019/01/29/vaqueros-topshop-tobilleros_609f65e7_1200x1800.jpg",
    name: "BABUCHA SAN VICENTE",
    price: 1900,
  },
  {
    endpoint: "/productos/0005",
    colors: ["Negro"],
    id: "0005",
    img:
      "https://www.instyle.es/medio/2019/01/29/vaqueros-topshop-tobilleros_609f65e7_1200x1800.jpg",
    name: "REMERA SAN JORGE",
    price: 700,
  },
  {
    endpoint: "/productos/0006",
    colors: ["Negrazo"],
    id: "0006",
    img:
      "https://www.instyle.es/medio/2019/01/29/vaqueros-topshop-tobilleros_609f65e7_1200x1800.jpg",
    name: "PANTALÓN SAN MIGUEL",
    price: 2100,
  },
  {
    endpoint: "/productos/0007",
    colors: ["Rojizo"],
    id: "0007",
    img:
      "https://www.instyle.es/medio/2019/01/29/vaqueros-topshop-tobilleros_609f65e7_1200x1800.jpg",
    name: "PANTALÓN SAN MIGUEL",
    price: 2100,
  },
  {
    endpoint: "/productos/0008",
    colors: ["Rojito"],
    id: "0008",
    img:
      "https://www.instyle.es/medio/2019/01/29/vaqueros-topshop-tobilleros_609f65e7_1200x1800.jpg",
    name: "PANTALÓN SAN MIGUEL",
    price: 2100,
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

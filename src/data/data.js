import ContactSvg from "../components/svg/ContactSvg";
import PaymentSvg from "../components/svg/PaymentSvg";
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
    SVG: PaymentSvg,
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
      "url('https://www.movilzona.es/app/uploads/2018/10/app-foto-movimiento.jpg?x=810')",
    title: "SWEATERS Y BUZOS",
  },
  {
    endpoint: "/pantalones",
    ga: "p2",
    img:
      "url('https://www.movilzona.es/app/uploads/2018/10/app-foto-movimiento.jpg?x=810')",
    title: "PANTALONES",
  },
  {
    endpoint: "/remeras",
    ga: "p3",
    img:
      "url('https://www.movilzona.es/app/uploads/2018/10/app-foto-movimiento.jpg?x=810')",
    title: "REMERAS",
  },
  {
    endpoint: "/blusas-camisas",
    ga: "p4",
    img:
      "url('https://www.movilzona.es/app/uploads/2018/10/app-foto-movimiento.jpg?x=810')",
    title: "BLUSAS Y CAMISAS",
  },
];

export const saleProducts = [
  {
    color: "Negro",
    endpoint: `/productos/0001`,
    id: "0001",
    img:
      "https://www.instyle.es/medio/2019/01/29/vaqueros-topshop-tobilleros_609f65e7_1200x1800.jpg",
    name: "SACO INDUS",
    offer: true,
    price: 2299,
  },
  {
    endpoint: "/productos/",
    color: "Beige",
    id: "0002",
    img:
      "https://www.instyle.es/medio/2019/01/29/vaqueros-topshop-tobilleros_609f65e7_1200x1800.jpg",
    name: "SACO AQUILA",
    offer: true,
    price: 2700,
  },
  {
    endpoint: "/productos/",
    color: "Blanco",
    id: "0003",
    img:
      "https://www.instyle.es/medio/2019/01/29/vaqueros-topshop-tobilleros_609f65e7_1200x1800.jpg",
    name: "BABUCHA SAN VICENTE",
    offer: true,
    price: 1900,
  },
  {
    endpoint: "/productos/",
    color: "Rojo",
    id: "0004",
    img:
      "https://www.instyle.es/medio/2019/01/29/vaqueros-topshop-tobilleros_609f65e7_1200x1800.jpg",
    name: "BABUCHA SAN VICENTE",
    price: 1900,
  },
  {
    endpoint: "/productos/",
    color: "Negro",
    id: "0005",
    img:
      "https://www.instyle.es/medio/2019/01/29/vaqueros-topshop-tobilleros_609f65e7_1200x1800.jpg",
    name: "REMERA SAN JORGE",
    price: 700,
  },
  {
    endpoint: "/productos/",
    color: "Negrazo",
    id: "0006",
    img:
      "https://www.instyle.es/medio/2019/01/29/vaqueros-topshop-tobilleros_609f65e7_1200x1800.jpg",
    name: "PANTALÓN SAN MIGUEL",
    price: 2100,
  },
  {
    endpoint: "/productos/",
    color: "Rojizo",
    id: "0007",
    img:
      "https://www.instyle.es/medio/2019/01/29/vaqueros-topshop-tobilleros_609f65e7_1200x1800.jpg",
    name: "PANTALÓN SAN MIGUEL",
    price: 2100,
  },
  {
    endpoint: "/productos/",
    color: "Rojito",
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

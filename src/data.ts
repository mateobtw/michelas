import { Product } from "./types/Product";

export const sliderItems = [
    {
      id: 1,
      img: "https://i.ibb.co/DG69bQ4/2.png",
      title: "OFERTA DE VERANO",
      desc: "NO TE PIERDAS NUESTRAS INCREÍBLES OFERTAS. ¡30% DE DESCUENTO EN NUEVAS LLEGADAS!",
      bg: "f5fafd",
    },
    {
      id: 2,
      img: "https://i.ibb.co/cXFnLLV/3.png",
      title: "COLECCIÓN OTOÑO",
      desc: "NO TE PIERDAS NUESTRAS INCREÍBLES OFERTAS. ¡30% DE DESCUENTO EN NUEVAS LLEGADAS!",
      bg: "fcf1ed",
    },
    {
      id: 3,
      img: "https://i.ibb.co/XsdmR2c/1.png",
      title: "AMOR POR LOS ABRIGOS",
      desc: "NO TE PIERDAS NUESTRAS INCREÍBLES OFERTAS. ¡30% DE DESCUENTO EN NUEVAS LLEGADAS!",
      bg: "fbf0f4",
    },
  ];

// Productos de ejemplo para la tienda (/shop)
export const productsData: Product[] = [
  {
    itemId: 1,
    imageUrl: "https://i.ibb.co/DG69bQ4/2.png",
    name: "Abrigo Clásico",
    description: "Abrigo de invierno con diseño clásico y cómodo.",
    price: 79.99,
    amount: 1,
  },
  {
    itemId: 2,
    imageUrl: "https://i.ibb.co/cXFnLLV/3.png",
    // imageUrl: "https://unsplash.com/photos/brown-long-sleeve-shirt-on-white-clothes-hanger-Fg15LdqpWrs",
    name: "Chaqueta Casual",
    description: "Chaqueta ligera ideal para uso diario.",
    price: 59.99,
    amount: 1,
  },
  {
    itemId: 3,
    imageUrl: "https://i.ibb.co/XsdmR2c/1.png",
    name: "Sudadera Deportiva",
    description: "Sudadera cómoda para actividades deportivas o casuales.",
    price: 39.99,
    amount: 1,
  },
  {
    itemId: 4,
    imageUrl: "https://i.ibb.co/DG69bQ4/2.png",
    name: "Pantalón Denim",
    description: "Pantalón de mezclilla azul de corte recto.",
    price: 49.99,
    amount: 1,
  },
  {
    itemId: 5,
    imageUrl: "https://i.ibb.co/cXFnLLV/3.png",
    name: "Camisa Formal",
    description: "Camisa de vestir para ocasiones formales.",
    price: 29.99,
    amount: 1,
  },
  {
    itemId: 6,
    imageUrl: "https://i.ibb.co/XsdmR2c/1.png",
    name: "Zapatillas Urbanas",
    description: "Zapatillas cómodas para uso urbano diario.",
    price: 69.99,
    amount: 1,
  },
];

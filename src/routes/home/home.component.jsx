

import CategoryContainer from "../../components/categories-container/categories-container.component";
function Home() {
    const categories = [
    {
      id: 1,
      title: "Bollería Dulce",
      img: "./images/dulce.png",
    },
    {
      id: 2,
      title: "Bollería Salada",
      img: "./images/salada.png",
    },
    {
      id: 3,
      title: "Panadería Industrial",
      img: "./images/panaderia.png",
    },
    {
      id: 4,
      title: "Productos de Temporada",
      img: "./images/temporada.png",
    },
    {
      id: 5,
      title: "Productos Especiales",
      img: "./images/especiales.png",
    },
  ];

  return <CategoryContainer categories= {categories}/>;
}

export default Home;

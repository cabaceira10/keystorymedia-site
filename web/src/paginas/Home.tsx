import Abertura from "../abertura";
import ComoFunciona from "./home/ComoFunciona";
import Heroi from "./home/Heroi";
import Pedido from "./home/Pedido";
import Perguntas from "./home/Perguntas";
import Portefolio from "./home/Portefolio";
import Reels from "./home/Reels";
import Servicos from "./home/Servicos";

/** The landing format: hero with the film, reels, what we do, how it works, questions. The shell adds the contact, footer and fixed bar. */
export default function Home(_: { mov: boolean }) {
  return (
    <>
      <Abertura />
      <Heroi />
      <Reels />
      <Servicos />
      <Portefolio />
      <ComoFunciona />
      <Pedido />
      <Perguntas />
    </>
  );
}

import { NavContainer, NavLeft, NavRight } from "./styles";
import Logo from '../../../public/assets/images/Colibri.svg'
import Image from "next/image";

export default function Navbar() {
  return (
    <>
      <NavContainer>
        <NavLeft>
          <Image src={Logo} alt="logo" />
        </NavLeft>
        <NavRight>
          <a href="#inicio">Início</a>
          <a href="#bio">Biografia</a>
          <a href="#cordeis">Cordéis</a>
          <a href="#livros">Livros</a>
          <a href="#videos">Vídeos</a>
          <a href="#audios">Áudios</a>
          <button>Contato</button>
          <button>Login</button>
        </NavRight>
      </NavContainer>
      <div className="line"></div>
    </>
  )
}
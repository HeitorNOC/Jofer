import { Button,  NavContainer, NavContent, NavLeft, NavRight } from "./styles";
import Logo from '../../../public/assets/images/Colibri.svg'
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { SignIn, SignOut } from "@phosphor-icons/react";

export default function Navbar() {
  function handleSignIn() {
    signIn('google')
  }

  function handleSignOut() {
    signOut()
  }

  const session = useSession()

  return (
    <>
      <NavContainer>
        <NavContent>

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
          <Button color={"white"}>Contato</Button>
          {
            session.data ? <Button onClick={handleSignOut} >{session.data.user.name.split(' ', 1)} <SignOut color="#FFF"/></Button> : <Button onClick={handleSignIn}>Login<SignIn color="#FFF"/></Button>
          }
          
        </NavRight>
        </NavContent>
        
      </NavContainer>
    </>
  )
}
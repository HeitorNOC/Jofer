import { useState, useEffect } from "react";
import {
  Button,
  CloseButton,
  NavContainer,
  NavContent,
  NavLeft,
  NavRight,
  SidebarIcon,
  SidebarLinks,
} from "./styles";
import Logo from "../../../public/assets/images/Colibri.svg";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { SignIn, SignOut, List } from "@phosphor-icons/react";

export default function Navbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleSignIn() {
    signIn("google");
  }

  function handleSignOut() {
    signOut();
  }

  const session = useSession();

  function toggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  return (
    <>
      <NavContainer className={showSidebar ? "blur" : ""}>
        <NavContent>
          <NavLeft>
            <Image src={Logo} alt="logo" />
          </NavLeft>
          {windowWidth >= 769 ? (
            <NavRight>
              <a href="#inicio">Início</a>
              <a href="#bio">Biografia</a>
              <a href="#cordeis">Cordéis</a>
              <a href="#livros">Livros</a>
              <a href="#videos">Vídeos</a>
              <a href="#audios">Áudios</a>
              <Button color={"white"}>Contato</Button>
              {session.data ? (
                <Button onClick={handleSignOut}>
                  {session.data.user.name.split(" ", 1)}{" "}
                  <SignOut color="#FFF" />
                </Button>
              ) : (
                <Button onClick={handleSignIn}>
                  Login<SignIn color="#FFF" />
                </Button>
              )}
            </NavRight>
          ) : (
            <SidebarIcon onClick={toggleSidebar}>
              <List size={32} color="#000" />
            </SidebarIcon>
          )}
        </NavContent>
      </NavContainer>
      {showSidebar && windowWidth < 769 && (
        <>
          <SidebarLinks>
            <a href="#inicio">Início</a>
            <a href="#bio">Biografia</a>
            <a href="#cordeis">Cordéis</a>
            <a href="#livros">Livros</a>
            <a href="#videos">Vídeos</a>
            <a href="#audios">Áudios</a>
            <Button color={"white"}>Contato</Button>
            {session.data ? (
              <Button onClick={handleSignOut}>
                {session.data.user.name.split(" ", 1)} <SignOut color="#FFF" />
              </Button>
            ) : (
              <Button onClick={handleSignIn}>
                Login<SignIn color="#FFF" />
              </Button>
            )}
          </SidebarLinks>
          <CloseButton onClick={toggleSidebar}>X</CloseButton>
        </>
      )}
    </>
  );
}

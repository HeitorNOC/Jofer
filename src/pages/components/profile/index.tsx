import { ProfileContainer, ProfileLeft, ProfileRight } from "./styles";
import Image from "next/image";
import Hero from "../../../../public/assets/images/Hero.png"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Profile() {
const router = useRouter()

  function handleContact() {
    router.push("/contact")
  }

  const [imageSize, setImageSize] = useState(612);
  const [windowWidth, setWindowWidth] = useState(0);

  // função para atualizar o tamanho da imagem com base nos breakpoints
 

  // função para lidar com o redimensionamento da tela
  
  // adicionar um event listener para o redimensionamento da tela
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    
  }, [windowWidth, imageSize]);

  let condition = windowWidth <= 500 ? 400 : windowWidth <= 768 ? 250 : windowWidth <= 1024 ? 412 : windowWidth <= 1440 ? 480 : 612

  return (
    <ProfileContainer>
      <ProfileLeft>
        <Image src={Hero} alt="Jofer" style={{ mixBlendMode: windowWidth <= 768 ? "normal": "darken" }} width={condition} height={condition} />
      </ProfileLeft>
      <ProfileRight>
        <div className="upper">
          <h1>João Ferreira</h1>
          <h4>Poeta, Palestrante, Divulgador Espírita.</h4>
        </div>
        <div className="lower">
          <button>
            <div className="svg-wrapper-1">
              <div className="svg-wrapper">

                <svg width="50" height="50" fill="#ffffff" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.214 3.072c1.599-.32 3.702-.363 5.14 1.074a.5.5 0 01.146.354v11a.5.5 0 01-.854.354c-.843-.844-2.115-1.059-3.47-.92-1.344.14-2.66.617-3.452 1.013A.5.5 0 012 15.5v-11a.5.5 0 01.276-.447L2.5 4.5l-.224-.447.002-.001.004-.002.013-.006a5.116 5.116 0 01.22-.103 12.958 12.958 0 012.7-.869zM3 4.82v9.908c.846-.343 1.944-.672 3.074-.788 1.143-.118 2.387-.023 3.426.56V4.718c-1.063-.929-2.631-.956-4.09-.664A11.958 11.958 0 003 4.82z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M14.786 3.072c-1.598-.32-3.702-.363-5.14 1.074A.5.5 0 009.5 4.5v11a.5.5 0 00.854.354c.844-.844 2.115-1.059 3.47-.92 1.344.14 2.66.617 3.452 1.013A.5.5 0 0018 15.5v-11a.5.5 0 00-.276-.447L17.5 4.5l.224-.447-.002-.001-.004-.002-.013-.006-.047-.023a12.582 12.582 0 00-.799-.34 12.96 12.96 0 00-2.073-.609zM17 4.82v9.908c-.846-.343-1.944-.672-3.074-.788-1.143-.118-2.386-.023-3.426.56V4.718c1.063-.929 2.631-.956 4.09-.664A11.956 11.956 0 0117 4.82z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <span>Meus trabalhos</span>
          </button>
          <button className="animated" onClick={handleContact}>
            <div className="svg-wrapper-1">
              <div className="svg-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                </svg>
              </div>
            </div>
            <span>Entrar em contato</span>
          </button>
        </div>
      </ProfileRight>
    </ProfileContainer>
  )
}
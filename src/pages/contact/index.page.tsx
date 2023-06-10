import {
  ContactContainer,
  ContactForm,
  ContactHero,
  Container,
  Content,
  LeftSide,
  Details,
  DetailsIcon,
  DetailsTopic,
  TextOne,
  TextTwo,
  RightSide,
  TopicText,
  InputBox,
  Input,
  TextArea,
  Button,
  ButtonInput,
  MediaQueries,
} from "./styles";
import Image from "next/image";
import HeroContactImg from "../../../public/assets/images/ContactHeroImg.jpg";
import {
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  MapPin,
  Phone,
  WhatsappLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";

const Contact = () => {
  function handleSubmit(e: any) {
    console.log(e);
  }

  function handleWhatsAppClick() {
    const phoneNumber = "+5581999542532";
    const message = "Olá, vim pelo site!";
    const url = `https://api.whatsapp.com/send?phone=${encodeURIComponent(
      phoneNumber
    )}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }

  return (
    <ContactContainer>
      <ContactForm>
        <form onSubmit={handleSubmit}>
          <Container>
            <Content>
              <LeftSide>
                <TopicText>Entre em contato</TopicText>
                <div className="dtContainer">
                  <Details>
                    <Phone size={32} color="#4dc7d9"/>
                    <DetailsTopic>Telefone</DetailsTopic>
                    <TextOne>+55 81 99954 2532</TextOne>
                  </Details>
                  <Details>
                    <EnvelopeSimple size={32} weight="fill" color="#66a6ff" />
                    <DetailsTopic>Email</DetailsTopic>
                    <TextOne>oliver.jofer@gmail.com</TextOne>
                  </Details>
                  <Details
                    style={{ cursor: "pointer" }}
                    onClick={handleWhatsAppClick}
                  >
                    <WhatsappLogo size={32} color="#25D366"/>
                    <DetailsTopic>WhatsApp</DetailsTopic>
                    <TextOne>Clique para iniciar a conversa</TextOne>
                  </Details>
                </div>
              </LeftSide>
              <RightSide>
                <TopicText>Enviar uma mensagem</TopicText>
                <p>
                  Se você quiser me enviar uma mensagem, basta preencher estes
                  campos, apertar o botão e a mensagem será enviada diretamente
                  para João Ferreira de Oliveira.
                </p>

                <InputBox>
                  <Input type="text" placeholder="Digite seu nome" />
                </InputBox>
                <InputBox>
                  <Input type="text" placeholder="Digite seu email" />
                </InputBox>
                <InputBox>
                  <Input
                    type="text"
                    sizeForm="big"
                    placeholder="Sua mensagem"
                  ></Input>
                </InputBox>
                <Button>
                  <ButtonInput type="submit" value="Enviar" />
                </Button>
              </RightSide>
            </Content>
          </Container>
        </form>
      </ContactForm>
    </ContactContainer>
  );
};

export default Contact;

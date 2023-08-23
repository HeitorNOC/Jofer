import { BioContainer, Photo, Title, Text, Icons, Icon } from "./styles";
import Hero from '../../../public/assets/images/Hero.png'

export default function Bio() {
    return (

        <BioContainer>
            <Text>UM POUCO SOBRE MIM</Text>
            <Title>Quem sou eu?</Title>
            <Photo src={Hero} alt="Jofer" width={200} height={200} />
            <Text>
                Olá, eu sou o Jofer, um desenvolvedor web apaixonado por tecnologia e
                inovação. Eu gosto de criar soluções criativas e eficientes usando as
                melhores ferramentas do mercado. Eu tenho experiência com React, Next.js,
                Stitches, Prisma e muito mais.
            </Text>
            <Icons>
                <Icon src="/github.svg" alt="GitHub" width={32} height={32} />
                <Icon src="/twitter.svg" alt="Twitter" width={32} height={32} />
                <Icon src="/linkedin.svg" alt="LinkedIn" width={32} height={32} />
            </Icons>
        </BioContainer>

    )
}
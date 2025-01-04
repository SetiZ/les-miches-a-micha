import ContainerBox from "@/components/containerBox";
import Choc from "@/components/cours";
import Layout from "@/components/layout";
import SocialButton from "@/components/socialButton";
import { Container, Flex, Heading, VStack } from "@chakra-ui/react";
import Image from 'next/image';
import { CgMail, CgPhone, CgSmileMouthOpen } from "react-icons/cg";

export default function Ateliers() {
  return (
    <Layout>
      <ContainerBox>
        <Flex justify={'center'} direction={'column'} align={'center'}>
          <Image
            src={'/miches_blanc.png'}
            alt={''}
            width={260}
            height={260}
            loading="eager"
          />
          <Heading as="h1" size="xl" textAlign={'center'}>
            Ateliers Boulangerie
          </Heading>
        </Flex>
        <VStack align={'center'} paddingTop={16} spacing={12}>
          <Heading as="h2" size="lg" textAlign={'center'}>
            Offrez un moment de gourmandise et de savoir-faire !
          </Heading>
          <Container maxW="80vw" textAlign={'center'} fontSize="lg">
          {`Plongez dans l'univers artisanal de la boulangerie avec nos ateliers, conçus pour tous les niveaux. Offrez (ou offrez-vous) l'opportunité d'apprendre à créer pains, brioches ou viennoiseries, pour une expérience entièrement personnalisable !`}
          </Container>
          <Container maxW="80vw" fontSize="lg">
            <Heading as="h3" size="lg" textAlign={'center'}>
              Des idées d’ateliers :
            </Heading>
            <Choc />
          </Container>
          <Container maxW="80vw" textAlign={'center'}>
            <Heading as="h3" size="lg" textAlign={'center'}>
              <b>Réservez dès maintenant :</b>
            </Heading>
            <VStack align={'center'} paddingTop={8}>
              <SocialButton
                text={'appelez au 06.52.39.48.79'}
                link={'tel:0663354314'}
                icon={<CgPhone />}
              />
              <SocialButton
                text={'écrivez-nous à lesmichesamicha@gmail.com'}
                link={'mailto:lesmichesamicha@gmail.com'}
                icon={<CgMail />}
              />
              <SocialButton
                text={'Téléchargez notre carte ateliers'}
                link={'Ateliers_boulanj.pdf'}
                icon={<CgSmileMouthOpen />}
                options={{ download: true }}
              />
            </VStack>
          </Container>
          <Container maxW="80vw" textAlign={'center'} fontSize="lg">
            <p>
              <b>Une ou deux demi-journées enrichissantes</b> : repartez avec vos créations et des techniques accessibles à reproduire chez vous. Outils et matières premières (bio) fournis.
            </p>
            <p>
              {`Sur une demi-journée, on pourra voir un ou deux produits, et on travaillera "en direct" - i.e. les étapes de pétrissage, façonnage et cuisson sont réalisées à la chaîne, les levées se faisant à température ambiante. Nous travaillerons à la levure, car au levain, la pousse n'aura pas le temps de se faire. Il faut compter environ 5h – 120€ pour une ou deux personnes, +30€ / personne supp.`}
            </p>
            <p>
              {`Sur deux demi-journées, on pourra voir jusqu’à trois produits, et on travaillera « en différé » - la façon que j’utilise pour faire mes pains, et qui permet d'expérimenter les principes de pousse contrôlée et de fermentation lente, qui amènent un développement supplémentaire des arômes, et qu'on trouve rarement dans les boulangeries de quartier... On peut également aller plus en profondeur sur la théorie. Compter en ce cas environ 3-4h le premier jour et 4-5h le second – 150€ pour une ou deux personnes, +40€ / personne supp.`}
            </p>
          </Container>
          <Container maxW="80vw" textAlign={'center'} fontSize="lg">
            <b>Idée cadeau parfaite</b> : une expérience unique à partager ou à offrir pour Noël.
          </Container>
          <Container maxW="80vw" textAlign={'center'} fontSize="lg">
            Ateliers pour adultes, EVG/EVJF et enfants, adaptés aux envies et au niveau de chacun.
          </Container>
        </VStack>
      </ContainerBox>
    </Layout>
  )
}

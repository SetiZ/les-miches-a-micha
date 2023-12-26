import ContainerBox from '@/components/containerBox';
import Layout from '@/components/layout';
import {
	AspectRatio,
	Box,
	Center,
	Container,
	Flex,
	HStack,
	Heading,
	SimpleGrid,
	Stack,
	StackDivider,
	Text,
	VStack,
	Wrap,
	WrapItem,
} from '@chakra-ui/react';
import { Image, Link } from '@chakra-ui/next-js';
import useSWR from 'swr';
// import Router from 'next/router';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
	const { data, error } = useSWR('/api/static', fetcher);

	if (typeof window !== 'undefined') {
	  window.location.replace('/socials');
	}

	return (
		<Layout>
			<ContainerBox>
				{/* <Heading as={'h1'} textAlign={'center'}>Les Miches à Micha</Heading> */}
				<Flex as={'h1'} justify={'center'}>
					<Image src={'/miches_blanc.png'} alt={''} width={260} height={260} />
				</Flex>
				<Heading as="h2" size="xl" textAlign={'center'}>
					Micro-fournil artisanal
				</Heading>
				<Text textAlign={'center'} fontSize="xl">
					N’allez plus à la boulangerie
					<br />
					c’est elle qui vient à vous !
				</Text>
				<VStack align={'center'} paddingTop={16} spacing={12}>
					<Container maxW="80vw" textAlign={'center'} fontSize="lg">
						Livraison à domicile, commande personnalisée, conseils de
						dégustation, créativité. . . Ici, tout est fait main, à partir de
						matières premières bio, locales et nobles, pour vous proposer des
						pains savoureux, sains et originaux.
					</Container>
					<Container maxW="80vw" textAlign={'center'}>
						<Heading as="h3" size="lg" textAlign={'center'}>
							Ils nous font confiance
						</Heading>
						<Wrap spacing="30px" paddingTop={8} justify={'center'}>
							<WrapItem>
								<Center w="200px">Le Curieux Orchestre</Center>
							</WrapItem>
							<WrapItem>
								<Center w="200px">Le V&B Nanterre</Center>
							</WrapItem>
							<WrapItem>
								<Center w="200px">
									SOSA, traiteur bio et éco-responsable à Paris
								</Center>
							</WrapItem>
							<WrapItem>
								<Center w="200px">
									{
										"L'ENSCI - les ateliers, pour les soutenances de leurs élèves"
									}
								</Center>
							</WrapItem>
							<WrapItem>
								<Center w="200px">Les grimpeurs de Suresnescalade</Center>
							</WrapItem>
							<WrapItem>
								<Center w="200px">
									{
										"L'association des jeux mathématiques du collège les Hauts Grillets"
									}
								</Center>
							</WrapItem>
							<WrapItem>
								<Center w="200px">La communauté Neve Shalom</Center>
							</WrapItem>
							<WrapItem>
								<Center w="200px">{"Le club d'aikido de Nanterre"}</Center>
							</WrapItem>
						</Wrap>
					</Container>
					{/* <Container maxW="80vw" textAlign={'center'}>
						{!data && <p>Loading...</p>}
						{error && <p>Loading failed : {error}</p>}
						{data && (
							<SimpleGrid minChildWidth="120px" spacing="40px">
								{data.products.map((prod: any, index: any) => (
									<Box key={index} p="5" maxW="320px" borderWidth="1px">
										{prod.title}
										<AspectRatio maxW="260px" ratio={1}>
											<Image
												src={'/miches_blanc.png'}
												alt={''}
												width={260}
												height={260}
												borderRadius="md"
											/>
										</AspectRatio>
										{prod.prix}€ - {prod.poids}gr
									</Box>
								))}
							</SimpleGrid>
						)}
					</Container> */}
					<Container maxW="80vw" textAlign={'center'}>
						<Heading as="h3" size="md" textAlign={'center'}>
							Plus d’informations ou pour passer commande
						</Heading>
						<Stack direction={['column', 'row']} paddingTop={4} justify={'center'}>
							<Link href={'tel:0663354314'}>
								06.63.35.43.14		
							</Link>
							<Link href={'mailto:lesmichesamicha@gmail.com'}>
								lesmichesamicha@gmail.com
							</Link>
						</Stack>
					</Container>
				</VStack>
			</ContainerBox>
		</Layout>
	);
}

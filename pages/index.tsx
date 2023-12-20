import ContainerBox from '@/components/containerBox';
import Layout from '@/components/layout';
import {
	AspectRatio,
	Box,
	Container,
	Flex,
	Heading,
	SimpleGrid,
	Text,
	VStack,
} from '@chakra-ui/react';
import { Image } from '@chakra-ui/next-js';
import useSWR from 'swr';
// import Router from 'next/router';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
	const { data, error } = useSWR('/api/static', fetcher);

	if (error) return <div>Failed to load</div>;
	if (!data) return <div>Loading...</div>;
	// if (typeof window !== 'undefined') {
	//   window.location.replace('/socials');
	// }

	return (
		<Layout>
			<ContainerBox>
				{/* <Heading as={'h1'} textAlign={'center'}>Les Miches à Micha</Heading> */}
				<Flex as={'h1'} justify={'center'}>
					<Image src={'/miches_blanc.png'} alt={''} width={260} height={260} />
				</Flex>
				<Text fontSize="2xl" textAlign={'center'}>
					Micro-fournil artisanal
				</Text>
				<Text textAlign={'center'}>
					N’allez plus à la boulangerie
					<br />
					c’est elle qui vient à vous !
				</Text>
				<VStack align={'center'} paddingTop={16} spacing={4}>
					<Container maxW="80vw" textAlign={'center'}>
						Livraison à domicile, commande personnalisée, conseils de
						dégustation, créativité. . . Ici, tout est fait main, à partir de
						matières premières bio, locales et nobles, pour vous proposer des
						pains savoureux, sains et originaux.
					</Container>
					<Container maxW="80vw" textAlign={'center'}>
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
					</Container>
				</VStack>
			</ContainerBox>
		</Layout>
	);
}

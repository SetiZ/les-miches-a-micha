import ContainerBox from '@/components/containerBox';
import Layout from '@/components/layout';
import { Heading, Text } from '@chakra-ui/react';
import Router from 'next/router';

export default function Home() {
	// if (typeof window !== 'undefined') {
	//   window.location.replace('/socials');
	// }

	return (
		<Layout>
			<ContainerBox>
				<Heading as={'h1'} textAlign={'center'}>
					Les Miches à Micha
				</Heading>
				<Text fontSize="2xl" textAlign={'center'}>
					Micro-fournil artisanal
				</Text>
				<Text textAlign={'center'}>
					N’allez plus à la boulangerie
					<br />
					c’est elle qui vient à vous !
				</Text>
				<Text>
					Livraison à domicile, commande personnalisée, conseils de dégustation,
					créativité. . . Ici, tout est fait main, à partir de matières
					premières bio, locales et nobles, pour vous proposer des pains
					savoureux, sains et originaux.
				</Text>
			</ContainerBox>
		</Layout>
	);
}

import { Box, Button, Text, Stack } from '@chakra-ui/react';
import { CgInstagram } from 'react-icons/cg';

const Footer = () => {
	// const year: number = new Date().getFullYear();

	return (
		<Box
			as={'footer'}
			w={'full'}
			bgColor={'gray.600'}
			color={'gray.100'}
			// position={'fixed'}
			bottom={0}>
			<Stack
				direction={['column', 'row']}
				padding={'4'}
				justify={'space-between'}
				maxW={'1440'}
				alignItems={'center'}
				margin={'0 auto'}>
				<Text fontWeight={'600'}>Siret : 90464809400020</Text>
				{/* <Text fontWeight={'600'}>Les miches à Micha</Text> */}
				<Button
				as={'a'}
				w={'min'}
				variant="link"
				color={'white'}
				leftIcon={<CgInstagram />}
				href={'https://www.instagram.com/lesmichesamicha/'}
				target="_blank">
				{'@lesmichesamicha'}
				</Button>
			</Stack>
		</Box>
	);
};

export default Footer;

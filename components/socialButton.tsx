import { Button } from '@chakra-ui/react';
import { ReactElement } from 'react';

export enum Events {
	Christmas = 'green.300',
}

interface SocialButtonProps {
	text: string;
	link: string;
	icon?: ReactElement;
	options?: { [x: string]: unknown };
	event?: Events;
}

const SocialButton = ({
	text,
	link,
	icon,
	event,
	options = {},
}: SocialButtonProps) => {
	return (
		<Button
			as={'a'}
			maxW={'sm'}
			width={'full'}
			variant={'outline'}
			colorScheme={'black'}
			leftIcon={icon}
			href={link}
			bgColor={event}
			download={options.download}
			target="_blank">
			{text}
		</Button>
	);
};

export default SocialButton;

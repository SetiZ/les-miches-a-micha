import { Button } from "@chakra-ui/react";
import { ReactElement } from "react";

interface SocialButtonProps  {
    text: string;
    link: string;
    icon: ReactElement;
    options?: {[x:string]: unknown}
}

const SocialButton = ({text, link, icon, options = {}}: SocialButtonProps) => {
    return (
        <Button
            as={'a'}
            maxW={'sm'}
            width={'full'}
            variant='outline'
            colorScheme='black'
            leftIcon={icon}
            href={link}
            download={options.download}
            target='_blank'>
            {text}
          </Button>
    );
}

export default SocialButton;

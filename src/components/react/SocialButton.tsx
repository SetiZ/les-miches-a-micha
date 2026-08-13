import type { ReactElement } from 'react';

interface SocialButtonProps {
  text: string;
  link: string;
  icon?: ReactElement;
  download?: boolean;
}

const SocialButton = ({ text, link, icon, download }: SocialButtonProps) => {
  return (
    <a
      href={link}
      className="forged-btn text-aged-parchment px-8 py-4 font-label text-label tracking-[0.1em] flex items-center gap-2 uppercase"
      target={download ? undefined : '_blank'}
      rel={download ? undefined : 'noopener noreferrer'}
      download={download ? true : undefined}>
      {icon && <span className="[&>svg]:size-5">{icon}</span>}
      {text}
    </a>
  );
};

export default SocialButton;

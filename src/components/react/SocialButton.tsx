import type { ReactElement } from 'react';

interface SocialButtonProps {
  text: string;
  link: string;
  icon?: ReactElement;
  options?: Record<string, unknown>;
  event?: string;
}

const SocialButton = ({
  text,
  link,
  icon,
  options = {},
}: SocialButtonProps) => {
  const isPrimary = options.in;
  return (
    <a
      href={link}
      className={`${isPrimary ? 'forged-btn-primary' : 'forged-btn text-aged-parchment'} px-8 py-4 font-label text-label tracking-[0.1em] flex items-center gap-2 uppercase`}
      target={options.download ? undefined : '_blank'}
      rel={options.download ? undefined : 'noopener noreferrer'}
      download={options.download ? true : undefined}>
      {icon && <span className="[&>svg]:size-5">{icon}</span>}
      {text}
    </a>
  );
};

export default SocialButton;

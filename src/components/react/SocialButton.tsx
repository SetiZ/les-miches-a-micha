import type { ReactElement } from 'react';

interface SocialButtonProps {
  text: string;
  link: string;
  icon?: ReactElement;
  options?: Record<string, unknown>;
  event?: string;
}

const SocialButton = ({ text, link, icon, event, options = {} }: SocialButtonProps) => {
  return (
    <a
      href={link}
      className={`btn btn-wide btn-warning ${event || ''}`}
      target={options.download ? undefined : '_blank'}
      rel={options.download ? undefined : 'noopener noreferrer'}
      download={options.download ? true : undefined}
    >
      {icon && <span className="[&>svg]:size-5">{icon}</span>}
      {text}
    </a>
  );
};

export default SocialButton;

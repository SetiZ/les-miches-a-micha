import { CgInstagram } from 'react-icons/cg';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-600 text-gray-100">
      <div className="max-w-[1440px] mx-auto p-4 flex flex-col-reverse sm:flex-row justify-between items-center gap-2">
        <p className="font-semibold">Siret : 90464809400020</p>
        <a
          href="https://www.instagram.com/lesmichesamicha/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-sm text-white gap-2"
        >
          <CgInstagram className="size-5" />
          @lesmichesamicha
        </a>
      </div>
    </footer>
  );
};

export default Footer;

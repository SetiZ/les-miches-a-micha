const Footer = () => {
  return (
    <footer className="w-full py-16 px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-gutter items-center text-center md:text-left bg-surface-container-lowest border-t-2 border-iron-rim">
      <div className="space-y-4">
        <span className="font-headline text-hmd text-fired-gold uppercase">M THE FORGE</span>
        <p className="font-body text-body text-aged-parchment opacity-70">
          La boulangerie qui vient à vous.<br />
          Matières nobles & levains naturels.
        </p>
      </div>
      <div className="flex flex-col gap-2 items-center md:items-start">
        <a href="https://www.instagram.com/lesmichesamicha/" target="_blank" rel="noopener noreferrer" className="font-label text-label text-aged-parchment opacity-70 hover:text-fired-gold transition-all uppercase tracking-[0.1em]">
          Instagram
        </a>
        <a href="https://g.page/r/CQP-U6UnJ-McEB0/review" target="_blank" rel="noopener noreferrer" className="font-label text-label text-aged-parchment opacity-70 hover:text-fired-gold transition-all uppercase tracking-[0.1em]">
          Google Maps
        </a>
        <span className="font-label text-label text-aged-parchment opacity-70">Contact: 06 52 39 48 79</span>
      </div>
      <div className="md:text-right space-y-4">
        <p className="font-label text-[10px] text-aged-parchment opacity-50 uppercase leading-relaxed tracking-[0.1em]">
          &copy; MMXXIV THE FORGE BAKERY. ALL RIGHTS RESERVED.<br />
          SIRET: 90464809400020
        </p>
        <div className="flex justify-center md:justify-end gap-4 text-iron-rim">
          <span className="text-lg">&#x1F33F;</span>
          <span className="text-lg">&#x1F331;</span>
          <span className="text-lg">&#x1F69A;</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

interface FilterProps {
  categories: string[];
  filteredProducts: number;
  onClick: (index: number) => void;
}

export const Filter = ({ categories, filteredProducts, onClick }: FilterProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-label text-label text-aged-parchment/70 uppercase tracking-[0.1em]">Filtrer par :</span>
      <button
        className={`px-3 py-1 font-label text-xs uppercase tracking-[0.1em] border transition-all duration-300 cursor-pointer ${
          filteredProducts === -1
            ? 'bg-ember-orange border-fired-gold text-aged-parchment'
            : 'border-iron-rim text-aged-parchment/70 hover:border-fired-gold hover:text-fired-gold'
        }`}
        onClick={() => onClick(-1)}
      >
        tous
      </button>
      {categories.map((category, index) => (
        <button
          key={category}
          className={`px-3 py-1 font-label text-xs uppercase tracking-[0.1em] border transition-all duration-300 cursor-pointer ${
            filteredProducts === index
              ? 'bg-ember-orange border-fired-gold text-aged-parchment'
              : 'border-iron-rim text-aged-parchment/70 hover:border-fired-gold hover:text-fired-gold'
          }`}
          onClick={() => onClick(index)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

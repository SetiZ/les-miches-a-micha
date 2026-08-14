interface FilterProps {
  categories: string[];
  filteredProducts: number;
  onClick: (index: number) => void;
}

export const Filter = ({
  categories,
  filteredProducts,
  onClick,
}: FilterProps) => {
  const filters = [
    ['tous', -1],
    ...categories.map((category, index) => [category, index]),
  ] as [string, number][];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-label text-label text-aged-parchment/70 uppercase tracking-widest">
        Filtrer par :
      </span>
      {filters.map(([label, value]) => (
        <button
          key={label}
          type="button"
          className={`px-3 py-1 font-label text-xs uppercase tracking-widest border transition-all duration-300 cursor-pointer ${
            filteredProducts === value
              ? 'bg-ember-orange border-fired-gold text-aged-parchment'
              : 'border-iron-rim text-aged-parchment/70 hover:border-fired-gold hover:text-fired-gold'
          }`}
          onClick={() => onClick(value)}>
          {label}
        </button>
      ))}
    </div>
  );
};

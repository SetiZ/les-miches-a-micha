interface FilterProps {
  categories: string[];
  filteredProducts: number;
  onClick: (index: number) => void;
}

export const Filter = ({ categories, filteredProducts, onClick }: FilterProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span>Filtrer par :</span>
      <button
        className={`badge badge-lg cursor-pointer ${filteredProducts === -1 ? 'badge-warning' : 'badge-outline'}`}
        onClick={() => onClick(-1)}
      >
        tous
      </button>
      {categories.map((category, index) => (
        <button
          key={category}
          className={`badge badge-lg cursor-pointer ${filteredProducts === index ? 'badge-warning' : 'badge-outline'}`}
          onClick={() => onClick(index)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

interface CardProps {
  item: {
    title: string;
    description: string;
    imagePath: string;
  };
}

function Card({ item }: CardProps) {
  return (
    <div
      className="max-w-sm w-full bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl cursor-pointer focus:outline-none"
      tabIndex={0} // Allows focus for keyboard navigation
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          alert(`Selected: ${item.title}`);
        }
      }}
      role="button"
      aria-label={`View details for ${item.title}`}
    >
      <img
        className="h-80 w-80 object-cover rounded-t-xl"
        src={item.imagePath}
        alt={item.title || "Image of product"}
      />
      <div className="px-4 py-3">
        <span className="text-gray-400 mr-3 uppercase text-xs">
          {item.description}
        </span>
        <p
          className="text-lg font-bold font-mono text-black truncate block capitalize"
          title={item.title} // Shows full title on hover
        >
          {item.title}
        </p>
      </div>
    </div>
  );
}

export default Card;

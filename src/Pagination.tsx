import { useEffect } from "react";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  cardsPerPage: number;
  totalCards: number;
  navigate: (pageNumber: number) => void;
}

export default function Pagination({
  currentPage,
  setCurrentPage,
  cardsPerPage,
  totalCards,
  navigate,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleClick = (number: number) => {
    if (number < 1 || number > totalPages) return;
    setCurrentPage(number);
    navigate(number);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleClick(currentPage + 1);
      else if (e.key === "ArrowLeft") handleClick(currentPage - 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, totalPages]);

  if (totalCards === 0) return null;

  return (
    <div className="flex justify-center">
      <nav className="lg:bg-gray-200 rounded-full px-4 py-2">
        <ul className="flex flex-wrap items-center justify-center lg:text-gray-500 gap-2 font-medium py-2">
          {pageNumbers.map((number) => (
            <li key={number}>
              <div
                className={`rounded-full px-4 py-2 transition duration-300 ease-in-out ${
                  number === currentPage
                    ? "bg-white text-gray-600"
                    : "hover:bg-white hover:text-gray-600"
                }`}
                onClick={() => handleClick(number)}
                tabIndex={0}
                aria-current={number === currentPage ? "page" : undefined}
              >
                {number}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

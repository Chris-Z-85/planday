import { useState, useEffect } from "react";

interface Item {
  title: string;
  description: string;
  imagePath: string;
}

interface SearchProps {
  data: Item[];
  setFilteredData: React.Dispatch<React.SetStateAction<Item[]>>;
}

export default function Search({ data, setFilteredData }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const delayFilter = setTimeout(() => {
      setFilteredData(
        data.filter(({ title }) =>
          title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, 300);

    return () => clearTimeout(delayFilter);
  }, [searchTerm, data, setFilteredData]);

  return (
    <div className="p-5">
      <input
        className="bg-gray-200 border-2 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full p-3 pl-10 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:w-auto md:w-full lg:w-auto"
        type="text"
        placeholder="Search..."
        aria-label="Search items"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

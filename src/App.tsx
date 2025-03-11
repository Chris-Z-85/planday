import { useState, useEffect } from "react";
import data from "./grid_items.json";
import Search from "./Search";
import Pagination from "./Pagination";
import Card from "./Card";
import CardBuilder from "./CardBuilder";

interface Item {
  title: string;
  description: string;
  imagePath: string;
}

const initialItems: Item[] = Array.isArray(data?.grid_items)
  ? data.grid_items
  : [];

export default function App() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [filteredData, setFilteredData] = useState<Item[]>(initialItems);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const cardsPerPage = 3;
  const lastCardIndex = currentPage * cardsPerPage;
  const firstCardIndex = lastCardIndex - cardsPerPage;
  const currentCards = filteredData.slice(firstCardIndex, lastCardIndex);

  useEffect(() => setCurrentPage(1), [filteredData]);
  useEffect(() => setFilteredData(items), [items]);

  const navigate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col items-center w-screen min-h-screen bg-[#1BA0DD] gap-14 p-20">
      <Search data={items} setFilteredData={setFilteredData} />
      <CardBuilder
        items={items}
        setItems={setItems}
        setCurrentPage={setCurrentPage}
      />

      <div className="w-fit mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-y-20 gap-x-14 mt-10 mb-5">
        {filteredData.length === 0 ? (
          <p className="text-5xl fixed top-40">No Results Found</p>
        ) : (
          currentCards.map((item) => <Card key={item.title} item={item} />)
        )}
      </div>

      {filteredData.length > 0 && (
        <Pagination
          cardsPerPage={cardsPerPage}
          totalCards={filteredData.length}
          navigate={navigate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

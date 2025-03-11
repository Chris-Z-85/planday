import { useState, ChangeEvent, FormEvent } from "react";

interface CardBuilderProps {
  items: {
    title: string;
    description: string;
    imagePath: string;
  }[];
  setItems: React.Dispatch<
    React.SetStateAction<
      { title: string; description: string; imagePath: string }[]
    >
  >;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function CardBuilder({
  items,
  setItems,
  setCurrentPage,
}: CardBuilderProps) {
  const [newCard, setNewCard] = useState<{
    title: string;
    description: string;
    imagePath: string;
  }>({
    title: "",
    description: "",
    imagePath: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCard = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newCard.title.trim() || !newCard.description.trim()) return;

    const newItem = { ...newCard };
    const updatedItems = [newItem, ...items];

    setItems(updatedItems);
    setNewCard({ title: "", description: "", imagePath: "" });
    setCurrentPage(1);
  };

  return (
    <form
      onSubmit={handleAddCard}
      className="flex flex-col gap-4 bg-gray-200 border-2 border-gray-300 hover:border-gray-400 p-5 rounded-lg shadow-md text-black"
    >
      {["title", "description", "imagePath"].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          value={newCard[field as keyof typeof newCard]} // Type assertion to access properties of the newCard object
          onChange={handleInputChange}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          className="p-2 border rounded"
        />
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
      >
        Add Card
      </button>
    </form>
  );
}

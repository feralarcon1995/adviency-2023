import type {Gifts} from "@/api";

import {v4 as uuidv4} from "uuid";
import {useState} from "react";
import {toast} from "react-toastify";

import api from "@/api";

interface AddGiftsProps {
  onGiftAdded: (newgift: Gifts) => void;
}
function AddGifts({onGiftAdded}: AddGiftsProps) {
  const [gift, setGift] = useState<Gifts>({id: uuidv4(), name: "", quantify: 0});
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!gift.name.trim()) {
      return toast.error("El nombre no puede estar vacío");
    }

    if (gift.quantify === 0) {
      return toast.error("La cantidad no puede ser cero");
    }

    const newGift = await api.addGift(gift.name, gift.quantify);

    onGiftAdded(newGift);
    toast.success("Se agrego correctamente el regalo.");
    setGift((prevGift) => ({...prevGift, name: "", quantify: 0}));
  };

  return (
    <form className="flex w-full items-center py-7" onSubmit={handleSubmit}>
      <input
        className="border-gold border-2 p-3 outline-none"
        placeholder="Gift name"
        type="text"
        value={gift.name}
        onChange={(event) => setGift({...gift, name: event.target.value})}
      />
      <input
        className="border-gold w-16 border-2 p-3 outline-none"
        placeholder="Gift quantify"
        type="number"
        value={gift.quantify}
        onChange={(e) => setGift({...gift, quantify: parseInt(e.target.value) || 0})}
      />
      <button
        className="border-gold text-gold hover:bg-gold border-2 p-3 font-bold transition-all hover:text-black"
        type="submit"
      >
        Add Gift
      </button>
    </form>
  );
}

export default AddGifts;

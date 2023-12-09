"use client";
import type {Gifts} from "@/api";

import {useEffect, useState} from "react";

import api from "@/api";

import AddGifts from "./components/AddGifts";
import Trash from "./components/icons/Trash";

export default function HomePage() {
  const [gifts, setGifts] = useState<Gifts[]>([]);

  const handleGiftAdded = (newGift: Gifts) => {
    const existingGiftIndex = gifts.findIndex((gift) => gift.name === newGift.name);

    if (existingGiftIndex !== -1) {
      gifts[existingGiftIndex] = {
        ...gifts[existingGiftIndex],
        quantify: gifts[existingGiftIndex].quantify + newGift.quantify,
      };
      setGifts([...gifts]);
    } else {
      setGifts([...gifts, newGift]);
    }
  };

  const handleRemoveGift = (id: string) => {
    setGifts((prevGifts) => prevGifts.filter((gift) => gift.id !== id));
  };

  const handleClearGifts = () => {
    setGifts([]);
  };

  useEffect(() => {
    const fetchGifts = async () => {
      const fetchedGifts = await api.getGifts();

      setGifts(fetchedGifts);
    };

    fetchGifts();
  }, []);

  return (
    <section className="container relative m-auto min-h-screen overflow-x-hidden py-16">
      <article className="z-10 flex items-center gap-3">
        <div className="flex w-full items-center gap-3">
          <img
            alt="wisthlist"
            className="border-gold w-12 rounded-full border-2 object-contain p-1"
            src="/assets/wishlist.png"
          />
          <h2 className="text-3xl font-bold">Wishlist:</h2>
        </div>
        <AddGifts onGiftAdded={handleGiftAdded} />
      </article>
      {gifts.length > 0 ? (
        <article className="flex flex-col gap-4">
          <ul className="fade-up">
            {gifts.map((gift) => (
              <li
                key={gift.id}
                className="fade-up hover:border-gold hover:bg-gold/25 flex items-center justify-between gap-4 border-2 border-transparent p-4 text-2xl uppercase transition-all hover:font-bold "
              >
                <span className="flex items-center gap-4">
                  <img alt="box gift" className="h-10 w-10 object-contain" src="/assets/gift.png" />
                  {gift.name} - x{gift.quantify}
                </span>
                <svg
                  aria-hidden="true"
                  className="text-red h-6 w-6 cursor-pointer transition-all"
                  fill="none"
                  viewBox="0 0 18 20"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => handleRemoveGift(gift.id)}
                >
                  <path
                    d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </li>
            ))}
          </ul>
          <button
            className=" border-red text-red hover:bg-red/25 fade-up flex items-center gap-4 self-end border-2 p-4  transition-all hover:font-bold hover:text-white"
            type="button"
            onClick={() => handleClearGifts()}
          >
            Limpiar lista
            <Trash />
          </button>
        </article>
      ) : (
        <section className="fade-up flex h-[600px] w-full items-center justify-center">
          <p className="text-gold text-2xl font-bold">
            Aun no hay regalos, intenta agregar alguno.
          </p>
        </section>
      )}
    </section>
  );
}

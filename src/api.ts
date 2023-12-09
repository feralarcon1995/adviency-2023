import {v4 as uuidv4} from "uuid";

export interface Gifts {
  id: string;
  name: string;
  quantify: number;
}

const gifts: Gifts[] = [
  {
    id: "1",
    name: "vacaciones",
    quantify: 1,
  },
  {
    id: "2",
    name: "Ropa nueva",
    quantify: 1,
  },
  {
    id: "3",
    name: "Aire acondicionado",
    quantify: 1,
  },
];
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const api = {
  getGifts: async (): Promise<Gifts[]> => {
    await sleep(500);

    return gifts;
  },
  addGift: async (name: string, quantify: number): Promise<Gifts> => {
    await sleep(500);

    const newID: string = uuidv4();
    const newGift = {id: newID, name, quantify};

    return newGift;
  },
};

export default api;

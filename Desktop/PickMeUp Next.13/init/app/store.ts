import { create } from "zustand";

interface StoreState {
  people: string[];
  languages: string[];
  selectedLanguage: string;
  drop_off: { [key: string]: string };
  pick_up: { [key: string]: string };
  Mpesa_names: { [key: string]: string };
  Mpesa_number: { [key: string]: string };
  addPerson: (person: string) => void;
  setLanguage: (newLanguage: string) => void;
}

const useStore = create<StoreState>((set) => ({
  people: ["raymond", "ray", "rayray"],
  languages: ["Sesotho", "English"],
  selectedLanguage: "English",

  drop_off: {
    Sesotho: "Sebaka seo u lo theoha ho sona",
    English: "Drop-off location",
    Sesotho_placeholder: "sebaka",
    English_placeholder: "location",
  },

  pick_up: {
    Sesotho: "Sebaka seo u tlohang ho sona",
    English: "Pick-up location",
    Sesotho_placeholder: "sebaka",
    English_placeholder: "location",
  },

  Mpesa_names: {
    Sesotho: "Mabitso a hau a Mpesa",
    English: "Mpesa names",
    Mpesa_names_sesotho_placeholder: "mabitso",
    Mpesa_names_english_placeholder: "names"
  },

  Mpesa_number: {
    Sesotho: "Nomoro tsa hau tsa Mpesa",
    English: "Numbers",
    Mpesa_numbers_sesotho_placeholder: "linomoro",
    Mpesa_numbers_english_placeholder: "numbers"
  },

  addPerson: (person) =>
    set((state) => ({ people: [...state.people, person] })),

  setLanguage: (newLanguage) =>
    set((state) => ({ selectedLanguage: newLanguage })), // Updated state updater function
}));

export default useStore;

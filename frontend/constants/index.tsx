export const COOKIE_NAME = "JWToken";
export const MAX_AGE = 60 * 60 * 24 * 30;
export const SUPABASE_URL = "https://kozvstpfbkaselpgdsln.supabase.co";
export const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvenZzdHBmYmthc2VscGdkc2xuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ0OTQ2MTQsImV4cCI6MjAxMDA3MDYxNH0.dDaG8ZPrCoH6ghqUwbSwD_vTvMFGKDQCsadwyRY0vJk";
export const ITEMS = ["Inel", "Cercei", "Lant", "Bratara", "Pandantiv"];
export const MARIME = {
  Inel: [
    "25.0",
    "25.5",
    "26.0",
    "26.5",
    "27.0",
    "27.5",
    "28.0",
    "28.5",
    "29.0",
    "29.5",
    "30.0",
    "30.5",
    "31.0",
    "32.0",
    "32.5",
  ],
  Lant: [40, 45, 50, 55, 60],
  Bratara: [14, 15, 16, 17, 18, 19],
};
export const MODEL = {
  Lant: ["Bismark", "Nona", "Gourme", "Altele"],
  Inel: ["Verighete", "Logodna", "Altele"],
  Pandantive: ["Iconite", "Cruciulite", "Zodii", "Altele"],
  Cercei: ["Copii", "Altele"],
  admin: ["Inele", "Cercei", "Lanturi", "Bratari", "Pandantive"],
};
export const PRET_AUR = 1400;
export const PRET_ARGINT = 100;
export type ItemData = {
  category: string;
  articol: string;
  model: string;
  descriere: string;
  marime: number;
  greutate: number;
  imageurl: string;
  pret: number;
};
export type FilterSchema = {
  pret: {
    min: number | undefined;
    max: number | undefined;
  };
  greutate: {
    min: number | undefined;
    max: number | undefined;
  };
  material: {
    [key: string]: boolean;
  };
  model: {
    [key: string]: boolean;
  };
  marime?: {
    [key: string]: boolean;
  };
};

export const sortOptionsCresc = [
  { label: "Pret ↑", value: "PretCresc" },
  { label: "Greutate ↑", value: "GreutateCresc" },
  { label: "Marime ↑", value: "MarimeCresc" },
  { label: "Alfabetic", value: "Alfabetic" },
];
export const sortOptionsDesc = [
  { label: "Pret ↓", value: "PretDesc" },
  { label: "Greutate ↓", value: "GreutateDesc" },
  { label: "Marime ↓", value: "MarimeDesc" },
  { label: "Alfabetic", value: "Alfabetic" },
];

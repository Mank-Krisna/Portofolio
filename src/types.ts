export type Language = "id" | "en";

export interface Protein {
  id: string;
  name: string;
  code: string;
  description: { id: string; en: string };
  targetPathology: { id: string; en: string };
  activeSite: string[];
}

export interface Compound {
  id: string;
  name: string;
  source: { id: string; en: string };
  formula: string;
  molecularWeight: number;
  baseAffinity: number; // base binding energy in kcal/mol
  description: { id: string; en: string };
  atomsCount: number;
  bondsCount: number;
}

export interface DockingResult {
  bindingEnergy: number; // Delta G in kcal/mol
  inhibitionConstant: number; // in micromolar or nanomolar
  interactions: {
    residue: string;
    type: "hydrogen_bond" | "hydrophobic" | "electrostatic";
    distance: number; // in Angstroms
  }[];
  dockingLog: string[];
}

export interface GuestbookEntry {
  id: string;
  name: string;
  role: string;
  message: string;
  timestamp: string;
  avatarColor: string;
}

export interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export interface CharacterCost {
  sequence: number;
  signature: boolean;
  refinement: number;
  weapon?: string;
}

export const DEFAULT_TEAM_COST = "makan";
export const MAKAN_COST_LABEL = "Makan's costs";
export const MAKAN_DEFAULT_COST: Readonly<CharacterCost> = { sequence: 0, signature: false, refinement: 1 };

export const MAKAN_COST_OVERRIDES: Readonly<Record<string, Readonly<CharacterCost>>> = {
  Phrolova: { sequence: 2, signature: true, refinement: 1 },
  Hsin: { sequence: 0, signature: true, refinement: 1 },
  Lucy: { sequence: 3, signature: true, refinement: 1 },
  Mornye: { sequence: 1, signature: false, refinement: 1 },
  Chisa: { sequence: 0, signature: true, refinement: 1 },
  Iuno: { sequence: 0, signature: true, refinement: 1 },
  Cartethyia: { sequence: 0, signature: true, refinement: 1 },
  Ciaccona: { sequence: 0, signature: true, refinement: 1 },
  Shorekeeper: { sequence: 2, signature: false, refinement: 1 },
  Denia: { sequence: 0, signature: false, refinement: 1, weapon: "Stringmaster" },
};

export const makanCost = (name: string): Readonly<CharacterCost> => MAKAN_COST_OVERRIDES[name] ?? MAKAN_DEFAULT_COST;

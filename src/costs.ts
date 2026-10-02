import { Tier } from "./engine/stats.js";

export interface CharacterCost {
  sequence: number;
  signature: boolean;
  refinement: number;
  weapon?: string;
}

// Bump when the personal preset changes so older solves cannot supply stale builds.
export const MAKAN_COST_REVISION = 4;
export const DEFAULT_TEAM_COST = "makan";
export const MAKAN_COST_LABEL = "Makan's costs";
export const MAKAN_DEFAULT_COST: Readonly<CharacterCost> = { sequence: 0, signature: false, refinement: 1 };

export const MAKAN_COST_OVERRIDES: Readonly<Record<string, Readonly<CharacterCost>>> = {
  Phrolova: { sequence: 2, signature: true, refinement: 1 },
  Hsin: { sequence: 2, signature: true, refinement: 1 },
  Lucy: { sequence: 3, signature: true, refinement: 1 },
  Mornye: { sequence: 1, signature: false, refinement: 1 },
  Chisa: { sequence: 0, signature: true, refinement: 1 },
  Iuno: { sequence: 0, signature: true, refinement: 1 },
  Cartethyia: { sequence: 0, signature: true, refinement: 1 },
  Ciaccona: { sequence: 0, signature: true, refinement: 1 },
  Shorekeeper: { sequence: 2, signature: false, refinement: 1 },
  Verina: { sequence: 2, signature: false, refinement: 1 },
  Denia: { sequence: 0, signature: false, refinement: 1, weapon: "Stringmaster" },
};

const FREE_COST: Readonly<CharacterCost> = { ...MAKAN_DEFAULT_COST, sequence: 6 };
/** Four-star characters and every Rover element use S6 in the personal preset. */
export const makanCost = (name: string, tier = Tier.Limited): Readonly<CharacterCost> =>
  MAKAN_COST_OVERRIDES[name] ?? (tier === Tier.Free ? FREE_COST : MAKAN_DEFAULT_COST);

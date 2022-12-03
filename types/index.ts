export {};

declare global {
    type Character = object & {
        name: string;
        preview: string;
        difficulty: number;
        description: string;
        image: string;
        talents: string[];
        abilities: Ability[];
      }
      
    type Ability = object & {
        hotkey: string;
        name: string;
        description: string;
        cd: number;
        passive: boolean;
        image: string;
        video: string;
    }

    type Player = object & {
        name: string;
        games: number;
        wins: number;
        losses: number;
        draws: number;
        winrate: string;
        pts: number;
        rank: string;
        club: string;
        season: string;
      }
}
//PLAY-BY-PLAY
export interface ABTypes {
  gamePk: any;
  batter: any;
  batterName: any;
  batSide: any;
  pitcher: any;
  pitcherName: any;
  pitchHand: any;
  result: any;
  inning: any;
  halfInning: any;
  batterTeam: any;
  atBatIndex: any;
  abLength: any;
  id: any;
  abEventDescriptions: any[];
}

export interface PlayTypes {
  abOutput: ABTypes[];
};

//BOX SCORE
export interface BoxScoreTypes {
  gameStatus: string;
  homeTeam: string;
  awayTeam: string;
  homeOrder: number[];
  awayOrder: number[];
  homePitchers: number[];
  awayPitchers: number[];
  awayRuns: number;
  homeRuns: number;
  awayHits: number;
  homeHits: number;
  awayErrors: number;
  homeErrors: number;
  innings: Array<{
    num: number;
    home: {
      runs: number;
      hits: number;
      errors: number;
      leftOnBase: number;
    };
    away: {
      runs: number;
      hits: number;
      errors: number;
      leftOnBase: number;
    };
  }>;
  players: Record<string, {
    id: number;
    fullName: string;
  }>;
}

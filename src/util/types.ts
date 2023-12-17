//GAMECAST
export interface PlayTypes {
  gamePk: any;
  batter: any;
  batterName: any;
  batSide: any;
  pitcher: any;
  pitcherName: any;
  pitchHand: any;
  result: any;
  inning: any;
  batterTeam: any;
  halfInning: any;
  atBatIndex: any;
  playLength: any;
  id: any;
  playEventDescriptions: any[];
}

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
  playsOutput: PlayTypes[];
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
}

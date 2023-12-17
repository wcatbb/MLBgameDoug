//GAMECAST
export interface Play {
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
    teamName: string;
    battingOrder: number[];
    pitchers: number[];
  }

//PLAY-BY-PLAY


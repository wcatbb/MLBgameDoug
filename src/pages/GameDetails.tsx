import { useGameData } from "../hooks/useGameData";
import { Helmet } from "react-helmet-async";
import KZone from "../features/KZone";
import {
  Box,
  Container,
  VStack,
  Text,
} from "@chakra-ui/react";

interface GameDetailsProps {
  gamePk: any;
}

interface Play {
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

const GameDetails = ({ gamePk }: GameDetailsProps) => {
  const { data, isError, isLoading } = useGameData(gamePk);

  // Check if data is still loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check if there was an error fetching the data
  if (isError) {
    return <div>Error loading data</div>;
  }

  // Check if data is available and has the expected structure
  if (!data || !data.data || !data.data.liveData || !data.data.liveData.boxscore) {
    return <div>No valid data available</div>;
  }

  const teamData = data.data.liveData.boxscore.teams
  const away_pitches = teamData.away.teamStats.pitching.pitchesThrown
  const home_pitches = teamData.home.teamStats.pitching.pitchesThrown
  const total_pitches = away_pitches + home_pitches

  console.log("Pitch Total: ", total_pitches)

  const allPlays = data.data.liveData.plays.allPlays;
  const total_plays = allPlays.length;
  const current_play = allPlays[total_plays - 1]?.result.description;
  const previous_play = allPlays[total_plays - 2]?.result.description;
  const last_play = current_play === undefined ? previous_play : current_play;

  const gameData = data.data.gameData;
  const game_status = gameData.status.abstractGameState
  const home_team = gameData.teams.home.abbreviation;
  const away_team = gameData.teams.away.abbreviation;
  const game_date = gameData.datetime.officialDate;

  const reformatAPIGameDate = (game_date: any) => {
    const dateParts = game_date.split("-");
    const day = dateParts[2];
    const month = dateParts[1];
    return `[${month}/${day}]`;
  };

  const reformattedDate = reformatAPIGameDate(game_date);

  // Initialize an array to hold play data
  const playsOutput: Play[] = [];

  for (let i = 0; i < total_plays; i++) {
    const ab = allPlays[i];
    const playLength = typeof ab.playEvents !== "undefined" ? ab.playEvents.length : 1;

    const play: Play = {
      gamePk,
      batter: ab.matchup.batter.id,
      batterName: ab.matchup.batter.fullName,
      batSide: ab.matchup.batSide.code,
      pitcher: ab.matchup.pitcher.id,
      pitcherName: ab.matchup.pitcher.fullName,
      pitchHand: ab.matchup.pitchHand.code,
      result: ab.result.event,
      inning: ab.about.inning,
      batterTeam: ab.about.halfInning === 'top' ? away_team : home_team,
      halfInning: ab.about.halfInning,
      atBatIndex: ab.atBatIndex,
      playLength: playLength,
      id: `${gamePk}-${ab.matchup.batter.id}-${ab.matchup.pitcher.id}-${ab.about.inning}-${ab.atBatIndex}-${playLength}`,
      playEventDescriptions: [],
    };

    if (ab.about.halfInning === 'top') {
      play.batterTeam = away_team
    } else { play.batterTeam = home_team }

    play.id = `${play.gamePk}-${play.batter}-${play.pitcher}-${play.inning}-${play.atBatIndex}-${play.playLength}`;

    // Initialize an array to hold descriptions for each play
    play.playEventDescriptions = [];

    // Check if playEvents are available and add descriptions to the array
    ab.playEvents.forEach((event: any) => {
      if (event.details && event.details.description) {
        play.playEventDescriptions.push(event.details.description);
      }
    });

    playsOutput.push(play);
  }

  console.log("playsOutput:", playsOutput);

  return (
    <Box alignContent="center">
      <Helmet>
        <title>{away_team}@{home_team} {reformattedDate}</title>
        <meta name="description" content="MLB Gameday (but jankier)" />
      </Helmet>
      <VStack>
        {total_pitches > 0 ? (
          <Box padding='4px'>
            <KZone />
          </Box>
        ) : (
          <Text>no baseball data available</Text>
        )}
        <Container>
          {game_status === 'Live' ? (<Text>Last Play: {last_play}</Text>) :
            (<Text></Text>)}
        </Container>
      </VStack>
    </Box>
  );
};

export default GameDetails
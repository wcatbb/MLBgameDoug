import { useGameData } from "../hooks/useGameData";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../features/LoadingSpinner";
import { ErrorText, NoDataText } from "../features/ErrorText";
import BoxScore from "./BoxScore"
import Gamecast from "./Gamecast"
import PlayByPlay from "./PlayByPlay";
import { BoxScoreTypes } from "../util/types";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import { PlayTypes } from "../util/types";
import { reformatAPIGameDate } from "../util/helpers";

interface GameDetailsProps {
  gamePk: any
}

const GameDetails = ({ gamePk }: GameDetailsProps) => {
  const { data, isError, isLoading } = useGameData(gamePk)

  // Check if data is still loading
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Check if there was an error fetching the data
  if (isError) {
    return <ErrorText />;
  }

  // Check if data is available and has the expected structure
  if (!data || !data.data || !data.data.liveData || !data.data.liveData.boxscore) {
    return <NoDataText />;
  }

  //GAME DATA DEFINITIONS
  const gameData = data.data.gameData;
  const gameStatus: string = gameData.status.abstractGameState
  const homeTeam: string = gameData.teams.home.abbreviation
  const awayTeam: string = gameData.teams.away.abbreviation
  const gameDate: string = gameData.datetime.officialDate
  const players = gameData.players 

  //BOX SCORE DEFINITIONS
  const boxScore = data.data.liveData.boxscore
  const awayOrder = boxScore.teams.away.battingOrder
  const homeOrder = boxScore.teams.home.battingOrder
  const awayPitchers = boxScore.teams.away.pitchers
  const homePitchers = boxScore.teams.home.pitchers

  //LINE SCORE DEFINITIONS
  const lineScore = data.data.liveData.linescore
  const innings = lineScore.innings
  const awayRuns = lineScore.teams.away.runs
  const homeRuns = lineScore.teams.home.runs
  const awayHits = lineScore.teams.away.hits
  const homeHits = lineScore.teams.home.hits
  const awayErrors = lineScore.teams.away.errors
  const homeErrors = lineScore.teams.away.errors

  //PLAY-BY-PLAY DEFINITIONS
  const allPlays = data.data.liveData.plays.allPlays
  const totalPlays = allPlays.length
  const currentPlay = allPlays[totalPlays - 1]?.result.description
  const previousPlay = allPlays[totalPlays - 2]?.result.description
  const lastPlay: string = currentPlay === undefined ? previousPlay : currentPlay

  // Initialize an array to hold play-by-play data
  const playsOutput: PlayTypes[] = []

  // Iterate through plays to build AB objects
  for (let i = 0; i < totalPlays; i++) {
    const ab = allPlays[i]
    // If play has 0 events, default to 1
    const playLength = typeof ab.playEvents !== "undefined" ? ab.playEvents.length : 1

    const play: PlayTypes = {
      gamePk,
      batter: ab.matchup.batter.id,
      batterName: ab.matchup.batter.fullName,
      batSide: ab.matchup.batSide.code,
      pitcher: ab.matchup.pitcher.id,
      pitcherName: ab.matchup.pitcher.fullName,
      pitchHand: ab.matchup.pitchHand.code,
      result: ab.result.event,
      inning: ab.about.inning,
      batterTeam: ab.about.halfInning === 'top' ? awayTeam : homeTeam,
      halfInning: ab.about.halfInning,
      atBatIndex: ab.atBatIndex,
      playLength: playLength,
      id: `${gamePk}-${ab.matchup.batter.id}-${ab.matchup.pitcher.id}-${ab.about.inning}-${ab.atBatIndex}-${playLength}`,
      playEventDescriptions: [],
    };

    if (ab.about.halfInning === 'top') {
      play.batterTeam = awayTeam
    } else { play.batterTeam = homeTeam }

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

  //DATA OBJECTS
  const boxScoreData: BoxScoreTypes = {
    gameStatus,
    players,
    homeTeam,
    awayTeam,
    homeOrder,
    awayOrder,
    homePitchers,
    awayPitchers,
    innings,
    awayRuns,
    homeRuns,
    awayHits,
    homeHits,
    awayErrors,
    homeErrors,
    playsOutput,
  };

  // Format date for browser tab (Helmet)
  const reformattedDate = reformatAPIGameDate(gameDate);

  return (
    <Box paddingTop={1}>
      <Helmet>
        <title>{awayTeam}@{homeTeam} {reformattedDate}</title>
        <meta name="description" content="MLB Gameday (jankier but no ads!)" />
      </Helmet>
      {gameStatus === "Final" ? (
        <Tabs size='md' variant='enclosed-colored'>
          <TabList>
            <Tab>Gamecast</Tab>
            <Tab>Box Score</Tab>
            <Tab>Play-by-Play</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Gamecast gameStatus={gameStatus} lastPlay={lastPlay} />
            </TabPanel>
            <TabPanel>
              <BoxScore boxScoreData={boxScoreData} />
            </TabPanel>
            <TabPanel>
              <PlayByPlay />
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : (
        <Text>no data available</Text>
      )}
    </Box>
  );
};

export default GameDetails
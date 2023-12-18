import { useGameData } from "../hooks/useGameData";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../features/LoadingSpinner";
import { ErrorText, NoDataText } from "../features/ErrorText";
import BoxScore from "./BoxScore"
import Gamecast from "./Gamecast"
import PlayByPlay from "./PlayByPlay";
import { reformatAPIGameDate } from "../util/helpers";
import {
  ABTypes,
  PlayTypes,
  BoxScoreTypes
} from "../util/types";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";

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

  // Format date for browser tab (Helmet)
  const reformattedDate = reformatAPIGameDate(gameDate)

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
  const livePlay: string = currentPlay === undefined ? previousPlay : currentPlay

  const abOutput: ABTypes[] = []

  // Iterate through plays to build AB objects, default AB length of 1
  for (let i = 0; i < totalPlays; i++) {
    const ab = allPlays[i]
    const abLength = typeof ab.playEvents !== "undefined" ? ab.playEvents.length : 1

    const abData: ABTypes = {
      gamePk,
      batter: ab.matchup.batter.id,
      batterName: ab.matchup.batter.fullName,
      batSide: ab.matchup.batSide.code,
      pitcher: ab.matchup.pitcher.id,
      pitcherName: ab.matchup.pitcher.fullName,
      pitchHand: ab.matchup.pitchHand.code,
      result: ab.result.description,
      inning: ab.about.inning,
      halfInning: ab.about.halfInning,
      batterTeam: ab.about.halfInning === 'top' ? awayTeam : homeTeam,
      atBatIndex: ab.atBatIndex,
      abLength: abLength,
      id: `${gamePk}-${ab.matchup.batter.id}-${ab.matchup.pitcher.id}-${ab.about.inning}-${ab.atBatIndex}-${abLength}`,
      abEventDescriptions: [],
    };

    // Create AB event keys
    abData.id = `${abData.gamePk}-${abData.batter}-${abData.pitcher}-${abData.inning}-${abData.atBatIndex}-${abData.abLength}`;

    // Initialize array to hold AB description
    abData.abEventDescriptions = [];

    // Check if AB events are available, add AB event description to the array
    ab.playEvents.forEach((event: any) => {
      if (event.details && event.details.description) {
        abData.abEventDescriptions.push(event.details.description);
      }
    });

    abOutput.push(abData);
  }

  //DATA OBJECTS
  const playData: PlayTypes = {
    abOutput: abOutput,
  };

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
  };

  return (
    <Box paddingTop={1}>
      <Helmet>
        <title>{awayTeam}@{homeTeam} {reformattedDate}</title>
        <meta name="description" content="MLB Gameday (jankier, but no ads!)" />
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
              <Gamecast gameStatus={gameStatus} lastPlay={livePlay} />
            </TabPanel>
            <TabPanel>
              <BoxScore boxScoreData={boxScoreData} />
            </TabPanel>
            <TabPanel>
              <PlayByPlay playData={playData} />
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
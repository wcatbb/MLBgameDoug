import { useGameData } from "../hooks/useGameData";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../features/LoadingSpinner";
import { ErrorText, NoDataText } from "../features/ErrorText";
import BoxScore from "../components/BoxScore"
import Gamecast from "../components/Gamecast"
import PlayByPlay from "../components/PlayByPlay";
import { BoxScoreTypes } from "../util/types";
import {
  Box,
  Container,
  HStack,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import { Play } from "../util/types";
import { reformatAPIGameDate } from "../util/helpers";

interface GameDetailsProps {
  gamePk: any;
}

const GameDetails = ({ gamePk }: GameDetailsProps) => {
  const { data, isError, isLoading } = useGameData(gamePk);

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
  //BOX SCORE DEFINITIONS
  const boxScore = data.data.liveData.boxscore.teams
  const away_order = boxScore.away.battingOrder
  const home_order = boxScore.home.battingOrder
  const away_pitchers = boxScore.away.pitchers
  const home_pitchers = boxScore.home.pitchers

  //PLAY-BY-PLAY DEFINITIONS
  const allPlays = data.data.liveData.plays.allPlays;
  const total_plays = allPlays.length;
  const current_play = allPlays[total_plays - 1]?.result.description;
  const previous_play = allPlays[total_plays - 2]?.result.description;
  const last_play = current_play === undefined ? previous_play : current_play;

  //GAME CAST DEFINITIONS
  const gameData = data.data.gameData;
  const game_status = gameData.status.abstractGameState
  const home_team = gameData.teams.home.abbreviation;
  const away_team = gameData.teams.away.abbreviation;
  const game_date = gameData.datetime.officialDate;

  //HELMET DATE
  const reformattedDate = reformatAPIGameDate(game_date);

  const awayBoxScore: BoxScoreTypes = {
    teamName: away_team,
    battingOrder: away_order,
    pitchers: away_pitchers,
  };

  const homeBoxScore: BoxScoreTypes = {
    teamName: home_team,
    battingOrder: home_order,
    pitchers: home_pitchers,
  };

  // Initialize an array to hold play-by-play data
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
        {game_status === "Final" ? (
          <Box padding='4px'>
            <Tabs size='md' variant='enclosed-colored'>
              <TabList>
                <Tab>Gamecast</Tab>
                <Tab>Box Score</Tab>
                <Tab>Play-by-Play</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Gamecast />
                </TabPanel>
                <TabPanel>
                  <HStack justify='center'>
                  <BoxScore homeData={homeBoxScore} awayData={awayBoxScore} />
                  </HStack>
                </TabPanel>
                <TabPanel>
                  <PlayByPlay />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        ) : (
          <Text>no data available</Text>
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
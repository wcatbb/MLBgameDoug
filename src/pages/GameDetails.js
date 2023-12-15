import { useState } from "react";
import { useGameData } from "../hooks/useGameData";
import { Helmet } from "react-helmet-async";
import StackedBarChart from "../features/StackedBarChart";
import UmpSupplyInput from "../features/UmpSupplyInput";
import {
  Box,
  Center,
  Container,
  VStack,
  Text,
} from "@chakra-ui/react";

const GameDetails = ({ gamePk, updateTotalBalls }) => {
  const { data } = useGameData(gamePk);

  const [umpSupply, setUmpSupply] = useState(0);

  const handleUmpSupplyChange = (newUmpSupply) => {
    setUmpSupply(newUmpSupply);
  };

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

  const reformatAPIGameDate = (game_date) => {
    const dateParts = game_date.split("-");
    const day = dateParts[2];
    const month = dateParts[1];
    return `[${month}/${day}]`;
  };

  const reformattedDate = reformatAPIGameDate(game_date);

  // Initialize an array to hold play data
  const playsOutput = [];

  for (let i = 0; i < total_plays; i++) {
    const play = {};
    const ab = allPlays[i];
    const playLength = typeof ab.playEvents !== "undefined" ? ab.playEvents.length : 1;
    play.gamePk = gamePk;
    play.batter = ab.matchup.batter.id;
    play.batterName = ab.matchup.batter.fullName;
    play.batSide = ab.matchup.batSide.code;
    play.pitcher = ab.matchup.pitcher.id;
    play.pitcherName = ab.matchup.pitcher.fullName;
    play.pitchHand = ab.matchup.pitchHand.code;
    play.result = ab.result.event;
    play.inning = ab.about.inning;
    if (ab.about.halfInning === 'top') {
      play.batterTeam = away_team
    } else { play.batterTeam = home_team }
    play.halfInning = ab.about.halfInning;
    play.atBatIndex = ab.atBatIndex;
    play.playLength = playLength;
    play.id = `${play.gamePk}-${play.batter}-${play.pitcher}-${play.inning}-${play.atBatIndex}-${play.playLength}`;

    // Initialize an array to hold descriptions for each play
    play.playEventDescriptions = [];

    // Check if playEvents are available and add descriptions to the array
    ab.playEvents.forEach((event) => {
      if (event.details && event.details.description) {
        play.playEventDescriptions.push(event.details.description);
      }
    });

    // Create filter to push playEvents into a usedBall array
    const usedBallFilter = ["In play", "Foul", "In Dirt", "Blocked", "Pitching Change", "Wild", "Hit", "Passed", "Steal"];

    play.usedBalls = play.playEventDescriptions.filter((description) => {
      return usedBallFilter.some((word) => description.includes(word));
    });

    // Check if batter struck out swinging to end the inning
    if ((play.playEventDescriptions[play.playEventDescriptions.length - 1] === "Called Strike" ||
      play.playEventDescriptions[play.playEventDescriptions.length - 1] === "Swinging Strike") &&
      ab.count.outs === 3) {
      play.usedBalls.push('Inning ending strikeout')
    }

    playsOutput.push(play);
  }

  console.log("playsOutput:", playsOutput);

  // Initialize ballData array to pass to bar graph
  const ballData = [];

  // Iterate through playsOutput to collect data by inning
  playsOutput.forEach((play) => {
    const { inning, batterTeam, usedBalls } = play;

    // Find or create an entry for the inning in ballData
    const inningEntry = ballData.find((entry) => entry.inning === inning);

    if (!inningEntry) {
      // Initialize a new entry for the inning with the 'name' key
      const newInningEntry = {
        inning,
        [home_team]: 0,
        [away_team]: 0,
        amt: 0,
      };

      // Set the counts for the batter's team
      newInningEntry[batterTeam] += usedBalls.length;
      newInningEntry.amt += usedBalls.length;

      // Push the new entry to ballData
      ballData.push(newInningEntry);
    } else {
      // Update the counts for the existing inning entry
      inningEntry[batterTeam] += usedBalls.length;
      inningEntry.amt += usedBalls.length;
    }
  });

  console.log("ballData:", ballData);

  // Total events that used a ball
  const usedBallEvents = ballData.reduce((total, inningEntry) => {
    return total + inningEntry.amt;
  }, 0);

  // Account for events not tracked in API (i.e. warm ups, tossed out by pitchers, etc.) 
  const slopFactor = Math.round(total_pitches / 30)

  const totalBalls = usedBallEvents + slopFactor + umpSupply

  updateTotalBalls(totalBalls)

  return (
    <Box align="center">
      <Helmet>
        <title>{away_team}@{home_team} {reformattedDate}</title>
        <meta name="description" content="Tracking the number of baseballs used during MLB games." />
      </Helmet>
      <VStack>
        {total_pitches > 0 ? (
          <Box padding='4px'>
            <Center>
            <UmpSupplyInput onUmpSupplyChange={handleUmpSupplyChange} umpSupply={umpSupply} />
            </Center>
            <StackedBarChart ballData={ballData} homeTeam={home_team} awayTeam={away_team} totalBalls={totalBalls} />
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
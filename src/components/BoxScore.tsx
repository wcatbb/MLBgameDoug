import {
  SimpleGrid,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import LineScore from "../features/LineScore";
import { BoxScoreTypes } from "../util/types";

interface BoxScoreProps {
  boxScoreData: BoxScoreTypes;
}

const BoxScore: React.FC<BoxScoreProps> = ({ boxScoreData }) => {
  const rowHeight = "30px";

  //Return player name based on ID
  const getPlayerName = (id: number): string => {
    const playerIdKey = `ID${id}`;
    const player = boxScoreData.players[playerIdKey];
    return player ? player.fullName : "";
  };
  
  return (
    <VStack>
      <LineScore
        innings={boxScoreData.innings}
        homeTeam={boxScoreData.homeTeam}
        awayTeam={boxScoreData.awayTeam}
        homeRuns={boxScoreData.homeRuns}
        awayRuns={boxScoreData.awayRuns}
        homeHits={boxScoreData.homeHits}
        awayHits={boxScoreData.awayHits}
        homeErrors={boxScoreData.homeErrors}
        awayErrors={boxScoreData.awayErrors}
      />
      <SimpleGrid columns={2} spacing={2} minW="xs">
        <Table variant="striped" size="xs">
          <Thead>
            <Tr>
              <Th bg="teal.500" color="white">
                {boxScoreData.homeTeam} Hitters
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {boxScoreData.homeOrder.map((hitterId, index) => (
              <Tr key={`hitter-${index}`} height={rowHeight}>
                <Td>{getPlayerName(hitterId)}</Td>
              </Tr>
            ))}
          </Tbody>
          <Thead>
            <Tr>
              <Th bg="teal.500" color="white">Pitchers</Th>
            </Tr>
          </Thead>
          <Tbody>
            {boxScoreData.homePitchers.map((pitcherId, index) => (
              <Tr key={`pitcher-${index}`} height={rowHeight}>
                <Td>{getPlayerName(pitcherId)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Table variant="striped" size="xs">
          <Thead>
            <Tr>
              <Th bg="teal.500" color="white">
                {boxScoreData.awayTeam} Hitters
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {boxScoreData.awayOrder.map((hitterId, index) => (
              <Tr key={`hitter-${index}`} height={rowHeight}>
                <Td>{getPlayerName(hitterId)}</Td>
              </Tr>
            ))}
          </Tbody>
          <Thead>
            <Tr>
              <Th bg="teal.500" color="white">Pitchers</Th>
            </Tr>
          </Thead>
          <Tbody>
            {boxScoreData.awayPitchers.map((pitcherId, index) => (
              <Tr key={`pitcher-${index}`} height={rowHeight}>
                <Td>{getPlayerName(pitcherId)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </SimpleGrid>
    </VStack>
  );
};

export default BoxScore;

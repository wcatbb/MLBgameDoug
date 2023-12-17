import {
  HStack,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from "@chakra-ui/react";
import LineScore from "../features/LineScore";
import { BoxScoreTypes } from '../util/types';

interface BoxScoreProps {
  boxScoreData: BoxScoreTypes
}

const BoxScore: React.FC<BoxScoreProps> = ({ boxScoreData }) => {

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
      <HStack align="top" minW="sm">
        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
              <Th bg="teal.500" color="white">{boxScoreData.homeTeam} Hitters</Th>
            </Tr>
          </Thead>
          <Tbody>
            {boxScoreData.homeOrder.map((hitter, index) => (
              <Tr key={`hitter-${index}`}>
                <Td>{hitter}</Td>
              </Tr>
            ))}
          </Tbody>
          <Thead>
            <Tr>
              <Th bg="teal.500" color="white">Pitchers</Th>
            </Tr>
          </Thead>
          <Tbody>
            {boxScoreData.homePitchers.map((pitcher, index) => (
              <Tr key={`pitcher-${index}`}>
                <Td>{pitcher}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
              <Th bg="teal.500" color="white">{boxScoreData.awayTeam} Hitters</Th>
            </Tr>
          </Thead>
          <Tbody>
            {boxScoreData.awayOrder.map((hitter, index) => (
              <Tr key={`hitter-${index}`}>
                <Td>{hitter}</Td>
              </Tr>
            ))}
          </Tbody>
          <Thead>
            <Tr>
              <Th bg="teal.500" color="white">Pitchers</Th>
            </Tr>
          </Thead>
          <Tbody>
            {boxScoreData.awayPitchers.map((pitcher, index) => (
              <Tr key={`pitcher-${index}`}>
                <Td>{pitcher}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </HStack>
    </VStack>
  );
};

export default BoxScore;
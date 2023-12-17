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
  homeData: BoxScoreTypes;
  awayData: BoxScoreTypes;
}

const BoxScore = ({ homeData, awayData }: BoxScoreProps) => {

  return (
    <VStack>
      <LineScore />
      <HStack align="top" minW="sm">
        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
              <Th>{homeData.teamName} Hitters</Th>
            </Tr>
          </Thead>
          <Tbody>
            {homeData.battingOrder.map((hitter, index) => (
              <Tr key={`hitter-${index}`}>
                <Td>{hitter}</Td>
              </Tr>
            ))}
          </Tbody>
          <Thead>
            <Tr>
              <Th>Pitchers</Th>
            </Tr>
          </Thead>
          <Tbody>
            {homeData.pitchers.map((pitcher, index) => (
              <Tr key={`pitcher-${index}`}>
                <Td>{pitcher}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Table variant="striped" size="sm">
          <Thead>
            <Tr>
              <Th>{awayData.teamName} Hitters</Th>
            </Tr>
          </Thead>
          <Tbody>
            {awayData.battingOrder.map((hitter, index) => (
              <Tr key={`hitter-${index}`}>
                <Td>{hitter}</Td>
              </Tr>
            ))}
          </Tbody>
          <Thead>
            <Tr>
              <Th>Pitchers</Th>
            </Tr>
          </Thead>
          <Tbody>
            {awayData.pitchers.map((pitcher, index) => (
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
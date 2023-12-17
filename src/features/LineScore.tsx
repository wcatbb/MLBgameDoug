import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

interface LineScoreProps {
  homeTeam: string;
  awayTeam: string;
  homeRuns: number;
  awayRuns: number;
  homeHits: number;
  awayHits: number;
  homeErrors: number;
  awayErrors: number;
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

const LineScore: React.FC<LineScoreProps> = ({
  homeTeam,
  awayTeam,
  homeRuns,
  awayRuns,
  homeHits,
  awayHits,
  homeErrors,
  awayErrors,
  innings,
}) => {

  // Placeholder data
  const inningNumbers = innings.map(inning => inning.num);

  return (
    <Table variant="striped" size="xs" minW="sm" maxW="sm">
      <Thead>
        <Tr>
          <Th borderTop="1px solid" borderRight="1px solid" borderColor="gray.300" bg="teal.500" color="white">Team</Th>
          {inningNumbers.map(inningNumber => (
            <Th key={`inning-${inningNumber}`} borderTop="1px solid" borderRight="1px solid" borderColor="gray.300" textAlign="center" w="8">{inningNumber}</Th>
          ))}
          <Th borderTop="1px solid" borderColor="gray.300" textAlign="center" bg="teal.500" color="white">R</Th>
          <Th borderTop="1px solid" borderColor="gray.300" textAlign="center" bg="teal.500" color="white">H</Th>
          <Th borderTop="1px solid" borderColor="gray.300" textAlign="center" bg="teal.500" color="white">E</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td borderBottom="1px solid" borderColor="gray.300">{awayTeam}</Td>
          {inningNumbers.map(inningNumber => (
            <Td key={`away-${inningNumber}`} borderBottom="1px solid" borderColor="gray.300" textAlign="center">{innings.find(inning => inning.num === inningNumber)?.away.runs || 0}</Td>
          ))}
          <Td borderBottom="1px solid" borderColor="gray.300" textAlign="center" fontWeight="bold">{awayRuns}</Td>
          <Td borderBottom="1px solid" borderColor="gray.300" textAlign="center" fontWeight="bold">{awayHits}</Td>
          <Td borderBottom="1px solid" borderColor="gray.300" textAlign="center" fontWeight="bold">{awayErrors}</Td>
        </Tr>
        <Tr>
          <Td borderBottom="1px solid" borderColor="gray.300">{homeTeam}</Td>
          {inningNumbers.map(inningNumber => (
            <Td key={`home-${inningNumber}`} borderBottom="1px solid" borderColor="gray.300" textAlign="center">{innings.find(inning => inning.num === inningNumber)?.home.runs || 0}</Td>
          ))}
          <Td borderBottom="1px solid" borderColor="gray.300" textAlign="center" fontWeight="bold">{homeRuns}</Td>
          <Td borderBottom="1px solid" borderColor="gray.300" textAlign="center" fontWeight="bold">{homeHits}</Td>
          <Td borderBottom="1px solid" borderColor="gray.300" textAlign="center" fontWeight="bold">{homeErrors}</Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default LineScore;

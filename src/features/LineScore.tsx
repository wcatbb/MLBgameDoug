import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td
  } from "@chakra-ui/react";
  
  const LineScore = () => {
    // Placeholder data
    const innings = Array.from({ length: 9 }, (_, index) => index + 1);
    const awayTeam = "Away";
    const homeTeam = "Home";
  
    return (
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th>Team</Th>
            {innings.map((inning) => (
              <Th key={`inning-${inning}`}>{inning}</Th>
            ))}
            <Th>R</Th>
            <Th>H</Th>
            <Th>E</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{awayTeam}</Td>
            {innings.map((inning) => (
              <Td key={`away-${inning}`}>0</Td>
            ))}
            <Td>0</Td>
            <Td>0</Td>
            <Td>0</Td>
          </Tr>
          <Tr>
            <Td>{homeTeam}</Td>
            {innings.map((inning) => (
              <Td key={`home-${inning}`}>0</Td>
            ))}
            <Td>0</Td>
            <Td>0</Td>
            <Td>0</Td>
          </Tr>
        </Tbody>
      </Table>
    );
  };
  
  export default LineScore;  
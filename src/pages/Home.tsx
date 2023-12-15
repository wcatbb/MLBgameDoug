import { useState } from 'react';
import Header from '../components/Header';
import Schedule from '../features/Schedule';
import DatePicker from '../features/DatePicker';
import GameDetails from './GameDetails';
import { ErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import {
  Box,
  VStack,
  Container,
  Divider,
  Text,
  Button,
  Skeleton,
  AbsoluteCenter,
} from '@chakra-ui/react';

const Home = () => {
  const year = new Date().getFullYear();
  const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const day = new Date().getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const [isoDate, setIsoDate] = useState(formattedDate);
  const [gamePk, setGamePk] = useState(null);

  const { reset } = useQueryErrorResetBoundary();



  const handleDateChange = (newIsoDate: any) => {
    setIsoDate(newIsoDate);
    setGamePk(null);
  };

  const handleGamePkChange = (newGamePk: any) => {
    setGamePk(newGamePk);
  };

  return (
    <Box>
      <Header />
      <Box position='relative' padding={6}>
        <Divider />
        <AbsoluteCenter>
          <Container maxW='180px'>
            <DatePicker isoDate={isoDate} onDateChange={handleDateChange} />
          </Container>
        </AbsoluteCenter>
      </Box>
      <VStack marginTop={2}>
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <Box alignContent='center'>
              <Text>There was an error!</Text>
              <Button onClick={() => resetErrorBoundary()}>Try again</Button>
            </Box>
          )}
        >
          <Suspense fallback={<Container maxW='80%'><Skeleton height='80px' /></Container>}>
            {gamePk !== null && <GameDetails gamePk={gamePk} />}
            <Schedule isoDate={isoDate} onGameClick={handleGamePkChange} />
          </Suspense>
        </ErrorBoundary>
      </VStack>
    </Box>
  );
};

export default Home;
import { useState } from 'react';
import Header from '../components/Header';
import Schedule from '../features/Schedule';
import DatePicker from '../features/DatePicker';
import GameDetails from '../components/_GameDetails';
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

  const handleScheduleChange = (newIsoDate: any) => {
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
            <DatePicker isoDate={isoDate} onDateChange={handleScheduleChange} />
          </Container>
        </AbsoluteCenter>
      </Box>
      <VStack marginTop={4}>
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <VStack justify='center'>
              <Text>There was an error!</Text>
              <Button onClick={() => resetErrorBoundary()}>Try again</Button>
            </VStack>
          )}
        >
          <Container maxW='80%' >
            <Suspense fallback={<Skeleton height='70px' />}>
              <Schedule isoDate={isoDate} onGameClick={handleGamePkChange} />
              {gamePk !== null && <GameDetails gamePk={gamePk} />}
            </Suspense>
          </Container>
        </ErrorBoundary>
      </VStack>
    </Box>
  );
};

export default Home;

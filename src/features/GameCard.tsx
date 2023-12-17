import { useGameData } from "../hooks/useGameData"
import {
    SimpleGrid,
    Box,
    Heading,
    Text,
    Stat,
    StatHelpText,
    StatArrow,
    Card,
    CardBody,
} from '@chakra-ui/react'

interface GameCardProps {
    gamePk: number;
    selected: boolean;
    onClick: (gamePk: number) => void;
}

const GameCard: React.FC<GameCardProps> = ({ gamePk, selected, onClick }) => {
    const cardClassName = selected ? 'selected' : 'elevated';

    const { data } = useGameData(gamePk)

    if (!data || !data.data || !data.data.gameData || !data.data.liveData) {
        // If data or its nested properties are undefined, handle accordingly
        return null; // or display an error message
    }

    const gameData = data.data.gameData
    const game_status = gameData.status.abstractGameState
    const start_time = `${gameData.datetime.time} ${gameData.datetime.ampm}`
    const home_team = gameData.teams.home.abbreviation
    const away_team = gameData.teams.away.abbreviation

    const lineScore = data.data.liveData.linescore
    const inning = lineScore.currentInning
    const inning_state = lineScore.inningState
    const home_score = lineScore.teams.home.runs
    const away_score = lineScore.teams.away.runs

    const trackInning = () => {
        let inningElement;

        switch (inning_state) {
            case 'Top':
                inningElement =
                    <Stat>
                        <StatHelpText>
                            <StatArrow type='increase' />
                            {inning}
                        </StatHelpText>
                    </Stat>
                break;
            case 'Middle':
                inningElement =
                    <Stat>
                        <StatHelpText>
                            <StatArrow type='decrease' />
                            {inning}
                        </StatHelpText>
                    </Stat>
                break;
            case 'Bottom':
                inningElement =
                    <Stat>
                        <StatHelpText>
                            <StatArrow type='decrease' />
                            {inning}
                        </StatHelpText>
                    </Stat>
                break;
            default:
                inningElement =
                    <Text fontSize='xs'>{game_status}</Text>
        }
        return inningElement;
    }

    let statusElement;

    switch (game_status) {
        case 'Preview': statusElement =
            <Text fontSize='xs'>
                {start_time}
            </Text>
            break;
        case 'Live': statusElement = trackInning();
            break;
        default: statusElement =
            <Text fontSize='xs'>
                {game_status}
            </Text>
    }
    const showScores = game_status === 'Live' || game_status === 'Final';

    return (
        <Card
            marginX={.25}
            marginY={.5}
            size='sm'
            minWidth='150px'
            maxWidth='150px'
            minHeight='70px'
            variant={cardClassName}
            onClick={() => onClick(gamePk)}
        >
            <CardBody>
                <Heading size='sm'>
                    <SimpleGrid columns={3}>
                        <Box>{away_team}</Box>
                        <Box textAlign='center'>{showScores ? away_score : null}</Box><Box textAlign='end'>{statusElement}</Box>
                        <Box>{home_team}</Box>
                        <Box textAlign='center'>{showScores ? home_score : null}</Box>
                    </SimpleGrid>
                </Heading>
            </CardBody>
        </Card>
    )
}
export default GameCard
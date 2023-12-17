import KZone from "../features/KZone";
import PitchSequence from "../features/PitchSequence";
import {
    VStack,
    HStack,
    Text,
} from "@chakra-ui/react";

interface GamecastProps {
    lastPlay: string;
    gameStatus: string;
}

const Gamecast: React.FC<GamecastProps> = ({ lastPlay, gameStatus }) => {
    return (
        <VStack justify="center">
            <HStack gap={3} align="top" marginBottom={2}>
                <KZone />
                <PitchSequence />
            </HStack>
            {gameStatus === 'Final' ? (<Text>Last Play: {lastPlay}</Text>) :
                (<Text></Text>)}
        </VStack>
    )
}

export default Gamecast
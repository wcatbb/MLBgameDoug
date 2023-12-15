import { useState } from "react"
import { useScheduleData } from "../hooks/useScheduleData"
import GameCard from "./GameCard"
import {
    SimpleGrid,
    Text
} from "@chakra-ui/react"

interface ScheduleProps {
    isoDate: string;
    onGameClick: (gamePk: any) => void;
}

type GamePk = number;

const Schedule: React.FC<ScheduleProps> = ({ isoDate, onGameClick }) => {
    const [selectedGamePk, setSelectedGamePk] = useState<GamePk | null>(null);

    const handleGameCardClick = (gamePk: GamePk) => {
        setSelectedGamePk(gamePk);
        onGameClick(gamePk);
    };

    const { data } = useScheduleData(isoDate);

    if (!data || data.length === 0) {
        return <Text>no games on schedule</Text>;
    }

    return (
        <SimpleGrid minChildWidth='180px' spacing='4px' maxW='100%'>
            {data.map((gamePk: GamePk) => (
                <GameCard
                    key={gamePk}
                    gamePk={gamePk}
                    selected={gamePk === selectedGamePk}
                    onClick={() => handleGameCardClick(gamePk)}
                />
            ))}
        </SimpleGrid>
    );
};

export default Schedule;
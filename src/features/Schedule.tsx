import { useState } from "react"
import { useScheduleData } from "../hooks/useScheduleData"
import GameCard from "./GameCard"
import {
    SimpleGrid,
    Text
} from "@chakra-ui/react"

const Schedule = ({ isoDate, onGameClick, totalBalls }) => {
    const [selectedGamePk, setSelectedGamePk] = useState(null)

    const handleGameCardClick = (gamePk) => {
        setSelectedGamePk(gamePk);
        onGameClick(gamePk);
    }

    const { data } = useScheduleData(isoDate)

    if (data?.length === 0) {
        return <Text>no games on schedule</Text>;
    }

    return (
        <SimpleGrid minChildWidth='180px' spacing='4px' maxW='100%'>
            {data?.map(gamePk => (
                <GameCard
                    key={gamePk}
                    gamePk={gamePk}
                    selected={gamePk === selectedGamePk}
                    totalBalls={totalBalls}
                    onClick={() => handleGameCardClick(gamePk)}
                />
            ))}
        </SimpleGrid>
    );
}

export default Schedule
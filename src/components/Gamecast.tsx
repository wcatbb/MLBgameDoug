import KZone from "../features/KZone";
import PitchSequence from "../features/PitchSequence";
import { HStack } from "@chakra-ui/react";

const Gamecast = () => {
    return (
        <HStack justify='center'>
            <KZone />
            <PitchSequence />
        </HStack>
    )
}
export default Gamecast
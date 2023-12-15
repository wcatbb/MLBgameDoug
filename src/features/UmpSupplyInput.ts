import UmpIcon from "../components/UmpIcon"
import {
    HStack,
    Tooltip,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react"

const UmpSupplyInput = ({ onUmpSupplyChange, umpSupply }) => {

    const handleUmpSupplyChange = (valueString) => {
        const newSupply = parseFloat(valueString);
        if (!isNaN(newSupply)) {
            onUmpSupplyChange(newSupply);
        }
    };

    return (
        <Tooltip hasArrow label='ump supply' fontSize='md'>
            <HStack>
                <UmpIcon boxSize={9} />
                <NumberInput
                    size='md'
                    maxW={20}
                    min={0}
                    defaultValue={0}
                    value={umpSupply}
                    onChange={handleUmpSupplyChange}
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </HStack>
        </Tooltip>

    )
}
export default UmpSupplyInput
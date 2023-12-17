import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box
} from '@chakra-ui/react'

const PlayByPlay = () => {
    return (
        <Accordion allowToggle>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            Away T1
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    Plays Data
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            Home B1
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    Plays Data
                </AccordionPanel>
            </AccordionItem>
        </Accordion>)
}
export default PlayByPlay
import React from 'react';
import { PlayTypes } from '../util/types';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Heading,
    ListItem,
    OrderedList,
} from '@chakra-ui/react';

interface PlayByPlayProps {
    playData: PlayTypes;
}

const PlayByPlay: React.FC<PlayByPlayProps> = ({ playData }) => {
    console.log("AB events:", playData.abOutput);

    return (
        <Box mx="auto" maxW="lg" >
            <Accordion allowToggle>
                {playData.abOutput.map((ab, index) => (
                    <AccordionItem key={index}>
                        <AccordionButton>
                            <Box as="span" flex="1" textAlign="left">
                                <Heading as='h6' size='xs'>
                                    {ab.result}
                                </Heading>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            <OrderedList>
                                {ab.abEventDescriptions
                                    .filter((event) => !event.includes('Status Change'))
                                    .map((filteredEvent, eventIndex) => (
                                        <ListItem key={eventIndex} fontSize='xs'  ml={4}>{filteredEvent}</ListItem>
                                    ))}
                            </OrderedList>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Box>
    );
};

export default PlayByPlay;
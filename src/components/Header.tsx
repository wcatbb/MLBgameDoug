import Logo from './Logo';
import { ColorModeSwitcher } from '../theme/ColorModeSwitcher';
import {
    Box,
    HStack,
    Heading
} from "@chakra-ui/react"

const Header = () => {
    return (
        <Box padding={4}>
            <HStack spacing={3} align='center' justify='center'>
                <Box>
                    <ColorModeSwitcher />
                </Box>
                <Box>
                    <Heading marginTop={1} size='2xl' >MLBgameDoug</Heading>
                </Box>
                <Box>
                    <Logo />
                </Box>
            </HStack>
        </Box>
    )
}
export default Header
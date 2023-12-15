import Logo from './Logo';
import { ColorModeSwitcher } from '../theme/ColorModeSwitcher';
import {
    Box,
    Heading,
} from "@chakra-ui/react"

const Header = ({ totalBalls }) => {

    return (
        <Box padding={2}>
            <Logo totalBalls={totalBalls} />
            <Heading marginTop={1} textAlign='center' size='2xl' >
                <ColorModeSwitcher />baseballometer 📊
            </Heading>
        </Box>
    )
}
export default Header
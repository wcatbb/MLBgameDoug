import logo from '../logo.svg'
import {
  Box,
  Image,
  keyframes,
  usePrefersReducedMotion
} from '@chakra-ui/react'


const Logo = () => {

  const imageStyle = {
    transform: `rotate(90deg)`,
    width: '50px',
  };

  const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 60s linear`;

  return (
    <Box>
      <Image src={logo} alt="MLBgameDoug" style={imageStyle} animation={animation}/>
    </Box>
  );
};

export default Logo

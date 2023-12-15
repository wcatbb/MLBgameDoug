import logo from '../logo.svg'
import {
  Box,
  Image,
  Heading,
  keyframes,
  usePrefersReducedMotion
} from '@chakra-ui/react'


const Logo = ({ totalBalls }) => {

  const isValidNumber = !isNaN(totalBalls);

  const imageStyle = {
    transform: `rotate(90deg)`,
    width: '90px',
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
    <Box align="center" position="relative">
      <Image src={logo} alt="Baseballometer Logo" width="100px" zIndex={-1} style={imageStyle} animation={animation}/>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        zIndex={1}
        style={{
          textShadow: '3px 2px 2px rgba(0, 0, 0, 0.7)'
        }}
      >
        <Heading size="3xl" color="red">
          {isValidNumber ? totalBalls : ''}
        </Heading>
      </Box>
    </Box>
  );
};
export default Logo

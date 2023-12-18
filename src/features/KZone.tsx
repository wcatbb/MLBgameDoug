import kzone from '../assets/kzone.png';
import { Box, Image } from '@chakra-ui/react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from 'recharts';

const data = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 250, y: 350, z: 500 },
];
const COLORS = ['red', 'red', 'cyan', '#90EE90'];

const KZone = () => {
  return (
    <Box position="relative">
      <Image boxSize="150px" src={kzone} position="absolute" zIndex="1" />
      <ScatterChart width={150} height={160}>
        <CartesianGrid stroke="transparent" fill="grey" fillOpacity={0.1} />
        <XAxis hide type="number" dataKey="x" name="height" unit="cm" interval={0} tickCount={4} />
        <YAxis hide type="number" dataKey="y" name="weight" unit="kg" interval={0} tickCount={4} />
        <Tooltip />
        <Scatter name="KZone" data={data} fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Scatter>
      </ScatterChart>
    </Box>
  );
};

export default KZone;

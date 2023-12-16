import kzone from '../assets/kzone.png'
import {
    Box,
    Image
} from '@chakra-ui/react';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell
} from 'recharts';


const data = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 250, y: 350, z: 500 }, // Point outside the grid
];
const COLORS = ['cyan', '#90EE90', 'red'];

const KZone = () => {
    return (
        <Box position="relative" padding={4}>
            <Image 
            boxSize='150px'
            src={kzone}
            />
            <ScatterChart
                width={150}
                height={160}
                style={{ position: 'absolute', top: 11, left: 15 }}
            >
                <CartesianGrid stroke="transparent" fill='grey' fillOpacity={0.1}/>
                <XAxis
                    hide={true}
                    type="number"
                    dataKey="x"
                    name="height"
                    unit="cm"
                    interval={0}
                    tickCount={4}
                />
                <YAxis
                    hide={true}
                    type="number"
                    dataKey="y"
                    name="weight"
                    unit="kg"
                    interval={0}
                    tickCount={4}
                />
                <Tooltip cursor={false} />
                <Scatter name="KZone" data={data} fill="#8884d8">
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Scatter>
            </ScatterChart>
        </Box>
    )
}

export default KZone
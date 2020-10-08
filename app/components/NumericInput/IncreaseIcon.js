import * as React from 'react';
import Svg, { Line } from 'react-native-svg';

const WIDTH = 20;
const HEIGHT = 20;

function Icon({ scale = 1, color = '#FFFFFF' }) {
  const width = WIDTH * scale;
  const height = HEIGHT * scale;
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} fill="none">
      <Line
        x1="1"
        y1="10"
        x2="19"
        y2="10"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
      <Line
        x1="10"
        y1="1"
        x2="10"
        y2="19"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
    </Svg>
  );
}

export default Icon;

import React from 'react';
import { Dimensions, View } from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop } from 'react-native-svg';
import globalStyles from '../styles/globalStyles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const MAX_BARS = 40;

const WaveformVisualizer = ({ waveform }) => (
  <View style={globalStyles.waveformContainer}>
    <Svg height="80" width="100%">
      <Defs>
        <LinearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#ff6b6b" stopOpacity="1" />
          <Stop offset="1" stopColor="#ffcc70" stopOpacity="0.8" />
        </LinearGradient>
      </Defs>
      {waveform.map((barHeight, i) => (
        <Rect
          key={i}
          x={i * (SCREEN_WIDTH / MAX_BARS)}
          y={80 - barHeight}
          width={SCREEN_WIDTH / MAX_BARS - 2}
          height={barHeight}
          fill="url(#barGradient)"
          rx={4}
        />
      ))}
    </Svg>
  </View>
);

export default WaveformVisualizer;

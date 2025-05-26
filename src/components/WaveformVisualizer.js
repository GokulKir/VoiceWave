
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
} from 'react-native';
import Svg, { Polyline } from 'react-native-svg';

// WaveformVisualizer Component
const WaveformVisualizer = ({ waveform, animatedValue }) => {
  const width = 300;
  const height = 50;
  const points = waveform.map((val, i) => `${i * 3},${height - val}`).join(' ');

  // Animate the waveform's y position slightly for a "live" effect
  const animatedPoints = waveform
    .map((val, i) => {
      const y = height - val + animatedValue.__getValue();
      return `${i * 3},${y}`;
    })
    .join(' ');

  return (
    <View style={styles.waveContainer}>
      <Svg height={height} width={width}>
        <Polyline
          points={animatedPoints}
          fill="none"
          stroke="#1E90FF"
          strokeWidth="2"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default WaveformVisualizer;

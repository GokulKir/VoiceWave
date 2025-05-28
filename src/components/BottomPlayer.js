import React, {useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, Animated, StyleSheet} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import PauseIcon from '../svgs/PauseIcon';
import styles from '../styles/globalStyles';
import ChevronUpIcon from '../svgs/ChevronUpIcon';

const BottomPlayer = ({
  toggleRecording,
  isRecording,
  recordTime,
  formatTime,
  waveAnim,
  waveAmplitude,
  waveform,
}) => {
  console.log('waveFormvseg', isRecording);

  // Phase for wave animation
  const phaseAnim = useRef(new Animated.Value(0)).current;

  // Generate wave path to fill the bottom half
  const generateWavePath = (
    width,
    height,
    amplitudeFactor,
    phase,
    waveformData,
  ) => {
    const points = 60; // Number of points for smooth wave
    const step = width / points;
    const halfHeight = height / 3.5; // Target the bottom half
    let path = `M0,${height}`; // Start at bottom-left

    // Generate sine wave points for the bottom half
    for (let i = 0; i <= points; i++) {
      const x = i * step;
      const waveformIndex = i % waveformData.length;
      const baseAmplitude =
        (waveformData[waveformIndex] || 5) * amplitudeFactor;
      const scaledAmplitude = Math.min(baseAmplitude, halfHeight * 0.8); // Cap amplitude to stay within bottom half
      const y =
        height - // Start from the bottom
        halfHeight + // Center the wave in the bottom half
        Math.sin((x / width) * 2 * Math.PI + phase) * scaledAmplitude; // Oscillate around the midpoint
      path += ` L${x},${y}`;
    }

    // Close the path to fill the area under the wave
    path += ` L${width},${height} Z`;
    return path;
  };

  // Animate the phase for a flowing effect
  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.timing(phaseAnim, {
          toValue: 2 * Math.PI,
          duration: 1500, // Matches the image's flow speed
          useNativeDriver: false, // SVG Path animation doesn't support native driver
        }),
      ).start();
    } else {
      phaseAnim.setValue(0);
      phaseAnim.stopAnimation();
    }
  }, [isRecording, phaseAnim]);

  // Interpolate phase for wave animation
  const phase = phaseAnim.interpolate({
    inputRange: [0, 2 * Math.PI],
    outputRange: [0, 2 * Math.PI],
  });

  // Precompute waveform with default values if empty
  const effectiveWaveform = waveform.length > 0 ? waveform : Array(60).fill(20); // Default amplitude for smooth wave

  return (
    <View style={[styles.bottomPlayer, {alignItems: 'center'}]}>
      {/* Top Arrow Section */}
      <View style={localStyles.arrowContainer}>
       <ChevronUpIcon/>
      </View>

      <TouchableOpacity
        style={[styles.progressBar, {marginTop: 0}]}
        onPress={toggleRecording}
        activeOpacity={0.8}>
        {isRecording ? (
          <View style={localStyles.progressBackground}>
            <Svg style={localStyles.waveContainer} width="100%" height="100%">
              {/* Wave Layer 1 - Base Blue */}
              <AnimatedPath
                d={phase.interpolate({
                  inputRange: [0, 2 * Math.PI],
                  outputRange: [
                    generateWavePath(300, 60, 0.5, 0, effectiveWaveform),
                    generateWavePath(
                      300,
                      60,
                      0.5,
                      2 * Math.PI,
                      effectiveWaveform,
                    ),
                  ],
                })}
                fill="#A3CFFF"
              />
              {/* Wave Layer 2 - Slightly Lighter Blue for Gradient Effect */}
              <AnimatedPath
                d={phase.interpolate({
                  inputRange: [0, 2 * Math.PI],
                  outputRange: [
                    generateWavePath(300, 60, 0.4, 0.2, effectiveWaveform),
                    generateWavePath(
                      300,
                      60,
                      0.4,
                      2 * Math.PI + 0.2,
                      effectiveWaveform,
                    ),
                  ],
                })}
                fill="#A3CFFF"
                opacity={0.5} // Reduced opacity for gradient-like effect
              />
            </Svg>
            <PauseIcon />
            <Text style={localStyles.progressText}>
              {formatTime(recordTime)}
            </Text>
          </View>
        ) : (
          <View style={localStyles.recordButton}>
            <Svg width={10} height={10} viewBox="0 0 10 10">
              <Circle cx="5" cy="5" r="5" fill="#FF0000" />
            </Svg>
            <Text style={localStyles.recordText}>Record</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={isRecording && toggleRecording}
        style={
          isRecording
            ? [styles.doneSection]
            : [styles.doneSection, {backgroundColor: '#000'}]
        }>
        {isRecording ? (
          <Text style={styles.doneText}>✓ Done</Text>
        ) : (
          <Text style={[styles.doneText, {color: '#fff'}]}>Done</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

// Custom Animated Path component
const AnimatedPath = Animated.createAnimatedComponent(Path);

// Define local styles to match the image
const localStyles = StyleSheet.create({
  arrowContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -20, // Overlap with progress bar or record button
    zIndex: 1, // Ensure arrow is above
    borderWidth: 1,
    borderColor: '#E6E6E6',
    top: -35,
  },
  progressBackground: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6E6E6', // Light gray background from image
    borderRadius: 100,
    width: '96%',
    height: 60, // Matches the updated height
    overflow: 'hidden',
    justifyContent: 'center',
  },
  waveContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  progressText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#000', // Black text to match image
  },
  recordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000', // Black background from image
    borderRadius: 100,
    width: '96%',
    height: 60,
    borderWidth: 2,
    borderColor: '#ffff',
    elevation: 10,
  },
  recordText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF', // White text to contrast with black background
  },
});

export default BottomPlayer;

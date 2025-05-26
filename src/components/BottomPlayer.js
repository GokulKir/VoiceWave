import React from 'react';
import {View, Text, TouchableOpacity, Animated, StyleSheet} from 'react-native';
import styles from '../styles/globalStyles';
import PauseIcon from '../svgs/PauseIcon';

const BottomPlayer = ({
  toggleRecording,
  recordTime,
  formatTime,
  waveAnim,
  waveAmplitude,
}) => {
  // Create multiple wave animations for a layered effect
  const waveTranslateX1 = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -150],
  });

  const waveTranslateX2 = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, -200],
  });

  const waveTranslateX3 = waveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, -250],
  });

  return (
    <View style={styles.bottomPlayer}>
      <TouchableOpacity
        style={styles.progressBar}
        onPress={toggleRecording}
        activeOpacity={0.8}>
        <View style={styles.progressBackground}>
          <View style={styles.waveContainer}>
            {/* Wave Layer 1 */}
            <Animated.View
              style={[
                styles.waveLayer,
                {
                  backgroundColor: '#A3CFFF',
                  transform: [
                    {translateX: waveTranslateX1},
                    {
                      translateY: waveAmplitude.interpolate({
                        inputRange: [5, 60],
                        outputRange: [0, -10],
                      }),
                    },
                  ],
                },
              ]}
            />
            {/* Wave Layer 2 */}
            <Animated.View
              style={[
                styles.waveLayer,
                {
                  backgroundColor: '#C9DEFF',
                  transform: [
                    {translateX: waveTranslateX2},
                    {
                      translateY: waveAmplitude.interpolate({
                        inputRange: [5, 60],
                        outputRange: [0, 10],
                      }),
                    },
                  ],
                  opacity: 0.8,
                },
              ]}
            />
            {/* Wave Layer 3 */}
            <Animated.View
              style={[
                styles.waveLayer,
                {
                  backgroundColor: '#E6F0FF',
                  transform: [
                    {translateX: waveTranslateX3},
                    {
                      translateY: waveAmplitude.interpolate({
                        inputRange: [5, 60],
                        outputRange: [0, -5],
                      }),
                    },
                  ],
                  opacity: 0.6,
                },
              ]}
            />
          </View>
          <PauseIcon />
          <Text style={styles.progressText}>{formatTime(recordTime)}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.doneSection}>
        <Text style={styles.doneText}>✓ Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomPlayer;

import React from 'react';
import { TouchableOpacity, View, Animated } from 'react-native';
import globalStyles from '../styles/globalStyles';

const RecordButton = ({ onPress, isRecording, pulseAnim }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
    <Animated.View
      style={[
        globalStyles.recordButton,
        isRecording && globalStyles.recording,
        { transform: [{ scale: pulseAnim }] },
      ]}
    >
      <View style={globalStyles.innerCircle} />
    </Animated.View>
  </TouchableOpacity>
);

export default RecordButton;

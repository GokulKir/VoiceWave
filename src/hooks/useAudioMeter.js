import { useRef, useState } from 'react';
import { Animated, Easing, PermissionsAndroid, Platform, Alert } from 'react-native';
import { AudioMeter } from '../services/audioMeterService';

const useAudioMeter = (setWaveform, waveRef) => {
  const [isRecording, setIsRecording] = useState(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.3,
          duration: 700,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();
  };

  const stopPulseAnimation = () => {
    pulseAnim.stopAnimation(() => pulseAnim.setValue(1));
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'App needs access to your microphone.',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const toggleRecording = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Microphone permission is required.');
      return;
    }

    if (isRecording) {
      AudioMeter.stop();
      setIsRecording(false);
      waveRef.current = [];
      setWaveform([]);
    } else {
      AudioMeter.start();
      setIsRecording(true);
    }
  };

  return { isRecording, toggleRecording, pulseAnim, startPulseAnimation, stopPulseAnimation };
};

export default useAudioMeter;

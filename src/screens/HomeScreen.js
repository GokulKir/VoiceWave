import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Alert } from 'react-native';
import { AudioMeterEvents } from '../services/audioMeterService';
import useAudioMeter from '../hooks/useAudioMeter';
import RecordButton from '../components/RecordButton';
import WaveformVisualizer from '../components/WaveformVisualizer';
import { formatTime } from '../utils/temer';
import globalStyles from '../styles/globalStyles';

const HomeScreen = () => {
  const [waveform, setWaveform] = useState([]);
  const waveRef = useRef([]);
  const [recordTime, setRecordTime] = useState(0);

  const {
    isRecording,
    toggleRecording,
    startPulseAnimation,
    stopPulseAnimation,
    pulseAnim,
  } = useAudioMeter(setWaveform, waveRef);

  useEffect(() => {
    let timer;
    if (isRecording) {
      timer = setInterval(() => setRecordTime(t => t + 1), 1000);
      startPulseAnimation();
    } else {
      setRecordTime(0);
      stopPulseAnimation();
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  useEffect(() => {
    const ampListener = AudioMeterEvents.addListener('AudioAmplitude', data => {
      const amp = data.amplitude;
      const db = Math.min(Math.max(amp / 500, 5), 60);
      waveRef.current = [...waveRef.current, db].slice(-40);
      setWaveform([...waveRef.current]);
    });

    const errListener = AudioMeterEvents.addListener('AudioError', data => {
      Alert.alert('Error', data.error || 'Recording failed.');
    });

    return () => {
      ampListener.remove();
      errListener.remove();
    };
  }, []);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.header}>Voice Recorder</Text>
      <WaveformVisualizer waveform={waveform} />
      <Text style={globalStyles.timerText}>{formatTime(recordTime)}</Text>
      <RecordButton
        onPress={toggleRecording}
        isRecording={isRecording}
        pulseAnim={pulseAnim}
      />
    </View>
  );
};

export default HomeScreen;

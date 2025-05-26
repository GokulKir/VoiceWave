import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Animated,
  Alert,
} from 'react-native';
import HeaderSection from '../components/HeaderSection';
import SearchSection from '../components/SearchSection';
import FilterSection from '../components/FilterSection';
import RecordingCard from '../components/RecordingCard';
import BottomPlayer from '../components/BottomPlayer';
import useAudioMeter from '../hooks/useAudioMeter';
import {AudioMeterEvents} from '../services/audioMeterService';
import {formatTime} from '../utils/temer';
import styles from '../styles/globalStyles';

const HomeScreen = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [waveform, setWaveform] = useState([]);
  const waveRef = useRef([]);
  const [recordTime, setRecordTime] = useState(0);
  const waveAnim = useRef(new Animated.Value(0)).current;
  const waveAmplitude = useRef(new Animated.Value(10)).current;

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
      Animated.loop(
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      setRecordTime(0);
      stopPulseAnimation();
      waveAnim.setValue(0);
      Animated.timing(waveAmplitude, {
        toValue: 10,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    return () => {
      clearInterval(timer);
      waveAnim.stopAnimation();
    };
  }, [isRecording, waveAnim, waveAmplitude]);

  useEffect(() => {
    const ampListener = AudioMeterEvents.addListener('AudioAmplitude', data => {
      const amp = data.amplitude;
      const db = Math.min(Math.max(amp / 500, 5), 60);
      waveRef.current = [...waveRef.current, db].slice(-40);
      setWaveform([...waveRef.current]);

      Animated.timing(waveAmplitude, {
        toValue: db,
        duration: 100,
        useNativeDriver: true,
      }).start();
    });

    const errListener = AudioMeterEvents.addListener('AudioError', data => {
      Alert.alert('Error', data.error || 'Recording failed.');
    });

    return () => {
      ampListener.remove();
      errListener.remove();
    };
  }, [waveAmplitude]);

  const recordings = [
    {
      id: '1',
      title: 'Momentum in FIFA and Startup Strategy',
      time: 'Sep 3 · 12:30 PM',
      duration: '01:23',
    },
    {
      id: '2',
      title: 'Morning Sync on Video Messages to Prod and Express Payouts',
      time: 'Sep 3 · 12:30 PM',
      duration: '01:23',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <HeaderSection />
      <View style={styles.SecondHeader}>
        <Text style={styles.HeaderTitle}>App name</Text>
      </View>
      <SearchSection />
      <FilterSection
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <FlatList
        data={recordings}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.recordingList}
        renderItem={({item}) => <RecordingCard item={item} />}
      />
      <BottomPlayer
        toggleRecording={toggleRecording}
        recordTime={recordTime}
        formatTime={formatTime}
        waveAnim={waveAnim}
        waveAmplitude={waveAmplitude}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

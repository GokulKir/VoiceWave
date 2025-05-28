import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Animated,
  Alert,
  Platform,
} from 'react-native';
import HeaderSection from '../components/HeaderSection';
import SearchSection from '../components/SearchSection';
import FilterSection from '../components/FilterSection';
import RecordingCard from '../components/RecordingCard';
import BottomPlayer from '../components/BottomPlayer';
import useAudioMeter from '../hooks/useAudioMeter';
import { AudioMeterEvents } from '../services/audioMeterService';
import { formatTime } from '../utils/temer';
import styles from '../styles/globalStyles';

// Constants
const WAVEFORM_MAX_LENGTH = 40;
const ANIMATION_DURATION = 2000;
const AMPLITUDE_TRANSITION = 100;
const INITIAL_AMPLITUDE = 10;

// Type Definitions
/**
 * @typedef {Object} Recording
 * @property {string} id
 * @property {string} title
 * @property {string} time
 * @property {string} duration
 */

/**
 * @type {Recording[]}
 */
const RECORDINGS = [
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

// Memoized RecordingCard component
const MemoizedRecordingCard = memo(({ item }) => (
  <RecordingCard item={item} />
));

// Main Component
const HomeScreen = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [waveform, setWaveform] = useState([]);
  const [recordTime, setRecordTime] = useState(0);
  const waveRef = useRef([]);
  const waveAnim = useRef(new Animated.Value(0)).current;
  const waveAmplitude = useRef(new Animated.Value(INITIAL_AMPLITUDE)).current;

  const {
    isRecording,
    toggleRecording,
    startPulseAnimation,
    stopPulseAnimation,
    pulseAnim,
  } = useAudioMeter(setWaveform, waveRef);

  // Handle recording timer and animations
  useEffect(() => {
    let timer = null;
    let animation = null;

    if (isRecording) {
      timer = setInterval(() => setRecordTime(prev => prev + 1), 1000);
      startPulseAnimation();
      
      animation = Animated.loop(
        Animated.timing(waveAnim, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          useNativeDriver: Platform.OS !== 'web', // Optimize for native platforms
        })
      );
      animation.start();
    } else {
      setRecordTime(0);
      stopPulseAnimation();
      waveAnim.setValue(0);
      
      Animated.timing(waveAmplitude, {
        toValue: INITIAL_AMPLITUDE,
        duration: AMPLITUDE_TRANSITION,
        useNativeDriver: Platform.OS !== 'web',
      }).start();
    }

    return () => {
      if (timer) clearInterval(timer);
      if (animation) animation.stop();
    };
  }, [isRecording, waveAnim, waveAmplitude]);

  // Handle audio amplitude updates
  useEffect(() => {
    const handleAmplitude = (data) => {
      try {
        const amp = data.amplitude;
        const db = Math.min(Math.max(amp / 500, 5), 60);
        waveRef.current = [...waveRef.current, db].slice(-WAVEFORM_MAX_LENGTH);
        setWaveform([...waveRef.current]);

        Animated.timing(waveAmplitude, {
          toValue: db,
          duration: AMPLITUDE_TRANSITION,
          useNativeDriver: Platform.OS !== 'web',
        }).start();
      } catch (error) {
        console.error('Amplitude processing error:', error);
      }
    };

    const handleError = (data) => {
      Alert.alert('Error', data.error || 'Recording failed.');
    };

    const ampListener = AudioMeterEvents.addListener('AudioAmplitude', handleAmplitude);
    const errListener = AudioMeterEvents.addListener('AudioError', handleError);

    return () => {
      ampListener.remove();
      errListener.remove();
    };
  }, [waveAmplitude]);

  // Optimize FlatList rendering
  const renderItem = useCallback(
    ({ item }) => <MemoizedRecordingCard item={item} />,
    []
  );

  const keyExtractor = useCallback((item) => item.id, []);

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
        data={RECORDINGS}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.recordingList}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        getItemLayout={(data, index) => ({
          length: 100, // Adjust based on your RecordingCard height
          offset: 100 * index,
          index,
        })}
      />
      <BottomPlayer
        toggleRecording={toggleRecording}
        isRecording={isRecording}
        recordTime={recordTime}
        formatTime={formatTime}
        waveform={waveform}
        waveAnim={waveAnim}
        waveAmplitude={waveAmplitude}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
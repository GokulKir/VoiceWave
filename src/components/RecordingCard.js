import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PlayIcon from '../svgs/PlayIcon';
import TextIcon from '../svgs/TextIcon';
import SendIcon from '../svgs/SendIcon';
import OptionIcon from '../svgs/OptionIcon';
import styles from '../styles/globalStyles';
import TranscriptIcon from '../svgs/TranscriptIcon';

const RecordingCard = ({item}) => {
  return (
    <View style={styles.recordingCard}>
      <Text style={styles.recordingTime}>{item.time}</Text>
      <Text style={styles.recordingTitle}>{item.title}</Text>
      <View style={styles.audioRow}>
        <View style={styles.audioDuration}>
          <PlayIcon />
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
        <View style={styles.iconRow}>
          {item?.id === '2' && (
            <TouchableOpacity style={styles.TextIconContainer}>
              <TranscriptIcon />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.TextIconContainer}>
            <TextIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.TextIconContainer}>
            <SendIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.TextIconContainer}>
            <OptionIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RecordingCard;

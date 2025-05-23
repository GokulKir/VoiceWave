import { NativeModules, NativeEventEmitter } from 'react-native';

export const { AudioMeter } = NativeModules;
export const AudioMeterEvents = new NativeEventEmitter(AudioMeter);

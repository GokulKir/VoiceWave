import { StyleSheet } from 'react-native';
import { colors } from './theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  header: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 24,
    textAlign: 'center',
  },
  waveformContainer: {
    width: '100%',
    height: 100,
    backgroundColor: colors.waveformBackground,
    borderRadius: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  timerText: {
    color: colors.primary,
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 30,
    textAlign: 'center',
  },
  recordButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  recording: {
    backgroundColor: colors.primary,
  },
  innerCircle: {
    width: 36,
    height: 36,
    backgroundColor: '#fff',
    borderRadius: 18,
  },
});

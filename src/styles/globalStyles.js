import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  // HomeScreen Styles
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  SecondHeader: {
    paddingHorizontal: 15,
    marginTop: 5,
  },
  HeaderTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000',
  },
  recordingList: {
    padding: 15,
  },

  // Header Styles
  HeaderSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
    marginTop:25
  },
  HeaderOuterSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 95,
    marginRight: 10,
  },

  // SearchBar Styles
  searchContainer: {
    width: '95%',
    height: 70,
    alignSelf: 'center',
  },
  searchBox: {
    backgroundColor: '#7676801F',
    height: 50,
    width: '100%',
    borderRadius: 50,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  SearchInp: {
    width: '55%',
    height: '100%',
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 14,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  AskAiStyle: {
    width: '28%',
    height: 34,
    backgroundColor: '#fff',
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  AskTextStyle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#000',
    marginLeft: 5,
  },

  // FilterButtons Styles
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#eee',
    borderRadius: 16,
    marginRight: 10,
  },
  filterText: {
    fontSize: 13,
    color: '#333',
  },
  activeFilter: {
    backgroundColor: '#ccc',
  },
  activeFilterText: {
    fontWeight: 'bold',
  },

  // RecordingCard Styles
  recordingCard: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  recordingTime: {
    color: '#777',
    fontSize: 12,
    marginBottom: 3,
  },
  recordingTitle: {
    fontWeight: '600',
    fontSize: 15,
    marginBottom: 6,
    color: '#000',
  },
  audioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  audioDuration: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 70,
    height: 30,
    backgroundColor: '#0D0D0D1A',
    justifyContent: 'center',
    borderRadius: 100,
  },
  durationText: {
    marginLeft: 5,
    fontWeight: '500',
  },
  iconRow: {
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'space-around',
  },
  TextIconContainer: {
    width: 30,
    height: 30,
    backgroundColor: '#0D0D0D1A',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },

  // BottomPlayer Styles
  bottomPlayer: {
    borderColor: '#eee',
    padding: 15,
    width: '95%',
    alignSelf: 'center',
    height: 180,
    backgroundColor: '#fff',
    marginBottom: 70,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  progressBar: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressBackground: {
    backgroundColor: '#E6ECEF',
    width: '100%',
    height: 60,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    overflow: 'hidden',
  },
  progressText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
    zIndex: 1,
  },
  pauseIcon: {
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
    marginRight: 5,
    zIndex: 1,
  },
  doneSection: {
    backgroundColor: '#D4F4DD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    height: 60,
    justifyContent: 'center',
  },
  doneText: {
    color: '#2E7D32',
    fontWeight: '600',
    fontSize: 16,
  },
  waveContainer: {
    position: 'absolute',
    height: '50%',
    width: '100%',
    bottom: 0,
    overflow: 'hidden',
  },
  waveLayer: {
    position: 'absolute',
    width: '200%',
    height: '300%',
    backgroundColor: '#A3CFFF',
    bottom: -50,
  },

  // SVG Styles (for all SVGs, assuming they share a minimal style)
  svg: {},
});

export default styles;
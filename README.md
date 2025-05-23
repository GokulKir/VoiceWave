![Voice Recorder App Banner](https://dl-file.cyberlink.com/web/upload-file/learning-center/enu/2025/1/Thumbnail_20250124011520483.jpg)

# Voice Recorder App - React Native Hiring Challenge

This is a React Native mobile application developed for the **Hiring Challenge for a React Native Developer (Advanced)**. The app allows users to record audio with a single tap on a centered record button, displays a live waveform preview of the audio input during recording, and stops the recording when tapped again. The waveform animates in real-time, providing a smooth and responsive user experience, inspired by apps like Loom.

## Features
- **Centered Record Button**: Starts/stops audio recording with a single tap.
- **Live Waveform Preview**: Displays a real-time, animated waveform of the audio input while recording, using SVG for smooth rendering.
- **Recording Timer**: Shows the duration of the recording in MM:SS format.
- **Pulse Animation**: The record button pulses during recording to provide visual feedback.
- **Permission Handling**: Requests microphone permissions on Android for a seamless experience.
- **Platform Support**: Fully functional on Android (iOS support can be added with a native module implementation).

## Demo
Watch a demo of the app in action:  
[Demo Video](https://drive.google.com/file/d/1FdjaQHxupXFFCT6rjHikgG4NGlgjSnbp/view?usp=sharing)

## APK File
The APK file for the app is included in the repository and can be downloaded for testing:  
- **Location in Repository**: `android/app/build/outputs/apk/debug/app-debug.apk`  
- **Direct Download**: [Download APK](https://drive.google.com/file/d/1GksDwZbG0GbBVFyKc5_EMvonr_jPOh7H/view?usp=sharing)

## Prerequisites
Ensure the following are installed before setting up the project:
- [Node.js](https://nodejs.org/) (v20 or higher)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)
- [Android Studio](https://developer.android.com/studio) (for Android development)
- Java Development Kit (JDK) 17 or higher
- An Android emulator or physical device with USB debugging enabled

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/voice-recorder-app.git
cd voice-recorder-app

### 2. Install Dependencies
Install the required Node.js dependencies:
```bash
npm install
```

### 3. Set Up the Native Module (AudioMeter)
The app uses a custom native module (`AudioMeter`) for audio recording on Android. Follow these steps to integrate it:

#### Android Setup
1. **Locate the Native Module Files**:
   - The native module files are in `android/app/src/main/java/com/recordwave/`:
     - `AudioMeterPackage.java`
     - `AudioMeterModule.java`

2. **Ensure the Module is Registered**:
   - Open `android/app/src/main/java/com/recordwave/MainApplication.java`.
   - Verify that `AudioMeterPackage` is added to the list of packages:
     ```java
     @Override
     protected List<ReactPackage> getPackages() {
       return Arrays.asList(
         new MainReactPackage(),
         new AudioMeterPackage() // Ensure this line is present
       );
     }
     ```

3. **Add Permissions**:
   - Open `android/app/src/main/AndroidManifest.xml` and ensure the following permission is added:
     ```xml
     <uses-permission android:name="android.permission.RECORD_AUDIO" />
     ```

4. **Sync the Project**:
   - Open the `android` folder in Android Studio.
   - Sync the project with Gradle by clicking "Sync Project with Gradle Files".

#### iOS Setup
*Note: iOS support is not implemented in this submission. To add iOS support, a native module for audio recording would need to be created using Objective-C or Swift.*

### 4. Run the App
Start the Metro bundler:
```bash
npx react-native start
```

Run the app on an Android emulator or device:
```bash
npx react-native run-android
```

### 5. Test the App
- Open the app on your emulator or device.
- Grant microphone permissions when prompted.
- Tap the record button to start recording and see the live waveform visualization.
- Tap again to stop recording, which resets the waveform.

## Project Structure
```
voice-recorder-app/
├── android/                    # Android native code
├── ios/                        # iOS native code (not implemented)
├── src/
│   ├── components/             # React Native components (RecordButton, WaveformVisualizer)
│   ├── hooks/                  # Custom hooks (useAudioMeter)
│   ├── screens/                # Screens (HomeScreen)
│   ├── services/               # Native module service (AudioMeterService)
│   ├── styles/                 # Global styles (globalStyles, theme)
│   ├── utils/                  # Utility functions (timer formatting)
│   └── navigation/             # Navigation setup
├── App.js                      # Entry point
├── package.json                # Dependencies
└── README.md                   # This file
```

## Dependencies
- `react-native`: Core framework
- `react-native-svg`: For rendering the waveform visualization
- `@react-navigation/stack`: For navigation
- Custom native module: `AudioMeter` (Android)

## Implementation Details
### Tech Stack Choices
- **Audio Recording**: Used a custom native module (`AudioMeter`) to handle audio recording and amplitude data on Android. This approach provides better performance and direct access to native APIs compared to third-party libraries.
- **Waveform Visualization**: Implemented using `react-native-svg` for smooth, real-time rendering of the waveform. The waveform bars are animated based on amplitude data from the native module, with a gradient effect for visual appeal.
- **UI/UX**: Designed a clean, minimal interface with a centered record button, a waveform container with shadow effects, and a timer for user feedback.

### Key Features
- **Real-Time Waveform**: The waveform updates in real-time using amplitude data emitted by the `AudioMeter` native module. SVG rendering ensures smooth performance without lag, with a maximum of 40 bars for optimal display.
- **Pulse Animation**: The record button uses React Native's `Animated` API to create a pulsing effect during recording, enhancing user feedback. The animation leverages `useNativeDriver` for better performance.
- **Permission Handling**: The app requests microphone permissions on Android using `PermissionsAndroid`, ensuring a seamless user experience.

### Code Quality
- Followed React Native best practices, including modular component structure, separation of concerns with custom hooks, and reusable styles.
- Used descriptive variable names and consistent formatting.
- Included error handling for recording failures and permission denials, with user-friendly alerts.

## Challenges Faced
- **Real-Time Waveform Rendering**: Ensuring the waveform updates smoothly without performance issues was challenging. Using `react-native-svg` and limiting the number of bars (`MAX_BARS = 40`) helped achieve this.
- **Native Module Integration**: Bridging the native module to React Native required careful setup, especially handling events (`AudioAmplitude`, `AudioError`) and ensuring proper cleanup with event listener removal.
- **Animation Performance**: The pulsing animation on the record button was optimized using `useNativeDriver` to avoid jank, ensuring a smooth user experience.

## Future Improvements
- Add iOS support with a native module for audio recording.
- Save recordings to device storage and allow playback functionality.
- Add more waveform customization options (e.g., color, bar width).
- Enhance error handling with more detailed user feedback.

## Evaluation Criteria Fulfillment
- **Functionality**: Fully meets all requirements, including start/stop recording, live waveform preview, and smooth animations.
- **Code Quality**: Code is clean, well-organized, and follows React Native best practices with modular components and hooks.
- **UI/UX Design**: The app has a minimal, user-friendly design with a focus on responsiveness, visual feedback (pulse animation), and aesthetics (gradient waveform, shadow effects).
- **Problem-Solving**: Effective use of a custom native module for audio recording and SVG for waveform rendering demonstrates a logical and efficient approach.

## Contributing
This project was built as part of a hiring challenge. Feel free to fork the repository and submit pull requests with improvements.

## License
This project is licensed under the MIT License.

## Contact
For any questions or feedback, please reach out to [Email Me](gokulkrishna22072003@gmail.com).

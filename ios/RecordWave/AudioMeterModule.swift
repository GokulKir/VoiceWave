// AudioMeterModule.swift
import AVFoundation
import React

@objc(AudioMeterModule)
class AudioMeterModule: RCTEventEmitter {
    private var audioRecorder: AVAudioRecorder?
    private var timer: Timer?
    private var isRecording = false
    
    override init() {
        super.init()
        // Request microphone permission
        AVAudioSession.sharedInstance().requestRecordPermission { granted in
            if !granted {
                self.sendErrorEvent(message: "Microphone permission not granted")
            }
        }
    }
    
    @objc override func supportedEvents() -> [String] {
        return ["AudioAmplitude", "AudioError"]
    }
    
    @objc(start)
    func start() {
        // Stop any existing recording
        stop()
        
        // Check microphone permission
        guard AVAudioSession.sharedInstance().recordPermission == .granted else {
            sendErrorEvent(message: "Microphone permission not granted")
            return
        }
        
        // Configure audio session
        do {
            let audioSession = AVAudioSession.sharedInstance()
            try audioSession.setCategory(.record, mode: .measurement, options: [])
            try audioSession.setActive(true)
        } catch {
            sendErrorEvent(message: "Failed to configure audio session: \(error.localizedDescription)")
            return
        }
        
        // Configure recorder
        let url = FileManager.default.temporaryDirectory.appendingPathComponent("temp_audio.m4a")
        let settings: [String: Any] = [
            AVFormatIDKey: kAudioFormatMPEG4AAC,
            AVSampleRateKey: 44100,
            AVNumberOfChannelsKey: 1,
            AVEncoderAudioQualityKey: AVAudioQuality.high.rawValue
        ]
        
        do {
            audioRecorder = try AVAudioRecorder(url: url, settings: settings)
            audioRecorder?.isMeteringEnabled = true
            audioRecorder?.prepareToRecord()
            audioRecorder?.record()
            isRecording = true
            
            // Start polling amplitude
            timer = Timer.scheduledTimer(withTimeInterval: 0.1, repeats: true) { [weak self] _ in
                self?.pollAmplitude()
            }
        } catch {
            sendErrorEvent(message: "Recorder start failed: \(error.localizedDescription)")
        }
    }
    
    @objc(stop)
    func stop() {
        timer?.invalidate()
        timer = nil
        
        if isRecording {
            audioRecorder?.stop()
            isRecording = false
        }
        
        audioRecorder = nil
        
        // Deactivate audio session
        do {
            try AVAudioSession.sharedInstance().setActive(false)
        } catch {
            sendErrorEvent(message: "Failed to deactivate audio session: \(error.localizedDescription)")
        }
    }
    
    private func pollAmplitude() {
        guard isRecording, let recorder = audioRecorder else { return }
        
        recorder.updateMeters()
        let averagePower = recorder.averagePower(forChannel: 0) // dB, range: -160 to 0
        let normalizedAmplitude = pow(10, averagePower / 20) * 32767 // Convert to 0-32767 range to match Android
        let amplitude = Int(max(0, min(normalizedAmplitude, 32767)))
        
        sendEvent(withName: "AudioAmplitude", body: ["amplitude": amplitude])
    }
    
    private func sendErrorEvent(message: String) {
        sendEvent(withName: "AudioError", body: ["error": message])
    }
    
    // Required for RCTEventEmitter
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
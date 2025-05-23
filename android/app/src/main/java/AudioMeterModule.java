package com.recordwave;

import android.Manifest;
import android.content.pm.PackageManager;
import android.media.MediaRecorder;
import android.os.Handler;
import android.os.Looper;

import androidx.annotation.NonNull;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class AudioMeterModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;
    private MediaRecorder recorder;
    private final Handler handler = new Handler(Looper.getMainLooper());
    private boolean isRecording = false;

    public AudioMeterModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "AudioMeter";
    }

    @ReactMethod
    public void start() {
        if (ContextCompat.checkSelfPermission(reactContext, Manifest.permission.RECORD_AUDIO)
                != PackageManager.PERMISSION_GRANTED) {
            WritableMap error = Arguments.createMap();
            error.putString("error", "Microphone permission not granted");
            emitError(error);
            return;
        }

        stop(); // Ensure clean start

        try {
            recorder = new MediaRecorder();
            recorder.setAudioSource(MediaRecorder.AudioSource.MIC);
            recorder.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4); // Safer
            recorder.setOutputFile(reactContext.getCacheDir().getAbsolutePath() + "/temp_audio.mp4");
            recorder.setAudioEncoder(MediaRecorder.AudioEncoder.AAC); // Safer
            recorder.prepare();
            recorder.start();
            isRecording = true;
            pollAmplitude();
        } catch (Exception e) {
            WritableMap error = Arguments.createMap();
            error.putString("error", "Recorder start failed: " + e.getMessage());
            emitError(error);
            e.printStackTrace();
        }
    }

    @ReactMethod
    public void stop() {
        try {
            if (recorder != null) {
                handler.removeCallbacksAndMessages(null);
                if (isRecording) {
                    recorder.stop();
                }
                recorder.release();
                recorder = null;
                isRecording = false;
            }
        } catch (Exception e) {
            WritableMap error = Arguments.createMap();
            error.putString("error", "Stop failed: " + e.getMessage());
            emitError(error);
        }
    }

    private void pollAmplitude() {
        if (!isRecording || recorder == null) return;

        try {
            int amplitude = recorder.getMaxAmplitude(); // Range: 0-32767
            WritableMap map = Arguments.createMap();
            map.putInt("amplitude", amplitude);
            sendEvent("AudioAmplitude", map);
        } catch (Exception e) {
            WritableMap error = Arguments.createMap();
            error.putString("error", "Amplitude error: " + e.getMessage());
            emitError(error);
        }

        handler.postDelayed(this::pollAmplitude, 100);
    }

    private void sendEvent(String eventName, WritableMap params) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
    }

    private void emitError(WritableMap error) {
        sendEvent("AudioError", error);
    }
}

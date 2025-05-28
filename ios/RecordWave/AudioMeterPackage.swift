// AudioMeterPackage.swift
import React

@objc(AudioMeterPackage)
class AudioMeterPackage: NSObject, RCTBridgeModule {
    static func moduleName() -> String! {
        return "AudioMeterPackage"
    }
    
    static func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    func createNativeModules(_ reactContext: RCTBridge!) -> [RCTBridgeModule] {
        return [AudioMeterModule()]
    }
    
    func createViewManagers(_ reactContext: RCTBridge!) -> [RCTViewManager] {
        return []
    }
}
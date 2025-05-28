// AudioMeterPackage.m
#import "AudioMeterPackage.h"
#import <React/RCTBridge.h>

@implementation AudioMeterPackage
RCT_EXPORT_MODULE();

- (NSArray<id<RCTBridgeModule>> *)createNativeModules:(RCTBridge *)reactContext {
  return @[[[AudioMeterModule alloc] init]];
}

- (NSArray<RCTViewManager *> *)createViewManagers:(RCTBridge *)reactContext {
  return @[];
}

@end
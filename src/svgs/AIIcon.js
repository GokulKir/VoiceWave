import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const AiIcon = () => {
  return (
    <View>
        <Svg width={17} height={17} viewBox="0 0 17 17" fill="none">
          <Path
            d="M4.5 4L4 6.5V8L2.5 10L3 11L4 11.5V13.5L4.5 14H6L6.5 14.5L7 15.5L9 16.5L12.5 15.5V11L14 10L14.5 5.5L12 2.5L8.5 2L4.5 4Z"
            fill="#222222"
          />
          {/* Add other <Path> tags from your original SVG if needed */}
        </Svg>
    </View>
  );
};

export default AiIcon;

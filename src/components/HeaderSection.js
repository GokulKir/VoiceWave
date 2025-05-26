import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PlusIcon from '../svgs/PlusIcon';
import GridIcon from '../svgs/GridIcon';
import SettingsIcon from '../svgs/SettingsIcon';
import styles from '../styles/globalStyles';

const HeaderSection = () => {
  return (
    <View style={styles.HeaderSection}>
      <View style={styles.HeaderOuterSection}>
        <TouchableOpacity>
          <PlusIcon size={16} />
        </TouchableOpacity>
        <TouchableOpacity>
          <GridIcon size={16} />
        </TouchableOpacity>
        <TouchableOpacity>
          <SettingsIcon size={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderSection;
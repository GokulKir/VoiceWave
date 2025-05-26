import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import styles from '../styles/globalStyles';

const FilterSection = ({ activeFilter, setActiveFilter }) => {
  const filters = ['All', 'Shared', 'Starred'];

  return (
    <View style={styles.filterContainer}>
      {filters.map(item => (
        <TouchableOpacity
          key={item}
          style={[
            styles.filterButton,
            activeFilter === item && styles.activeFilter,
          ]}
          onPress={() => setActiveFilter(item)}>
          <Text
            style={[
              styles.filterText,
              activeFilter === item && styles.activeFilterText,
            ]}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FilterSection;
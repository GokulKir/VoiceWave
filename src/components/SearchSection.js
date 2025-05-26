import React from 'react';
import { View, TextInput, Text, Platform, StyleSheet } from 'react-native';
import SearchIcon from '../svgs/SearchIcon';
import AIIcon from '../svgs/AIIcon';
import styles from '../styles/globalStyles';

const SearchSection = () => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBox}>
        <View style={styles.searchInput}>
          <SearchIcon />
          <TextInput
            placeholder="Search"
            placeholderTextColor={'#3C3C4399'}
            style={styles.SearchInp}
          />
          <View style={styles.AskAiStyle}>
            <AIIcon />
            <Text style={styles.AskTextStyle}>Ask AI</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SearchSection;
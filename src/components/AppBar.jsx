import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.tabBarBackground,
    display: 'flex',
    flexDirection: 'row',
  },
});

const AppBar = () => {
  return <View style={styles.container}>
      <AppBarTab label='Repositories' />
  </View>;
};

export default AppBar;
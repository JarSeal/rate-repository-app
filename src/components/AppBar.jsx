import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
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
      <ScrollView horizontal style={{flexDirection:'row'}}>
        <AppBarTab label='Repositories' to='/' />
        <AppBarTab label='Sign In' to='/signin' />
      </ScrollView>
  </View>;
};

export default AppBar;
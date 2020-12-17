import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useHistory } from 'react-router-native';
import { useApolloClient } from '@apollo/client';
import { useQuery } from '@apollo/react-hooks';

import { AUTHORIZED_USER } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';
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
  const authStorage = useContext(AuthStorageContext);
  const history = useHistory();
  const client = useApolloClient();
  const { data } = useQuery(AUTHORIZED_USER);
  const authorizedUser = data && data.authorizedUser
    ? data.authorizedUser
    : null;

  const logout = (to) => {
      authStorage.removeAccessToken();
      client.resetStore();
      history.push(to);
  };

  return <View style={styles.container}>
      <ScrollView horizontal style={{flexDirection:'row'}}>
        <AppBarTab label='Repositories' to='/' />
        { authorizedUser !== null
          ? <>
              <AppBarTab label='Create a review' to='/addreview' />
              <AppBarTab label='Logout' to='/signin' logout={logout} />
            </>
          : <>
              <AppBarTab label='Sign In' to='/signin' />
              <AppBarTab label='Sign Up' to='/signup' />
            </>
        }
      </ScrollView>
  </View>;
};

export default AppBar;
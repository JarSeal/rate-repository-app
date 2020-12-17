import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-native';
import { Menu, Divider, Provider } from 'react-native-paper';

import { GET_REPOSITORIES } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import ItemSeparator from './ItemSeparator';

const styles = StyleSheet.create({
  button: {
      fontSize: 16,
      padding: 16,
      flex: 1,
  },
});

const MenuButton = ({ onPress, text }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View><Text style={styles.button}>{text}</Text></View>
    </TouchableWithoutFeedback>
  );
};

const sortingOptions = {
  latest: 'Latest repositories',
  highestRated: 'Highest rated repositories',
  lowestRated: 'Lowest rated repositories',
};

const ListOrderMenu = ({ sorter, setSorter }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        style={{
          marginLeft: 8,
          marginTop: 48,
        }}
        anchor={<MenuButton onPress={openMenu} text={sortingOptions[sorter]} />}>
          <Menu.Item title="Sort repositories by.." disabled />
          <Divider />
          <Menu.Item onPress={() => {
            setSorter('latest');
            closeMenu();
            }} title={sortingOptions.latest} />
          <Menu.Item onPress={() => {
            setSorter('highestRated');
            closeMenu();
            }} title={sortingOptions.highestRated} />
          <Menu.Item onPress={() => {
            setSorter('lowestRated');
            closeMenu();
            }} title={sortingOptions.lowestRated} />
      </Menu>
    </View>
  );
};

export const RepositoryListContainer = ({ repositories, sorter, setSorter }) => {
  const history = useHistory();
  let repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <Provider>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={<ListOrderMenu sorter={sorter} setSorter={setSorter} />}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => history.push('/repository/' + item.id)}>
            <RepositoryItem item={item} />
          </TouchableOpacity>
        )}
      />
    </Provider>
  );
};

const RepositoryList = () => {
  const [ sorter, setSorter ] = useState('latest');
  const { data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: sorter === 'latest'
      ? { orderBy: 'CREATED_AT', orderDirection: 'DESC' }
      : { orderBy: 'RATING_AVERAGE',
          orderDirection: sorter === 'highestRated' ? 'DESC' : 'ASC'}
  });
  const repositories = data ? data.repositories : null;

  return (
    <RepositoryListContainer repositories={repositories} sorter={sorter} setSorter={setSorter} />
  );
};

export default RepositoryList;
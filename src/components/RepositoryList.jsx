import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View, Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-native';
import { Menu, Divider, Provider, Searchbar } from 'react-native-paper';

import { GET_REPOSITORIES } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';
import ItemSeparator from './ItemSeparator';

const styles = StyleSheet.create({
  button: {
      fontSize: 17,
      padding: 16,
      paddingLeft: 24,
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

let timer;
const SearchAndSort = ({ sorter, setSorter, setSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => {
    setSearchQuery(query);
    clearTimeout(timer);
    timer = setTimeout(() => {
      setSearch(query);
    }, 500);
  };
  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{marginLeft:16,marginRight:16,marginTop:16,}}
      />
      <ListOrderMenu sorter={sorter} setSorter={setSorter} />
    </>
  );
};

export const RepositoryListContainer = ({ repositories, sorter, setSorter, setSearch }) => {
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
        ListHeaderComponent={
          <SearchAndSort sorter={sorter} setSorter={setSorter} setSearch={setSearch} />
        }
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
  const [ search, setSearch ] = useState('');

  let variables = {};
  if(sorter === 'latest') {
    variables.orderBy = 'CREATED_AT';
    variables.orderDirection = 'DESC';
  } else {
    variables.orderBy = 'RATING_AVERAGE';
    if(sorter === 'highestRated') {
      variables.orderDirection = 'DESC';
    } else {
      variables.orderDirection = 'ASC';
    }
  }
  if(search.length) variables.searchKeyword = search;

  const { data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables
  });
  const repositories = data ? data.repositories : null;

  return (
    <RepositoryListContainer
      repositories={repositories}
      sorter={sorter}
      setSorter={setSorter}
      setSearch={setSearch} />
  );
};

export default RepositoryList;
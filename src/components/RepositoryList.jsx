import React from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { useHistory } from 'react-router-native';

import { GET_REPOSITORIES } from '../graphql/queries';
import RepositoryItem from './RepositoryItem';

import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.appBackground,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const history = useHistory();
  const repositoryNodes = repositories 
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => history.push('/repository/' + item.id)}>
          <RepositoryItem item={item} />
        </TouchableOpacity>
      )}
    />
  );
};

const RepositoryList = () => {
  const { data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });
  const repositories = data ? data.repositories : null;

  return (
    <RepositoryListContainer repositories={repositories} />
  );
};

export default RepositoryList;
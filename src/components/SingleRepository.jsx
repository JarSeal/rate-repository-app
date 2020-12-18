import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useParams } from 'react-router-native';

import useRepository from '../hooks/useRepository';
import ItemSeparator from './ItemSeparator';
import ReviewItem from './ReviewItem';
import RepositoryItem from './RepositoryItem';

const SingleRepository = () => {
    let { id } = useParams();

    const variables = {
        id, first: 4
    };
    const { repository, fetchMore } = useRepository(variables);
    if(!repository) {
        return (
            <View style={{padding: 16, backgroundColor: '#ffffff'}}>
                <Text>Loading repository..</Text>
            </View>
        );
    }
    const reviews = repository.reviews.edges.map(edge => edge.node);

    const onEndReach = () => {
        fetchMore();
    };

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryItem item={repository} single />}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
    );
};
  
  export default SingleRepository;

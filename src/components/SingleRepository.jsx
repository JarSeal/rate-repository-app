import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-native';

import ItemSeparator from './ItemSeparator';
import RepositoryItem from './RepositoryItem';
import { GET_REPOSITORY } from '../graphql/queries';

const styles = StyleSheet.create({
    item: {
        padding: 16,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
    },
    reviewLeft: {
        width: 50,
        marginRight: 16,
    },
    reviewRight: {
        flexShrink: 1,
    },
});
  
const ReviewItem = ({ review }) => {
    return (
        
        <View style={styles.item}>
            <View style={styles.reviewLeft}>
                <Text>{review.user.username}</Text>
            </View>
            <View style={styles.reviewRight}>
                <Text>{review.user.username}</Text>
            </View>
        </View>
    );
};

const SingleRepository = () => {
    let { id } = useParams();

    const { data } = useQuery(GET_REPOSITORY,{ variables: { id } });
    const repository = data && data.repository
        ? data.repository
        : null;
    if(!repository) {
        return (
            <View style={styles.item}>
                <Text>Loading repository..</Text>
            </View>
        );
    }
    const reviews = repository.reviews.edges.map(edge => edge.node);

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ListHeaderComponent={() => <RepositoryItem item={repository} single />}
            ItemSeparatorComponent={ItemSeparator}
        />
    );
};
  
  export default SingleRepository;

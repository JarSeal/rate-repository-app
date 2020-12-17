import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-native';
import { format } from 'date-fns';

import ItemSeparator from './ItemSeparator';
import RepositoryItem from './RepositoryItem';
import { GET_REPOSITORY } from '../graphql/queries';
import theme from '../theme';

const styles = StyleSheet.create({
    item: {
        padding: 16,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
    },
    reviewLeft: {
        width: 54,
        height: 54,
        borderRadius: 26,
        borderColor: theme.colors.primary,
        borderWidth: 3,
        marginRight: 12,
    },
    reviewNumber: {
        color: theme.colors.primary,
        fontSize: 18,
        fontWeight: theme.fontWeights.bold,
        textAlign: 'center',
        marginTop: 12,
    },
    reviewRight: {
        flexShrink: 1,
    },
    name: {
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.textPrimary,
        fontSize: theme.fontSizes.subheading,
        paddingBottom: 2,
        paddingTop: 2,
    },
    date: {
        color: theme.colors.textSecondary,
        paddingBottom: 4,
    },
});
  
const ReviewItem = ({ review }) => {
    return (
        
        <View style={styles.item}>
            <View style={styles.reviewLeft}>
                <Text style={styles.reviewNumber}>{review.rating}</Text>
            </View>
            <View style={styles.reviewRight}>
                <Text style={styles.name}>{review.user.username}</Text>
                <Text style={styles.date}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
                <Text style={styles.text}>{review.text}</Text>
            </View>
        </View>
    );
};

const SingleRepository = () => {
    let { id } = useParams();

    const { data } = useQuery(GET_REPOSITORY, {
        variables: { id },
        fetchPolicy: 'cache-and-network'
    });
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

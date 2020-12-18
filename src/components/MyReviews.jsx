import React from 'react';
import { FlatList } from 'react-native';

import useUser from '../hooks/useUser';
import ReviewItem from './ReviewItem';
import ItemSeparator from './ItemSeparator';
// import Button from './Button';

const MyReviews = () => {
    const variables = { first: 6 };
    const { authorizedUser, fetchMore } = useUser(variables);

    if(!authorizedUser) {
        return null;
    }

    const reviews = authorizedUser.reviews.edges.map(edge => edge.node);

    const onEndReach = () => {
        fetchMore();
    };

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} showRepoName />}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
    );
};

export default MyReviews;
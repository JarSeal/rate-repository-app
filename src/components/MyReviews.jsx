import React from 'react';
import { FlatList } from 'react-native';

import useUser from '../hooks/useUser';
import ReviewItem from './ReviewItem';
import ItemSeparator from './ItemSeparator';

const MyReviews = () => {
    const variables = { first: 6 };
    const { authorizedUser, fetchMore, refetch } = useUser(variables);

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
            renderItem={
                ({ item }) => <ReviewItem review={item} myReviews refetchMyReviews={() => refetch(variables)} />
            }
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
    );
};

export default MyReviews;
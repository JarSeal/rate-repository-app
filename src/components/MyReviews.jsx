import React from 'react';
import { FlatList } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import { AUTHORIZED_USER } from '../graphql/queries';
import ReviewItem from './ReviewItem';
import ItemSeparator from './ItemSeparator';
// import Button from './Button';

const MyReviews = () => {
    const variables = {};
    const { data } = useQuery(AUTHORIZED_USER, { variables });
    const authorizedUser = data && data.authorizedUser
        ? data.authorizedUser
        : null;

    if(!authorizedUser) {
        return null;
    }

    const reviews = data.authorizedUser.reviews.edges.map(edge => edge.node);

    console.log(reviews);

    return (
        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            ItemSeparatorComponent={ItemSeparator}
            // onEndReached={onEndReach}
            // onEndReachedThreshold={0.5}
        />
    );
};

export default MyReviews;
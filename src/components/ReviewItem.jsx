import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useHistory } from 'react-router-native';
import { useMutation } from '@apollo/react-hooks';
import { format } from 'date-fns';

import { DELETE_REVIEW } from '../graphql/mutations';
import Button from './Button';
import theme from '../theme';

const styles = StyleSheet.create({
    item: {
        padding: 16,
        backgroundColor: '#ffffff',
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

const ReviewItem = ({ review, myReviews, refetchMyReviews }) => {
    const history = useHistory();
    const [ mutate ] = useMutation(DELETE_REVIEW);

    const toRepository = (review) => {
        history.push('/repository/' + review.repositoryId);
    };
    
    const deleteReview = (review) => {
        Alert.alert(
            "Delete review",
            "Are you sure you want to delete this review?",
            [
                { text: "CANCEL", onPress: () => false },
                { text: "DELETE", onPress: async () => {
                    try {
                        const { data } = await mutate({ variables: { id: review.id }});
                        if(data.deleteReview && refetchMyReviews) {
                            refetchMyReviews();
                        }
                    } catch (e) {
                        const errorMsg = e.message.replace('GraphQL error: ', '');
                        Alert.alert('Could not delete a review', errorMsg);
                        console.log('Could not delete a review:', errorMsg);
                    }
                }}
            ]
        );
    };

    return (
        <View style={styles.item}>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.reviewLeft}>
                    <Text style={styles.reviewNumber}>{review.rating}</Text>
                </View>
                <View style={styles.reviewRight}>
                    <Text style={styles.name}>{
                        myReviews ? review.repository.fullName : review.user.username
                    }</Text>
                    <Text style={styles.date}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
                    <Text style={styles.text}>{review.text}</Text>
                </View>
            </View>
            { myReviews === true &&
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, marginRight: 8}}>
                        <Button onPress={() => toRepository(review)} text='View repository' />
                    </View>
                    <View style={{flex: 1, marginLeft: 8}}>
                        <Button onPress={() => deleteReview(review, refetchMyReviews)} text='Delete review' color='#d73a4a' />
                    </View>
                </View>
            }
        </View>
    );
};

export default ReviewItem;
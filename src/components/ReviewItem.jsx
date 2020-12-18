import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
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

const ReviewItem = ({ review, showRepoName }) => {
    return (
        <View style={styles.item}>
            <View style={styles.reviewLeft}>
                <Text style={styles.reviewNumber}>{review.rating}</Text>
            </View>
            <View style={styles.reviewRight}>
                <Text style={styles.name}>{
                    showRepoName ? review.repository.fullName : review.user.username
                }</Text>
                <Text style={styles.date}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
                <Text style={styles.text}>{review.text}</Text>
            </View>
        </View>
    );
};

export default ReviewItem;
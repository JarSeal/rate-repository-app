import React from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';

import { GET_REPOSITORY } from '../graphql/queries';
import theme from '../theme';

const styles = StyleSheet.create({
    item: {
        padding: 16,
        backgroundColor: '#ffffff',
    },
    topItem: {
        flexDirection: 'row',
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 16,
        borderRadius: 4,
    },
    topItemInfo: {
        flexShrink: 1,
    },
    name: {
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.textPrimary,
        fontSize: theme.fontSizes.subheading,
        paddingBottom: 5,
        paddingTop: 5,
    },
    description: {
        color: theme.colors.textSecondary,
        paddingBottom: 8,
    },
    languagesContainer: {
        flexDirection: 'row',
    },
    languageBox: {
        backgroundColor: theme.colors.primary,
        color: '#ffffff',
        padding: 6,
        borderRadius: 4,
    },
    bottomItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    numbers: {
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 16,
    },
    numbersAmount: {
        fontWeight: theme.fontWeights.bold,
        textAlign: 'center',
    },
    numbersLabel: {
        textAlign: 'center',
        marginTop: 4,
        color: theme.colors.textSecondary,
    },
    button: {
        textAlign: 'center',
        backgroundColor: theme.colors.primary,
        padding: 16,
        borderRadius: 4,
        fontWeight: theme.fontWeights.bold,
        color: '#ffffff',
        marginTop: 16,
    },
});

export const showShortedNumbers = (number) => {
    if(number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else if(number >= 1000) {
        return (number / 1000).toFixed(1) + 'k';
    } else {
        return number;
    }
};

const RepositoryItem = ({ item, single }) => {
    let { id } = useParams();

    if(single) {
        const { data } = useQuery(GET_REPOSITORY,{ variables: { id } });
        if(!data || !data.repository) {
            return (
                <View style={styles.item}>
                    <Text>Loading repository..</Text>
                </View>
            );
        } else {
            item = data.repository;
        }
    }

    return (
        <View style={styles.item}>
            <View style={styles.topItem}>
                <Image
                    style={styles.image}
                    source={{ uri:item.ownerAvatarUrl }} />
                <View style={styles.topItemInfo}>
                    <Text style={styles.name} testID='fullName'>{ item.fullName }</Text>
                    <Text style={styles.description} testID='description'>{ item.description }</Text>
                    <View style={styles.languagesContainer}>
                        <Text style={styles.languageBox} testID='language'>{ item.language }</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottomItem}>
                <View style={styles.numbers}>
                    <Text style={styles.numbersAmount} testID='stars'>{ showShortedNumbers(item.stargazersCount) }</Text>
                    <Text style={styles.numbersLabel}>Stars</Text>
                </View>
                <View style={styles.numbers}>
                    <Text style={styles.numbersAmount} testID='forks'>{ showShortedNumbers(item.forksCount) }</Text>
                    <Text style={styles.numbersLabel}>Forks</Text>
                </View>
                <View style={styles.numbers}>
                    <Text style={styles.numbersAmount} testID='reviews'>{ showShortedNumbers(item.reviewCount) }</Text>
                    <Text style={styles.numbersLabel}>Reviews</Text>
                </View>
                <View style={styles.numbers}>
                    <Text style={styles.numbersAmount} testID='rating'>{ showShortedNumbers(item.ratingAverage) }</Text>
                    <Text style={styles.numbersLabel}>Rating</Text>
                </View>
            </View>
            { single === true &&
                <TouchableWithoutFeedback onPress={() => Linking.openURL('https://www.github.com/' + item.fullName)}>
                    <Text style={styles.button}>Open in GitHub</Text>
                </TouchableWithoutFeedback>
            }
        </View>
    );
};
  
export default RepositoryItem;

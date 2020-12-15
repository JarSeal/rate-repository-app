import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
    item: {
        padding: 16,
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
    }
});

const showShortedNumbers = (number) => {
    if(number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else if(number >= 1000) {
        return (number / 1000).toFixed(1) + 'k';
    } else {
        return number;
    }
};

const RepositoryList = ({ item }) => {
    return (
        <View style={styles.item}>
            <View style={styles.topItem}>
                <Image
                    style={styles.image}
                    source={{ uri:item.ownerAvatarUrl }} />
                <View style={styles.topItemInfo}>
                    <Text style={styles.name}>{ item.fullName }</Text>
                    <Text style={styles.description}>{ item.description }</Text>
                    <View style={styles.languagesContainer}>
                        <Text style={styles.languageBox}>{ item.language }</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottomItem}>
                <View style={styles.numbers}>
                    <Text style={styles.numbersAmount}>{ showShortedNumbers(item.stargazersCount) }</Text>
                    <Text style={styles.numbersLabel}>Stars</Text>
                </View>
                <View style={styles.numbers}>
                    <Text style={styles.numbersAmount}>{ showShortedNumbers(item.forksCount) }</Text>
                    <Text style={styles.numbersLabel}>Forks</Text>
                </View>
                <View style={styles.numbers}>
                    <Text style={styles.numbersAmount}>{ showShortedNumbers(item.reviewCount) }</Text>
                    <Text style={styles.numbersLabel}>Reviews</Text>
                </View>
                <View style={styles.numbers}>
                    <Text style={styles.numbersAmount}>{ showShortedNumbers(item.ratingAverage) }</Text>
                    <Text style={styles.numbersLabel}>Rating</Text>
                </View>
            </View>
        </View>
    );
};
  
export default RepositoryList;

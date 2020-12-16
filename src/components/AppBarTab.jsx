import React from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Link } from 'react-router-native';

import theme from '../theme';

const styles = StyleSheet.create({
    tab: {
        color: theme.colors.tabBarTabText,
        fontSize: theme.fontSizes.tabBarTabText,
        fontWeight: theme.fontWeights.bold,
        padding: 16,
    },
});

const AppBarTab = ({ label, to, logout }) => {
    if(logout) {
        return (<TouchableWithoutFeedback onPress={() => logout(to)}>
            <View><Text style={styles.tab}>{ label }</Text></View>
        </TouchableWithoutFeedback>);
    } else {
        return (<Link to={to}>
            <Text style={styles.tab}>{ label }</Text>
        </Link>);
    }
};

export default AppBarTab;
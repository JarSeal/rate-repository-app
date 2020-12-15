import React from 'react';
import { Text, StyleSheet } from 'react-native';
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

const AppBarTab = ({ label, to }) => {
    return <Link to={to}>
        <Text style={styles.tab}>{ label }</Text>
    </Link>;
};

export default AppBarTab;
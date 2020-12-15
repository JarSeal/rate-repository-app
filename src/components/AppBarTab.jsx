import React from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
    tab: {
        color: theme.colors.tabBarTabText,
        fontSize: theme.fontSizes.tabBarTabText,
        fontWeight: theme.fontWeights.bold,
        padding: 10,
    },
});

const AppBarTab = ({ label }) => {
    return <TouchableWithoutFeedback onPress={() => alert('Pressed!')}>
        <Text style={styles.tab}>{ label }</Text>
    </TouchableWithoutFeedback>;
};

export default AppBarTab;
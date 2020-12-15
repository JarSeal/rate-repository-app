import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
    tab: {
        color: theme.colors.tabBarTabText,
        fontSize: theme.fontSizes.tabBarTabText,
        fontWeight: theme.fontWeights.bold,
        padding: 16,
    },
});

const AppBarTab = ({ label }) => {
    return <TouchableWithoutFeedback onPress={() => alert('Pressed!')}>
        <View><Text style={styles.tab}>{ label }</Text></View>
    </TouchableWithoutFeedback>;
};

export default AppBarTab;
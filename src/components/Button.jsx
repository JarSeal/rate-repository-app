import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    button: {
        textAlign: 'center',
        padding: 16,
        borderRadius: 4,
        fontWeight: theme.fontWeights.bold,
        color: '#ffffff',
        marginTop: 16,
    },
});

const Button = ({ text, onPress, testID, color }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress} testID={testID}>
            <View><Text style={{...styles.button, backgroundColor: color || theme.colors.primary}}>{ text }</Text></View>
        </TouchableWithoutFeedback>
    );
};

export default Button;
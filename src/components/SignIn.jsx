import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import theme from '../theme';

import FormikTextInput from './FormikTextInput';
import Text from './Text';

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#ffffff',
    },
    button: {
        textAlign: 'center',
        backgroundColor: theme.colors.primary,
        padding: 16,
        borderRadius: 4,
        fontWeight: theme.fontWeights.bold,
        color: '#ffffff',
    },
});

const SignIn = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" secureTextEntry />
            <TouchableWithoutFeedback onPress={onSubmit}>
                <Text style={styles.button}>Sign In</Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default SignIn;
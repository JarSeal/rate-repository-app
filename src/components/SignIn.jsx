import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import theme from '../theme';
import UseSignIn from '../hooks/useSignIn';
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

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .max(40, 'Too Long!')
        .required('Username is required!'),
    password: yup
        .string()
        .max(40, 'Too Long!')
        .required('Password is required!'),
});
  
const initialSignInValues = {
    username: '',
    password: ''
};

const SignInForm = ({ onSubmit }) => {
    return <View style={styles.container}>
        <FormikTextInput name="username" placeholder="Username" />
        <FormikTextInput name="password" placeholder="Password" secureTextEntry />
        <TouchableWithoutFeedback onPress={onSubmit}>
            <Text style={styles.button}>Sign In</Text>
        </TouchableWithoutFeedback>
    </View>;
};

const SignIn = () => {
    const [ signIn ] = UseSignIn();

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            const { data } = await signIn({ username, password });
            console.log('RESULT', data);
        } catch (e) {
            Alert.alert('Sign In Failed', e.message.replace('GraphQL error: ', ''));
        }
    };

    return (
        <Formik
            initialValues={initialSignInValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default SignIn;
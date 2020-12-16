import React, { useContext, useEffect, useState } from 'react';
import { TouchableWithoutFeedback, View, StyleSheet, Alert } from 'react-native';
import { useApolloClient } from '@apollo/client';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import AuthStorageContext from '../contexts/AuthStorageContext';

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
        <TouchableWithoutFeedback onPress={onSubmit} testID='submitButton'>
            <Text style={styles.button}>Sign In</Text>
        </TouchableWithoutFeedback>
    </View>;
};

export const FormikForm = ({ onSubmit }) => {
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

const SignIn = () => {
    const [ signIn ] = useSignIn();
    const [ token, setToken ] = useState(null);
    const client = useApolloClient();
    const authStorage = useContext(AuthStorageContext);
    const history = useHistory();

    useEffect(() => {
        const checkToken = async () => {
            const accessToken = await authStorage.getAccessToken();
            if(token !== accessToken) {
                setToken(accessToken);
            }
        };
        checkToken();
        if(token) {
            history.push('/');
        }
    }, [token, setToken]);

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            const { data } = await signIn({ username, password });
            if(data && data.authorize && data.authorize.accessToken) {
                authStorage.setAccessToken(data.authorize.accessToken);
                setToken(data.authorize.accessToken);
                client.resetStore();
                history.push('/');
            }
        } catch (e) {
            Alert.alert('Sign in failed', e.message.replace('GraphQL error: ', ''));
        }
    };

    if(token) {
        return null;
    }

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
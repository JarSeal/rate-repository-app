import React, { useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useApolloClient } from '@apollo/client';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useQuery } from '@apollo/react-hooks';

import { AUTHORIZED_USER } from '../graphql/queries';
import Button from './Button';
import useSignIn from '../hooks/useSignIn';
import FormikTextInput from './FormikTextInput';
import AuthStorageContext from '../contexts/AuthStorageContext';

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#ffffff',
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
        <Button text='Sign In' onPress={onSubmit} testID='submitButton' />
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
    const client = useApolloClient();
    const authStorage = useContext(AuthStorageContext);
    const history = useHistory();
    const { data } = useQuery(AUTHORIZED_USER, { variables: {}});
    const authorizedUser = data && data.authorizedUser
        ? data.authorizedUser
        : null;

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            const { data } = await signIn({ username, password });
            authStorage.setAccessToken(data.authorize.accessToken);
            client.resetStore();
            history.push('/');
        } catch (e) {
            const errorMsg = e.message.replace('GraphQL error: ', '');
            Alert.alert('Sign in failed', errorMsg);
            console.log('Sign in failed:', errorMsg);
        }
    };

    if(authorizedUser) {
        return null;
    }

    return (
        <FormikForm onSubmit={onSubmit} />
    );
};

export default SignIn;
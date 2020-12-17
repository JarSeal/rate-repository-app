import React, { useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useApolloClient } from '@apollo/client';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { AUTHORIZED_USER } from '../graphql/queries';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';
import Button from './Button';
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
        .min(1, 'Username too short.')
        .max(30, 'Username too long.')
        .required('Username is required!'),
    password: yup
        .string()
        .min(5, 'Password too short.')
        .max(50, 'Password too long.')
        .required('Password is required!'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords do not match!')
        .required('Password confirmation is required!'),
});
  
const initialValues = {
    username: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = ({ onSubmit }) => {
    return <View style={styles.container}>
        <FormikTextInput name="username" placeholder="Username" />
        <FormikTextInput name="password" placeholder="Password" secureTextEntry />
        <FormikTextInput name="confirmPassword" placeholder="Password confirmation" secureTextEntry />
        <Button text='Create a New User' onPress={onSubmit} />
    </View>;
};

export const FormikForm = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

const SignUp = () => {
    const [ signIn ] = useSignIn();
    const client = useApolloClient();
    const authStorage = useContext(AuthStorageContext);
    const history = useHistory();
    const [ mutate ] = useMutation(CREATE_USER);
    const { data } = useQuery(AUTHORIZED_USER);
    const authorizedUser = data && data.authorizedUser
        ? data.authorizedUser
        : null;

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            await mutate({ variables: {
                username, password
            }});
            const { data } = await signIn({ username, password });
            authStorage.setAccessToken(data.authorize.accessToken);
            client.resetStore();
            history.push('/');
        } catch (e) {
            const errorMsg = e.message.replace('GraphQL error: ', '');
            Alert.alert('Could not create a user', errorMsg);
            console.log('Could not create a user:', errorMsg);
        }
    };

    if(authorizedUser) {
        return null;
    }

    return (
        <FormikForm onSubmit={onSubmit} />
    );
};

export default SignUp;
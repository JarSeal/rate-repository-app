import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { AUTHORIZED_USER } from '../graphql/queries';
import { CREATE_REVIEW } from '../graphql/mutations';
import Button from './Button';
import FormikTextInput from './FormikTextInput';

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#ffffff',
    },
});

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required('Repository owner name is required!'),
    repositoryName: yup
        .string()
        .required('Password is required!'),
    rating: yup
        .number()
        .min(0, 'Provide a number between 0 and 100.')
        .max(100, 'Provide a number between 0 and 100.')
        .required('Rating number between 0 and 100 is required!'),
    text: yup
        .string(),
});
  
const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '',
    text: ''
};

const AddReviewForm = ({ onSubmit }) => {
    return <View style={styles.container}>
        <FormikTextInput name="ownerName" placeholder="Repository owner name" />
        <FormikTextInput name="repositoryName" placeholder="Repository name" />
        <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
        <FormikTextInput name="text" placeholder="Review" />
        <Button text='Add a Review' onPress={onSubmit} />
    </View>;
};

export const FormikForm = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <AddReviewForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

const AddReview = () => {
    const history = useHistory();
    const [ mutate ] = useMutation(CREATE_REVIEW);
    const { data } = useQuery(AUTHORIZED_USER);
    const authorizedUser = data && data.authorizedUser
        ? data.authorizedUser
        : null;

    const onSubmit = async (values) => {
        const { ownerName, repositoryName, rating, text } = values;
        try {
            const { data } = await mutate({ variables: {
                ownerName, repositoryName, rating: parseInt(rating), text
            }});
            const repoId = data.createReview.repository.id;
            history.push('/repository/' + repoId);
        } catch (e) {
            const errorMsg = e.message.replace('GraphQL error: ', '');
            Alert.alert('Could not create a review', errorMsg);
            console.log('Could not create a review:', errorMsg);
        }
    };

    if(!authorizedUser) {
        history.push('/signin');
        return null;
    }

    return (
        <FormikForm onSubmit={onSubmit} />
    );
};

export default AddReview;
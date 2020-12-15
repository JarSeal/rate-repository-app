import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../graphql/mutations';

const useSignIn = () => {
    const [mutate, result] = useMutation(LOGIN);
  
    const signIn = async ({ username, password }) => {
        return mutate({ variables: { username, password } });
    };
  
    return [signIn, result];
};

export default useSignIn;
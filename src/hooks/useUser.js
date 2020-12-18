import { useQuery } from '@apollo/react-hooks';
import { AUTHORIZED_USER } from '../graphql/queries';

const useUser = (variables) => {
    const { data, loading, fetchMore, refetch, ...result } = useQuery(AUTHORIZED_USER, {
        variables,
        fetchPolicy: 'cache-and-network'
    });
  
    const handleFetchMore = () => {
        const canFetchMore =
            !loading && data && data.authorizedUser.reviews.pageInfo.hasNextPage;
    
        if (!canFetchMore) {
            return;
        }
    
        fetchMore({
            query: AUTHORIZED_USER,
            variables: {
                after: data.authorizedUser.reviews.pageInfo.endCursor,
                ...variables,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
            const nextResult = {
                authorizedUser: {
                    ...fetchMoreResult.authorizedUser,
                    reviews: {
                        ...previousResult.authorizedUser.reviews,
                        ...fetchMoreResult.authorizedUser.reviews,
                        edges: [
                            ...previousResult.authorizedUser.reviews.edges,
                            ...fetchMoreResult.authorizedUser.reviews.edges,
                        ],
                    },
                },
            };
    
            return nextResult;
            },
        });
    };
  
    return {
        authorizedUser: data ? data.authorizedUser : undefined,
        fetchMore: handleFetchMore,
        loading,
        refetch,
        ...result,
    };
};

export default useUser;
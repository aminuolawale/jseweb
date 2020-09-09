import { gql, useQuery } from '@apollo/client';
import React from 'react';
import Button from '../components/Button';
import NoteFeed from '../components/NoteFeed';
import {GET_NOTES} from "../gql/query";


const Home = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error!</p>;
  return (
    <React.Fragment>
      <NoteFeed notes={data.noteFeed.notes}></NoteFeed>
      {data.noteFeed.hasNextPage && (
        <Button
          onClick={() =>
            fetchMore({
              variables: {
                cursor: data.noteFeed.cursor
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                  noteFeed: {
                    cursor: fetchMoreResult.noteFeed.cursor,
                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                    notes: [
                      ...previousResult.noteFeed.notes,
                      ...fetchMoreResult.noteFeed.notes
                    ],
                    __typename: 'noteFeed'
                  }
                };
              }
            })
          }
        >
          Load More
        </Button>
      )}
    </React.Fragment>
  );
};

export default Home;

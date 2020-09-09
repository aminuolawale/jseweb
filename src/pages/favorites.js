import React, { useEffect } from 'react';
import {useQuery} from "@apollo/client";
import {GET_MY_FAVORITES} from "../gql/query";
import NoteFeed from "../components/NoteFeed";

const Favorites = () => {
  useEffect(() => {
    document.title = 'Favorites - Notedly';
  });

  const {loading, error, data} = useQuery(GET_MY_FAVORITES);
  if (loading) return "Loading...";
  if (error) return "Error...";

  if (data.me.favorites.length!==0){
    return (
      <NoteFeed notes={data.me.favorites}></NoteFeed>
    )
  } else {
    return <p>You have no favorites</p>
  }
};

export default Favorites;

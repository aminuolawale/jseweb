import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_ME } from '../gql/query';
import DeleteNote from './DeleteNote';
import FavoriteNote from './FavoriteNote';

const NoteUser = props => {
  const { loading, error, data } = useQuery(GET_ME);
  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error!</p>;

  return (
    <React.Fragment>
      <FavoriteNote
        me={data.me}
        noteId={props.note.id}
        favoriteCount={props.note.favoriteCount}
      ></FavoriteNote>
      <br></br>
      Favorites:{props.note.favoriteCount}
      <br></br>
      {data.me.id === props.note.author.id && (
        <React.Fragment>
          <Link to={`/edit/${props.note.id}`}>Edit</Link>
          <br></br>
          <DeleteNote noteId={props.note.id}></DeleteNote>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default NoteUser;

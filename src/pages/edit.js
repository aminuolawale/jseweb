import { useMutation, useQuery } from '@apollo/client';
import React from 'react';
import NoteForm from '../components/NoteForm';
import { EDIT_NOTE } from '../gql/mutation';
import { GET_ME, GET_NOTE } from '../gql/query';

const EditNote = props => {
  const id = props.match.params.id;
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
  const { data: userdata } = useQuery(GET_ME, {});
  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id
    },
    onCompleted: () => {
      props.history.push(`/note/${id}`);
    }
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! Note not found!</p>;
  if (userdata && (userdata.me.id !== data.note.author.id)){
      return <p>You do not have access to edit this note!</p>
  }
  return <NoteForm content={data.note.content} action={editNote}></NoteForm>;
};

export default EditNote;

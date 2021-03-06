import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from "styled-components";
import { IS_LOGGED_IN } from "../gql/query";
import NoteUser from "./NoteUser";


const StyledNote = styled.article`
    max-width:800px;
    margin: 0 auto;
`;

const MetaData = styled.div`
    @media(min-width: 500px) {
        display: flex;
        align-items: top;
    }
`;


const MetaInfo = styled.div`
    padding-right: 1em;
`;


const UserActions = styled.div`
    margin-left: auto;
`;

const Note = ({ note }) => {
    const {loading, error, data} = useQuery(IS_LOGGED_IN);
    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error!</p>;
    console.log("the user is logged in", data.isLoggedIn);
  return (
    <StyledNote>
        <MetaData>
        <MetaInfo>
        <img src={note.author.avatar} alt={`${note.author.username} avatar`} height="50px"></img>
        </MetaInfo>
        <MetaInfo>
        <em>by</em> {note.author.username} <br></br>
        {format(note.createdAt, "MM Do YYYY")}
        </MetaInfo>
        {data.isLoggedIn? (
            <UserActions>
                <NoteUser note ={note}></NoteUser>
            </UserActions>
        ):(
            <UserActions>
                <em>Favorites:</em> {note.favoriteCount}
            </UserActions>
        )}
        
        </MetaData>
        <ReactMarkdown source={note.content}></ReactMarkdown>
    </StyledNote>
  );
};

export default Note;

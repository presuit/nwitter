import React, { useState } from "react";
import { dbService } from "../fbase";
import styled from "styled-components";

const Wrapper = styled.div``;

const NweetWrapper = styled.div`
    video {
        width: 100%;
        height: 100%;
    }
`;

const NweetForm = styled.form`
    margin-bottom: 20px;
`;

const NweetInput = styled.input`
    border: 0;
    outline: none;
    padding: 10px;
    text-align: center;
    margin-right: 10px;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    &[type="submit"] {
        background-color: #34495e;
        color: #ecf0f1;
        font-weight: 600;
    }
`;

const NweetButton = styled.button`
    outline: none;
    font-size: 15px;
    font-weight: 600;
    width: 30%;
    padding: 10px;
    border-radius: 10px;
    border: 0;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    color: rgba(231, 76, 60, 1);
    margin-right: 20px;
`;

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [modifiedNweet, setModifiedNweet] = useState(nweetObj.text);
    const toggleEditClick = (e) => {
        setModifiedNweet(nweetObj.text);
        setEditing((prev) => !prev);
    };
    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setModifiedNweet(value);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.collection("nweets").doc(nweetObj.id).update({
            text: modifiedNweet,
        });
        setEditing(false);
    };
    const onDeleteClick = async (e) => {
        const ok = window.confirm("are you sure delete this nweet?");
        if (ok) {
            await dbService.collection("nweets").doc(nweetObj.id).delete();
        }
    };
    return (
        <Wrapper>
            {editing ? (
                <NweetWrapper>
                    <NweetForm onSubmit={onSubmit}>
                        <NweetInput type="text" placeholder="Edit Nweet" value={modifiedNweet} onChange={onChange} />
                        <NweetInput type="submit" value="Edit" />
                    </NweetForm>
                    <NweetButton onClick={toggleEditClick}>Cacel Editing</NweetButton>
                </NweetWrapper>
            ) : (
                <NweetWrapper>
                    <video src={nweetObj.attachmentUrl} controls />
                    <h3>{nweetObj.text}</h3>
                    <h5>{nweetObj.createdAt}</h5>
                    {isOwner && (
                        <>
                            <NweetButton onClick={toggleEditClick}>Edit Nweet</NweetButton>
                            <NweetButton onClick={onDeleteClick}>Delete Nweet</NweetButton>
                        </>
                    )}
                </NweetWrapper>
            )}
        </Wrapper>
    );
};

export default Nweet;

import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidV4 } from "uuid";
import { dbService, storageService } from "../fbase";
import Nweet from "../Components/Nweet";
import styled from "styled-components";
import { toast } from "react-toastify";

const Wrapper = styled.div`
    height: 100%;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px 20px;
`;

const HomeForm = styled.form`
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const HomeInput = styled.input`
    width: 100%;
    border: 0;
    outline: none;
    padding: 10px;
    text-align: center;
    margin-right: 10px;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    font-size: 20px;
    font-weight: 600;
    &[type="submit"] {
        background-color: #34495e;
        color: #ecf0f1;
        font-weight: 600;
        text-transform: uppercase;
    }
`;

const HomeGrid = styled.div`
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-rows: repeat(3, minmax(min-content, 1fr));
    grid-template-columns: repeat(3, minmax(min-content, 1fr));
    gap: 20px;
`;

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [videoUrl, setVideoUrl] = useState("");
    const fileRef = useRef(null);

    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setNweet(value);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        let attachmentUrl;

        if (videoUrl !== "") {
            console.log(videoUrl);
            const videoRef = storageService.ref().child(`${userObj.uid}/${uuidV4()}`);
            const response = await videoRef.putString(videoUrl, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }

        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };

        await dbService.collection("nweets").add(nweetObj);
        toast.success("업로드!");
        fileRef.current.value = "";
        setNweet("");
        setVideoUrl("");
    };
    useEffect(() => {
        dbService
            .collection("nweets")
            .orderBy("createdAt", "desc")
            .onSnapshot((snapshot) => {
                setNweets(
                    snapshot.docs.map((doc) => {
                        return { id: doc.id, ...doc.data() };
                    })
                );
            });
    }, []);
    const onFileChange = (e) => {
        const {
            target: { files },
        } = e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (onLoadEvent) => {
            const {
                currentTarget: { result },
            } = onLoadEvent;
            setVideoUrl(result);
        };
        reader.readAsDataURL(theFile);
    };
    return (
        <Wrapper>
            <HomeForm onSubmit={onSubmit}>
                <HomeInput type="text" placeholder="write anything what you want" value={nweet} required onChange={onChange} />
                <HomeInput type="file" accept="video/*" onChange={onFileChange} ref={fileRef} />
                <HomeInput type="submit" value="nweet!" />
            </HomeForm>
            <HomeGrid>
                {nweets.map((nweet) => {
                    return <Nweet key={nweet.id} nweetObj={nweet} isOwner={userObj.uid === nweet.creatorId}></Nweet>;
                })}
            </HomeGrid>
        </Wrapper>
    );
};

export default Home;

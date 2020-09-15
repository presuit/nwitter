import React, { useState } from "react";
import { authService } from "../fbase";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";

const Wrapper = styled.div`
    height: 100%;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ProfileForm = styled.form`
    margin-bottom: 20px;
`;

const ProfileInput = styled.input`
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

const ProfileButton = styled.button`
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
`;

const Profile = ({ userObj, refreshUser }) => {
    const [modifiedUsername, setModifiedUsername] = useState(userObj.displayName);
    const history = useHistory();
    const logOut = async () => {
        await authService.signOut();
        toast.success("로그아웃 되셨습니다!!!!!");
        refreshUser();

        history.push("/");
    };
    const onChange = (e) => {
        const {
            target: { value },
        } = e;
        setModifiedUsername(value);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        await userObj.updateProfile({
            displayName: modifiedUsername,
        });
        refreshUser();
        toast.success(`${userObj.displayName}으로 프로필 이름이 변경되셨습니다.`);
    };
    return (
        <Wrapper>
            <ProfileForm onSubmit={onSubmit}>
                <ProfileInput type="text" onChange={onChange} placeholder="your username" value={modifiedUsername} />
                <ProfileInput type="submit" value="Edit Username" />
            </ProfileForm>
            <ProfileButton onClick={logOut}>Log Out</ProfileButton>
        </Wrapper>
    );
};

export default Profile;

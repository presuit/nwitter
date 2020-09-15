import React, { useState } from "react";
import styled from "styled-components";
import { authService, fbaseInstance } from "../fbase";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const AuthWrapper = styled.div`
    width: 50%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const AuthForm = styled.form`
    margin-bottom: 10px;
`;

const AuthInput = styled.input`
    border: 0;
    outline: none;
    padding: 10px;
    margin-right: 10px;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    &[type="submit"] {
        background-color: #34495e;
        color: #ecf0f1;
    }
`;

const AuthButton = styled.button`
    outline: none;
    border: 0;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    padding: 10px;
    width: 50%;
    &:not(:last-child) {
        margin: 15px 0px;
    }
    &:first-of-type {
        background-color: #34495e;
        color: #ecf0f1;
    }
    &:last-of-type {
        background: #fc466b;
        background: -webkit-linear-gradient(to right, #3f5efb, #fc466b);
        background: linear-gradient(to right, #3f5efb, #fc466b);
        color: #ecf0f1;
    }
`;

const AuthToggleButton = styled.div`
    width: 100px;
    height: 100px;
    background-color: dodgerblue;
    position: relative;
    border-top-right-radius: 10%;
    border-bottom-right-radius: 10%;
    &::before {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: -100%;
        background-color: firebrick;
        border-top-left-radius: 10%;
        border-bottom-left-radius: 10%;
    }
    div {
        width: 125%;
        height: 100%;
        position: absolute;
        top: 0;
        left: -25%;
        background-color: #f7f7f7;
        transition: left 0.3s ease-in-out;
        /* border-radius: 10%; */
    }
`;

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const onChange = (e) => {
        const {
            target: { name, value },
        } = e;
        if (name === "Email") {
            setEmail(value);
        } else if (name === "Password") {
            setPassword(value);
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (newAccount) {
                await authService.createUserWithEmailAndPassword(email, password);
            } else {
                await authService.signInWithEmailAndPassword(email, password);
            }
        } catch (error) {
            setError(error.message);
        }
    };
    const onClick = async (e) => {
        const provider = new fbaseInstance.auth.GoogleAuthProvider();
        try {
            await authService.signInWithPopup(provider);
        } catch (error) {
            setError(error.message);
        }
    };
    const toggleLogin = (e) => {
        const {
            target: { style },
        } = e;
        if (newAccount) {
            style.left = "-100%";
        } else {
            style.left = "-25%";
        }
        setNewAccount((prev) => !prev);
    };
    return (
        <Wrapper>
            <AuthWrapper>
                <AuthForm onSubmit={onSubmit}>
                    <AuthInput type="email" name="Email" value={email} onChange={onChange} placeholder="email" required />
                    <AuthInput type="password" name="Password" value={password} onChange={onChange} placeholder="password" required />
                    <AuthInput type="submit" value={newAccount ? "Sign In" : "Log In"} />
                </AuthForm>
                <AuthToggleButton>
                    <div onClick={toggleLogin}></div>
                </AuthToggleButton>
                <AuthButton onClick={onClick}>Continue With Google</AuthButton>
                <span>{error}</span>
            </AuthWrapper>
        </Wrapper>
    );
};

export default Auth;

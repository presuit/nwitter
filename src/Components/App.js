import React, { useState, useEffect } from "react";
import AppRouter from "./Router";
import { authService } from "../fbase";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../whole.css";

const Wrapper = styled.div`
    background-color: #ecf0f1;
    height: 100%;
    min-height: 80vh;
`;

const FooterWrapper = styled.footer`
    width: 100%;
    height: 100%;
    display: flex;
    padding: 30px 0px;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    opacity: 0.3;
    font-weight: 600;
`;

function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                setUserObj({
                    displayName: user.displayName,
                    uid: user.uid,
                    updateProfile: (args) => user.updateProfile(args),
                });
            }
            setInit(true);
        });
    }, []);

    const refreshUser = () => {
        const user = authService.currentUser;
        if (user) {
            setUserObj({
                displayName: user.displayName,
                uid: user.uid,
                updateProfile: (args) => user.updateProfile(args),
            });
        } else {
            setUserObj(null);
        }
    };
    return (
        <Wrapper>
            {init ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser} /> : "Initializing"}
            <FooterWrapper>&copy; Presuit {new Date().getFullYear()}</FooterWrapper>
            <ToastContainer position={"bottom-left"} />
        </Wrapper>
    );
}

export default App;

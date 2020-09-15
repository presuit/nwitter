import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    margin-bottom: 30px;
`;

const NavigationLink = styled(Link)`
    padding: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    border-radius: 10px;
    color: #2c2c2c;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: -100%;
        background: linear-gradient(120deg, transparent, rgba(44, 62, 80, 0.4), transparent);
        transition: all 0.4s ease-in-out;
    }
    &:hover {
        &::before {
            left: 100%;
        }
    }

    span {
        font-weight: 700;
    }
`;

const Navigation = ({ userObj }) => {
    return (
        <Wrapper>
            <NavigationLink to="/">
                <span>Home</span>
            </NavigationLink>
            <NavigationLink to="/profile">
                <span>{userObj.displayName}의 Profile</span>
            </NavigationLink>
        </Wrapper>
    );
};

Navigation.propTypes = {
    userObj: PropTypes.object.isRequired,
};

export default Navigation;

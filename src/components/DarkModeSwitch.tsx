'use client'


import React from 'react';
import {MdLightMode} from "react-icons/md";
import {BsFillMoonFill} from "react-icons/bs";
import {useTheme} from "next-themes";

const DarkModeSwitch = () => {
    const {systemTheme, theme, setTheme} = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;
    return (

        <>
            {currentTheme === "dark" ? (<MdLightMode/>) : (<BsFillMoonFill/>)}


        </>
    );
};

export default DarkModeSwitch;
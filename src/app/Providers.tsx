'use client'


import React from 'react';
import {ThemeProvider} from "next-themes";

// @ts-ignore
const Providers = ({children}) => {
    return (
        <ThemeProvider >
            {children}
        </ThemeProvider>
    );
};

export default Providers;
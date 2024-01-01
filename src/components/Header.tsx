import React from 'react';
import MenuItem from "@/components/MenuItem";
import {AiFillHome} from "react-icons/ai";
import {BsFillInfoCircleFill} from "react-icons/bs";
import Link from "next/link";

const Header = () => {
    return (<div className="flex justify-between mx-2 max-w-6xl sm:mx-auto items-center py-6">
        <div className="flex">
            <MenuItem title="HOME" address="/" Icon={AiFillHome}/>
            <MenuItem title="ABOUT" address="/about" Icon={BsFillInfoCircleFill}/>
        </div>
        <div className="flex items-center space-x-5">
            <Link href="/">
                <h2 className="text-2xl">
            <span className="font-bold bg-amber-500 py-1 px-2 rounded-lg mr-1">
              MovieHub
            </span>
                </h2>
            </Link>
        </div>
    </div>);
};

export default Header;
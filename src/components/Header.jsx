import React from 'react';
import MenuItem from "@/components/MenuItem";
import {AiFillHome} from "react-icons/ai";

const Header = () => {
    return (<div>
        <div className=''>

            <MenuItem title='HOME' address='/' Icon={AiFillHome}/>
        </div>
        <div className=''>

        </div>

    </div>);
};

export default Header;
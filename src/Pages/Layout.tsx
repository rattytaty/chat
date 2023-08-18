import React from 'react';
import {Outlet} from "react-router-dom";
import '../style.scss'

export const Layout = () => {
    return <div className="formsWrapper">
        <Outlet/>
    </div>
};
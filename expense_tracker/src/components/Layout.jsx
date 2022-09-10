import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
        <div className='grid grid-cols-7 gap-1'>
            <div className='hidden md:block md:col-span-2 xl:col-span-1 '>
                <Sidebar />
            </div>

            <div className='md:col-span-5 xl:col-span-6'>
                { children }
                <Outlet />
            </div>
        </div>
    </React.Fragment>
  )
}

export default Layout;
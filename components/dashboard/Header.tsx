import React from 'react'
// import DashboardIcon from '@material-ui/icons/Dashboard';
import {RiDashboardFill} from 'react-icons/ri';
// import CropLandscapeIcon from '@material-ui/icons/CropLandscape';
// import AppsIcon from '@material-ui/icons/Apps';
// import PersonIcon from '@material-ui/icons/Person';
import {BsFillPersonFill} from 'react-icons/bs';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {MdOutlineExitToApp} from 'react-icons/md';

const Header = () => {
    return (
        <div className="flex shadow-sm bg-slate-900/50 px-1 md:px-4 py-1 md:py-3 justify-between md:h-auto ">
            <div className="flex space-x-3  ">
                {/* <p className="text-green-600 text-sm md:text-xl font-bold md:font-semibold">Create </p> */}
                {/* <p>0xc14D1bdD7A28b12fa3e88FE2bE9e193Bdfdlk8bb940A6</p> */}
                {/* <CropLandscapeIcon className="text-gray-300" /> */}
                <RiDashboardFill size={ 18 } className="cursor-pointer text-gray-300" />

            </div>
            <div className="flex gap-1 md:gap-4 text-gray-400 ">

                <BsFillPersonFill size={ 18 } className="cursor-pointer" />
                <MdOutlineExitToApp size={ 18 } color="secondary" className="cursor-pointer" />
                <p className="text-white text-sm md:text-lg font-semibold cursor-pointer ">Close</p>
            </div>
        </div>
    )
}

export default Header

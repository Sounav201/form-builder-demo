import React, { useContext } from 'react'
// import DashboardIcon from '@material-ui/icons/Dashboard';
import {RiDashboardFill} from 'react-icons/ri';
// import CropLandscapeIcon from '@material-ui/icons/CropLandscape';
// import AppsIcon from '@material-ui/icons/Apps';
// import PersonIcon from '@material-ui/icons/Person';
import {BsFillPersonFill} from 'react-icons/bs';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {MdOutlineExitToApp} from 'react-icons/md';
import axios from 'axios';
import { useRouter } from 'next/router'
import AppContext from '../../src/context/appContext';

const Header = () => {

    const router = useRouter();
    const {user,setUser} = useContext(AppContext);

    const handleLogout = async () => {
        console.log('Logout clicked!')
        
            const params = { key: "static_key" };

            const result = await axios.post("/api/auth/logout", params);
            if (result.status == 200) {
              router.push("/");
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              setUser("");
            }
          
        
    }
    return (
        <div className="flex shadow-sm bg-slate-900/50 px-1 md:px-4 py-1 md:py-3 justify-between md:h-auto ">
            <div className="flex space-x-3  ">
                <RiDashboardFill size="1.5em" className="cursor-pointer text-gray-300" />
            </div>
            <div className="flex gap-1 md:gap-4 text-gray-400 ">

                <BsFillPersonFill size="1.5em" className="cursor-pointer" />
                <MdOutlineExitToApp onClick={handleLogout} size="1.5em" color="secondary" className="cursor-pointer" />
                {/* <p className="text-white text-sm md:text-lg font-semibold cursor-pointer ">Close</p> */}
            </div>
        </div>
    )
}

export default Header

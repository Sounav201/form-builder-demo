import  React from 'react';
import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css"
// import { Doughnut } from 'react-chartjs-2';

const data = {
    labels: [

    ],
    datasets: [{
        data: [10, 100],
        // backgroundColor: [
        //     ' rgba(67, 56, 202)',
        //     'rgba(229, 231, 235)',

        // ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',

        ]
    }]
};


const RightBar = ({ darkMode, setDarkMode }) => {
    useEffect(() => {
        AOS.init({
          disable: function () {
            var maxWidth = 768
            return window.innerWidth < maxWidth
          },
          duration: 800,
        })
      }, [])
    return (
        <div className="bg-cetacean/70 md:bg-cetacean/80 dark:bg-slate-900/50 h-60 md:h-72 w-full rounded-xl " data-aos="zoom-in-up">
            <div className="border-b p-3 border-gray-100">
                <p className="font-semibold text-white font-spacemono text-lg md:text-xl ">Archives</p>
            </div>
            <div className="flex flex-col items-center p-3">
                
            </div>
        </div>
    )
}

export default RightBar

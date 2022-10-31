import React from 'react'
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


const RightBar = () => {
    return (
        <div className="bg-slate-900/50 h-44 md:h-64 w-full rounded-xl ">
            <div className="border-b p-3 border-gray-100">
                <p className="font-semibold text-violet-400 font-spacemono md:text-xl ">Archives</p>
            </div>
            <div className="flex flex-col items-center p-3">
                
            </div>
        </div>
    )
}

export default RightBar

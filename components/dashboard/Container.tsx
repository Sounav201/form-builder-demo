import React from 'react'

import Card from './Card'
import Middle from './Middle'
import RightBar from './RightBar'


const Container = () => {
    return (
        <div className=" h-full  " >
            <div className="  px-3 md:px-8 mt-2 md:mt-8 ">
                <div className="flex flex-row gap-1 md:gap-4">
                    <p className="pt-1 md:pt-2 text-yellow-400 font-semibold text-lg md:text-2xl font-spacemono ">
                        Hey! <br />
                    </p>
                    <p className="  font-semibold md:font-bold text-2xl md:text-4xl font-spacemono bg-gradient-to-r from-sky-300 to-green-600 md:tracking-wide text-transparent bg-clip-text ">
                        Saharsha.
                    </p>
                </div>
                <p className="pl-2 md:pl-4 py-2 md:py-3 font-extrabold text-4xl md:text-6xl bg-gradient-to-r from-purple-800 to-pink-500 md:tracking-wide text-transparent bg-clip-text animate-text mb-8 md:mb-16">
                    Let's build your form <br/> Together !
                </p>
            </div>
            {/* <p className=" px-8 py-1 font-semibold text-green-600 text-xl transform -translate-y-2">
                    Forms made by you
            </p> */}
            <div className="flex flex-col  mt-2 md:mt-6 gap-3 md:gap-6  mx-1 md:mx-3">
                <Middle />
                <RightBar />
            </div>
            <div className=" flex flex-col px-2 md:px-8 gap-1 md:gap-2 ">
                <p className=" py-1 font-semibold text-xl md:text-2xl  font-spacemono pt-4 bg-gradient-to-r from-rose-700 to-yellow-400 md:tracking-wide text-transparent bg-clip-text animate-text ">Create a Form now</p>
                <p className="px-2 md:px-4 font-extrabold text-2xl md:text-4xl bg-gradient-to-r from-sky-300 to-green-500 md:tracking-wide text-transparent bg-clip-text animate-text pb-4 ">Choose from the templates below</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 px-1 py-1  md:p-4 gap-1 md:gap-3">
                <Card title="Form-1" balance={"QUIZ"} icon={0} />
                <Card title="Form-2" balance={"SURVEY"} icon={1} />
                <Card title="Form-3" balance={"FEEDBACK"} icon={2} />
                <Card title="Form-4" balance={"ATTENDANCE"} icon={3} />

            </div>
        </div>
    )
}

export default Container

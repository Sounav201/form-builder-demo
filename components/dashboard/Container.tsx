import React, { Fragment, useEffect, useState} from 'react'
import {BsFillSunFill} from 'react-icons/bs';
import {BsFillMoonFill} from 'react-icons/bs';
import {AiOutlineArrowUp} from 'react-icons/ai';
import Card from './Card'
import Middle from './Middle'
import RightBar from './RightBar'
// import Modal from '../Modal';
// import sampleTemplate from '../templates/sampleTemplate';
import quizTemplate from '../templates/quizTemplate';
import surveyTemplate from '../templates/surveyTemplate';
import feedbackTemplate from '../templates/feedbackTemplate';
import attendanceTemplate from '../templates/attendanceTemplate';
import { useRouter } from 'next/router';
import {isMobile} from 'react-device-detect';
import { generateUUID } from '../../services/generateUUID';
const setFormtemplate = (templateChoice, formName) => {
    if(typeof window !== "undefined") {
        localStorage.setItem("formAreaItems", JSON.stringify(templateChoice));
        localStorage.setItem("formHeading", JSON.stringify(formName));
        //Generate ID 
        const formID = generateUUID();
        return formID;
    }
}

const enumTypeDict ={
    "QUIZ":quizTemplate,
    "SURVEY":surveyTemplate,
    "FEEDBACK":feedbackTemplate,
    "ATTENDANCE":attendanceTemplate
}

const Container = ({ darkMode, setDarkMode,formsLoading }) => {
    // const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    
    const chooseTemplateClick = async(templateChoice, formName) => {
        console.log('Selected Template : ', templateChoice);
        console.log('Choice of template : ', enumTypeDict[templateChoice]);
        const selectedTemplate = enumTypeDict[templateChoice];        
        if(isMobile)
        {
            router.push('/mobileredirect');
        }
        else{
            const formID = setFormtemplate(selectedTemplate, formName);
            router.push(`/forms/${formID}`);
        }
        
        // if(!(isMobile))
        // {
        //     router.push('/builder');
        // }
        

    }

    useEffect(() => {
        handleScroll()
        window.addEventListener("scroll", handleScroll)
        return () => {
          window.removeEventListener("scroll", handleScroll)
        }
      }, [])
    
      const handleScroll = () => {
        const maxHeight = document.documentElement.clientHeight
        setScrollY(Math.round((Math.floor(window.scrollY) / maxHeight) * 100))
    
        // if (window.pageYOffset > heroRef.current.clientHeight) {
        //   setIsVisible(true)
        // } else {
        //   setIsVisible(false)
        // }
      }
    
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    
    return (
        <div className=" h-full  z-40" >
            <div className="  px-3 md:px-8 mt-4 md:mt-8 ">
                {/* <div className="flex flex-row gap-1 md:gap-4">
                    <p className="pt-1 md:pt-2 text-yellow-400 font-semibold text-lg md:text-2xl font-spacemono ">
                        Hey! <br />
                    </p>
                    <p className="  font-semibold md:font-bold text-2xl md:text-4xl font-spacemono bg-gradient-to-r from-sky-300 to-green-600 md:tracking-wide text-transparent bg-clip-text ">
                        Saharsha.
                    </p>
                </div> */}
                <div className="animate-bounce flex mt-6 text-2xl md:text-5xl">
                    <p className="font-semibold text-rose-800 dark:text-white">Hi there</p>
                    <p className="font-extrabold text-primary dark:text-yellow-500 ">!</p>
                </div>
                <p className="pl-2 md:pl-4 py-2 md:py-3 font-extrabold text-3xl md:text-6xl bg-sky-600 md:bg-blue-600 dark:bg-gradient-to-r dark:from-yellow-500 dark:to-yellow-400 md:tracking-wide text-transparent bg-clip-text animate-text mb-8 md:mb-16">
                    {"Let's build your form"} <br/> {"Together !"}
                </p>
            </div>
            {/* <p className=" px-8 py-1 font-semibold text-green-600 text-xl transform -translate-y-2">
                    Forms made by you
            </p> */}
            <div className="absolute top-[5%] md:top-[7%] right-[6%] md:right-[4%] ">
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="transition duration-300 ease-in-out text-2xl text-yellow-500 dark:text-white hover:scale-125 hover:text-rose-800 dark:hover:text-yellow-500"
                    >
                    {darkMode ? <BsFillMoonFill className="text:3xl md:text-4xl"/> : <BsFillSunFill className='text-3xl md:text-5xl'/>}
                </button>
                <button
                    type="button"
                    onClick={scrollToTop}
                    className={` fixed md:left-[8%] right-[8%] bottom-[3%] lg:bottom-[5%] h-12 w-12 z-40 animate-bounce bg-primary dark:bg-primary dark:hover:bg-rose-800 hover:bg-sky-600 text-background dark:hover:text-white dark:text-background font-bold hover:text-white transition duration-300 ease-in-out items-center rounded-full p-3 shadow-sm`}
                >
                    <AiOutlineArrowUp size="1.5em" />
                </button>
            </div>
            <div className="flex flex-col  mt-2 md:mt-6 gap-3 md:gap-6  mx-1 md:mx-3" >
                <Middle darkMode={darkMode} setDarkMode={setDarkMode} formsLoading={formsLoading}/>
                <RightBar darkMode={darkMode} setDarkMode={setDarkMode} formsLoading={formsLoading} />
            </div>
            <div className=" flex flex-col px-2 md:px-8 gap-1 md:gap-1 ">
                <p className=" py-1 text-rose-800 dark:text-white font-semibold text-lg md:text-2xl  font-spacemono pt-4  md:tracking-wide animate-text ">Create a Form now</p>
                <p className="px-2 md:px-4 font-extrabold text-2xl md:text-4xl bg-gradient-to-r from-blue-700/90 to-sky-900/90 dark:bg-gradient-to-r dark:from-sky-300 dark:to-green-500 md:tracking-wide text-transparent bg-clip-text animate-text pb-4 ">Choose from the templates below</p>
            </div>
            <Fragment>
                <div className="grid grid-cols-2 md:grid-cols-4 px-1 py-1  md:p-4 gap-1 md:gap-3 ">
                    <Card chooseTemplateClick={chooseTemplateClick} title="Form-1" balance={"QUIZ"} icon={0} />
                    <Card chooseTemplateClick={chooseTemplateClick} title="Form-2" balance={"SURVEY"} icon={1} />
                    <Card chooseTemplateClick={chooseTemplateClick} title="Form-3" balance={"FEEDBACK"} icon={2} />
                    <Card chooseTemplateClick={chooseTemplateClick} title="Form-4" balance={"ATTENDANCE"} icon={3} />

                </div>
                {/* <Modal isVisible={showModal}/> */}
            </Fragment>
        </div>
    )
}

export default Container

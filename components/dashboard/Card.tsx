import React from 'react'
import { useState } from 'react';
// import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import {RiQuestionAnswerFill} from 'react-icons/ri';
// import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {MdPeopleAlt} from 'react-icons/md';
// import FeedbackIcon from '@material-ui/icons/Feedback';
import {BsFillChatQuoteFill} from 'react-icons/bs';
// import GroupAddIcon from '@material-ui/icons/GroupAdd';
import {TiGroup} from 'react-icons/ti';
import { ChakraProvider, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, FormHelperText, Input, Button, useDisclosure } from '@chakra-ui/react';
import Swal from 'sweetalert2';

const Style = "text-white text-xs"

const arrayIcon = [<RiQuestionAnswerFill size="1.25em" key={Style} />, <MdPeopleAlt size="1.25em" key={Style} />, <BsFillChatQuoteFill size="1.25em" key={Style} />, <TiGroup size="1.25em" key={Style} />]
const Color = ["from-indigo-500 to-blue-400", "from-yellow-400 to-yellow-300", "from-green-500 to-green-400", "from-pink-500 to-pink-400"]


const Card = (props) => {
    var balance = props.balance
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [formName, setFormName] = useState('');
    const handleModalClose = () => onClose();

    return (
        <>
        <div 
        onClick={onOpen}  
        // onClick={() => props.chooseTemplateClick(balance)}
        className={`transform hover:scale-105  transition delay-100 w-full cursor-pointer p-1 md:p-2 md:py-4 shadow-xl  border font-spacemono rounded-xl bg-gradient-to-r ${Color[props.icon]}`} >
            <div className="flex justify-between">
                <div></div>
                <div className=" w-auto h-auto md:w-10  md:h-10 flex items-center justify-center text-slate-800 bg-gray-300 rounded-full p-1 md:p-0.5 m-1  bg-opacity-60">
                    {arrayIcon[props.icon]}
                </div>
            </div>
            <p className="text-white text-xs  ">
                {props.title}
            </p>
            <p className="text-white text-sm md:text-lg  font-semibold  ">
                {props.balance} 
            </p>
            <p className="text-white  text-sm ">
                {"build now"}
            </p>
        </div>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>

          <ModalBody>
            <form
              id="new-note"
              onSubmit={(event) => {
                event.preventDefault();
                // console.log(formName)
                
                props.chooseTemplateClick(balance, formName)
                Swal.fire({
                  title: 'Form Created!',
                  text: 'You can now start building your form',
                  icon: 'success',
                  confirmButtonText: 'Go'})
              }}
            >
              <FormControl>
                <FormLabel>{[props.balance]} Form</FormLabel>
                <Input type="text" placeholder='Enter Form Name' value={formName} onChange={({ target }) => setFormName(target?.value)} />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" form="new-note" colorScheme={`whatsapp`} onClick={handleModalClose}>
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </>
    )
}

export default Card

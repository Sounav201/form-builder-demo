import React, {useEffect,useState} from 'react'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Stack, Box, Textarea } from '@chakra-ui/react'
import { useDropzone } from 'react-dropzone'
import {BsUpload} from "react-icons/bs"

const FileUploadElement = (props: any) => {
    const [files,setFiles] = useState([])

    useEffect(() => {
        if(files.length>0)
            console.log("Files :  ",files)
    }, [files])
    const {getRootProps, getInputProps} = useDropzone({

    accept:("image/*") as any,
    onDrop:(acceptedFiles) => {
        setFiles(acceptedFiles.map((file) => Object.assign(file,{
            preview:URL.createObjectURL(file)
            
        }))
    )
    //console.log(preview)

    console.log("File upload successful!");

    }

    
    })



  return (
    <div className=''>
            <Stack w={[300, 550, 700]} marginX="auto" maxWidth={800}   >
                <FormControl w={[300, 500, 600]} marginX="auto">
                <FormLabel style={{fontWeight:"700"}} >{props.question}</FormLabel>

                    <div className='mt-4 mb-4'>
                    <div {...getRootProps()} className="border-2 border-dashed border-black bg-slate-100/25  my-4">
        <div className="flex place-content-center items-center" >
                        <input  {...getInputProps()}/>
                        <div className="mx-auto my-2 md:my-4 grid grid-rows-2  gap-y-1 md:gap-y-2">
                            
                            <BsUpload  className="mx-auto" color="black" size={24}/>
                            
                            <div className="text-xl text-black text-center">Upload files here</div>
                            <span className="text-md text-black">Max upload limit: 3MB</span>
                        </div>
                </div>    

        </div>


                    </div>

                </FormControl>
            </Stack>

    </div>
  )
}

export default FileUploadElement
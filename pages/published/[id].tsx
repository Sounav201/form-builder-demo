import React, { useState,useEffect } from 'react'
import ShortTextElement from "../../components/display-form/elements/ShortTextElement"
import LongTextElement from '../../components/display-form/elements/LongTextElement'
import { useRouter } from 'next/router'
import CheckboxElement from '../../components/display-form/elements/CheckboxElement'
import FileUploadElement from '../../components/display-form/elements/FileUploadElement'
import Link from 'next/link'
import RatingElement from '../../components/display-form/elements/RatingElement'
import Swal from 'sweetalert2'
// const fetchFormDataByID = async(formID:any) => {
//   try {
//     var endpoint = ``
//     if(process.env.NODE_ENV == "development")
//     {
//       endpoint = `http://localhost:3000/api/fetchFormbyID`
//     }
//     else if(process.env.NODE_ENV == "production")
//     {
//       endpoint = `https://form-builder-demo.vercel.app/api/fetchFormbyID`
//     }
//     const response = await fetch(endpoint,{
//       method:"POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({formID:formID})
//     })
  
//     const res = await response.json()
  
//     //console.log('Data from fetchFormDataByID',data)
//     return res.data;  
//   } catch (error) {
//     console.log('Error in fetchFormDataByID paths :',error)
//   }
  
// }

// const getPaths = async(APIendpoint) => {
//   console.log('Endpoint : ', APIendpoint);
//   try {
//     const res = await fetch(APIendpoint);
//     console.log('res status : ',res.status);
//     const data = await res.json();
//     console.log('Data back in getPaths: ',data)
//     return data.data;  
//   } catch (error) {
//     console.log('Error in getPaths : ',error)
//   }
  
// }


// export const getStaticPaths = async() => {
//   var endpoint = ``
//   if(process.env.NODE_ENV === "development")
//   {
//     endpoint = `http://localhost:3000/api/fetchAllForms`
//   }
//   else if(process.env.NODE_ENV === "production")
//   {
//     endpoint = `https://form-builder-demo.vercel.app/api/fetchAllForms`
//   }
// const data = await getPaths(endpoint);
// console.log('Data from getStaticPaths ',data);
// const paths = data ? data.length>0 && data.map((form:any) => {
//   return{
//   params:{id:  form.Formid}
//   }
//   }) : []

// return{
//   paths,
//   fallback:true,
// }
  
// }

// export async function getStaticProps(context:any) {
//   console.log('Params id : ', context.params.id)
//   let formID = context.params.id
//   const data = await fetchFormDataByID(formID)
//   console.log('Data from getStaticProps',data)
//   return {props:{data:data}, revalidate:1}
// }

export async function getServerSideProps(context:any) {
  console.log('Params id : ', context.params.id)
  let formID = context.params.id
  console.log('Form ID ', formID)
  return {props:{formID:formID}}
}


const Published = ({formID}:any) => {

  // console.log('Form data from Published',data || {});
  // console.log('Form Heading: ', data[0]?.name || "" );
  // console.log('Form Data: ', data[0]?.Form_data || "" ) ;
  
  // // const [formData, setformData] = useState(data[0]?.Form_data || [])
  // const [formHeading, setformHeading] = useState(data[0]?.name || "Form")
  const [formData, setformData] = useState([])
  const [formHeading, setformHeading] = useState("Form")

  useEffect(() => {
    async function fetchData(formID) {
      const res = await fetch('/api/fetchFormbyID',{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({formID:formID})
      })
      if(res.status == 200)
      {
        const resData = await res.json();
        const data = resData.data;
        console.log('Form data: ', data);
        
        setformData(data[0]?.Form_data || [])
        setformHeading(data[0]?.name || "Form")
          
      }
    }
    if(formData.length == 0)
    { 
      fetchData(formID)
      
    }
  }, [formData])
  
  const handleSubmit = async () => {
    console.log('Form Submitted');
  }

  if(formData.length == 0)
  return <div className='h-screen bg-black flex items-center justify-center text-center'>
    <h1 className='text-3xl font-medium text-white'>Loading...</h1>
    
    </div>

  return (
    <div className='bg-cover min-h-screen flex flex-col bg-background'>
              <div  className='w-7/13 my-4 bg-cover bg-violet-200 p-2 mx-auto '>
            <div className="text-3xl font-bold my-4 text-center outline-none  w-full ">{formHeading}</div>
            <form onSubmit={handleSubmit}>
          {formData.length> 0 && formData.map((element,idx) => {
            if(element.type == "shorttext")
            {
                return(
                <div key={idx} className="w-10/11 mx-auto my-4">
                    <ShortTextElement question={element.question} attributes={element.attributes} />    
                </div>)
            }
            else if(element.type == "longtext")
            {
            return(
            <div key={idx} className="w-10/11 mx-auto my-4">
            
            <LongTextElement question={element.question} attributes={element.attributes} />

        </div>)
        


            }
            else if(element.type == "checkbox")
            {
                return (
                    <div key={idx} className="w-10/11 mx-auto my-4">
                        <CheckboxElement  question={element.question} attributes={element.attributes} />

                    </div>
                )
            }
            else if(element.type == "fileupload")
            {
                return (
                    <div key={idx} className="w-10/11 mx-auto my-4">
                        <FileUploadElement  question={element.question} attributes={element.attributes} />

                    </div>
                )
            }

            else if(element.type == "rating")
            {
                return (
                    <div key={idx} className="w-10/11 mx-auto my-4">
                    <RatingElement question={element.question} attributes={element.attributes} />
                    </div>
                )
            }

        })}
        </form>
        </div>
  
    </div>
  )
}



export default Published
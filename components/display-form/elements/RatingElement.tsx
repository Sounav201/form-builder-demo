import React, { useState } from 'react'
import Image from 'next/image'
import { FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Stack, Textarea, Box } from '@chakra-ui/react'
import { FaStar, FaRegSmileBeam, FaHeart } from "react-icons/fa"

const RatingElement = (props:any) => {
    const rateLimit = props.attributes.limit;
    const choiceOfElement = props.attributes.emoji;
    const [rating,setRating] = useState(null);
    const [hover,setHover] = useState(null);
    const hoverColor = props.attributes.styling.hoverColor || "#c31432"
    const blockColor = props.attributes.styling.fillColor;


    return (
        <div>    
            <Stack w={['100%', 550, 700]} marginX="auto" maxWidth={800}   >
            <FormControl w={['100%', 500, 600]} marginX="auto">
                <FormLabel   >{props.question}</FormLabel>
                <div className='mt-6 mb-4'>

                    <div className="my-2  flex ">
                        {[...Array(rateLimit)].map((star, i) => {
                            const ratingVal = i + 1;

                            return (
                                <>
                                    {choiceOfElement == "Heart" ?
                                        (<>
                                            <label className="hidden md:block">
                                                <input type="radio"   className="radio hidden" name={props.question} value={ratingVal} onClick={() => setRating(ratingVal)} />

                                                <FaHeart
                                                    className="rating cursor-pointer transition-colors duration-200 mx-1"
                                                    color={ratingVal <= (hover || rating) ? hoverColor : blockColor}
                                                    size={48}
                                                    onMouseEnter={() => setHover(ratingVal)} onMouseLeave={() => setHover(null)}
                                                />
                                            </label>
                                            <label className=" block md:hidden">
                                                <input type="radio" className="radio hidden" name={props.question} value={ratingVal} onClick={() => setRating(ratingVal)} />
                                                <FaHeart
                                                    className="rating cursor-pointer transition-colors duration-200 mx-1"
                                                    color={ratingVal <= (hover || rating) ? hoverColor : blockColor}
                                                    size={27}
                                                    onMouseEnter={() => setHover(ratingVal)} onMouseLeave={() => setHover(null)}
                                                />
                                            </label>


                                        </>) : choiceOfElement == "Smiley" ?

                                            (<>

                                                <label className="hidden md:block">
                                                    <input type="radio" className="radio hidden" name={props.question} value={ratingVal} onClick={() => setRating(ratingVal)} />

                                                    <FaRegSmileBeam
                                                        className="rating cursor-pointer transition-colors duration-200 mx-1"
                                                        color={ratingVal <= (hover || rating) ? hoverColor : blockColor}
                                                        size={48}
                                                        onMouseEnter={() => setHover(ratingVal)} onMouseLeave={() => setHover(null)}
                                                    />
                                                </label>
                                                <label className=" block md:hidden">
                                                    <input type="radio" className="radio hidden" name={props.question} value={ratingVal} onClick={() => setRating(ratingVal)} />
                                                    <FaRegSmileBeam
                                                        className="rating cursor-pointer transition-colors duration-200 mx-1"
                                                        color={ratingVal <= (hover || rating) ? hoverColor : blockColor}
                                                        size={27}
                                                        onMouseEnter={() => setHover(ratingVal)} onMouseLeave={() => setHover(null)}
                                                    />
                                                </label>


                                            </>) :
                                            (<>

                                                <label className="hidden md:block">
                                                    <input type="radio" className="radio hidden" name={props.question} value={ratingVal} onClick={() => setRating(ratingVal)} />

                                                    <FaStar
                                                        className="rating cursor-pointer transition-colors duration-200 mx-1"
                                                        color={ratingVal <= (hover || rating) ? hoverColor : blockColor}
                                                        size={48}
                                                        onMouseEnter={() => setHover(ratingVal)} onMouseLeave={() => setHover(null)}
                                                    />
                                                </label>
                                                <label className=" block md:hidden">
                                                    <input type="radio" className="radio hidden" name={props.question} value={ratingVal} onClick={() => setRating(ratingVal)} />
                                                    <FaStar
                                                        className="rating cursor-pointer transition-colors duration-200 mx-1"
                                                        color={ratingVal <= (hover || rating) ? hoverColor : blockColor}
                                                        size={27}
                                                        onMouseEnter={() => setHover(ratingVal)} onMouseLeave={() => setHover(null)}
                                                    />
                                                </label>


                                            </>)}

                                </>


                            )

                        })}
                    </div>
   
                </div>

            </FormControl>
        </Stack>
        </div>
    )
}

export default RatingElement
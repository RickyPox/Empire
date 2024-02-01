import { Button, FormControl, FormLabel, Input, Textarea, FormErrorMessage, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { ChakraProvider } from '@chakra-ui/react'
import {sendContactForm} from "../lib/api"


const initValues = {subject: "DAO Form", twitter: "", discord:"", description: "", }

const initState = {values:initValues}

export default function DaoForm(){

    const toast = useToast()
    const [state, setState] = useState(initState)
    const [touched, setTouched] = useState({})

    const {values, isLoading, error} = state

    const onBlur = ({target}) => setTouched ((prev) => ({...prev,
        [target.name]:true
    }))

    const handleChange = ({target}) => setState((prev) => ({
        ...prev,
        values: {
            ...prev.values,
            [target.name]:target.value,
        },
    }));

    const onSubmit = async () => {
        setState((prev) => ({
            ...prev, 
            isLoading:true
        }));

        try {
            await sendContactForm(values);
            setTouched({});
            setState(initState);
            toast({
                title:"Message sent",
                status:"success",
                duration:2000,
                position:"top",
            })
        } catch (error) {
            setState((prev) => ({
                ...prev, 
                isLoading:false,
                error:error.message,
            }));
        }
    }

    return(
    <div className="w-full max-w-[1920px] px-[20px] lg:px-0">
        <div className="flex flex-col items-center">
            <ChakraProvider >
                {error && (
                    <Text color="red.300">{error}</Text>
                )}
            <div className="flex lg:flex-row flex-col justify-center lg:gap-[11%] gap-[50px] w-1/2 lg:w-full ">
                <div className="flex flex-col xl:w-[22%] ">
                    <div className="flex lg:flex-row flex-col items-center gap-[10px]">
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3693 19L2.62906e-08 2.63065L2.63065 0L19 16.3693L16.3693 19Z" fill="#FDFDFD"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19 2.63065L2.63065 19L0 16.3693L16.3693 5.82733e-07L19 2.63065Z" fill="#FDFDFD"/>
                        </svg>
                            <h3 className="uppercase mt-[5px]">Contact Info</h3>
                    </div>
                    <div className="flex lg:flex-row flex-col gap-[10px] ">
                        <FormControl isInvalid={touched.twitter && !values.twitter}>
                            <Input 
                            className="w-full pl-[20px] bg-transparent lg:text-left text-center" 
                            type="text"
                            name="twitter"
                            value={values.twitter}
                            onChange = {handleChange}
                            onBlur = {onBlur}
                            placeholder="Your twitter contact"/>
                            <FormErrorMessage>Required</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={touched.discord && !values.discord}>
                            <Input 
                            className="w-full pl-[20px] bg-transparent lg:text-left text-center" 
                            type="text"
                            name="discord"
                            value={values.discord}
                            onChange = {handleChange}
                            onBlur = {onBlur}
                            placeholder="Your discord contact"/>
                            <FormErrorMessage>Required</FormErrorMessage>
                        </FormControl>
                    </div>
                </div>
                <div className="lg:w-[22%]">
                    <div className="flex lg:flex-row flex-col items-center gap-[10px]">
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3693 19L2.62906e-08 2.63065L2.63065 0L19 16.3693L16.3693 19Z" fill="#FDFDFD"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19 2.63065L2.63065 19L0 16.3693L16.3693 5.82733e-07L19 2.63065Z" fill="#FDFDFD"/>
                        </svg>
                            <h3 className="uppercase mt-[5px]">description</h3>
                    </div>
                    <FormControl  isInvalid={touched.description && !values.description}>
                    <Textarea 
                        className="w-full pl-[20px] bg-transparent lg:text-left text-center" 
                        name="description"
                        value={values.description}
                        onChange = {handleChange}
                        onBlur = {onBlur}
                        placeholder="A brief information about yourself"
                        rows={5}/>
                        <FormErrorMessage>Required</FormErrorMessage>
                    </FormControl>
                </div>
            </div>
            <div className="flex justify-center w-full">
                <Button
                    isDisabled={!values.twitter || !values.discord || !values.description}
                    onClick={onSubmit}
                    isLoading={isLoading}
                    className=" uppercase flex items-center justify-center mt-[40px] lg:w-[33%] w-full">
                        <h3 className="py-[20px] border-[1px] border-white w-full">Submit</h3>
                </Button>
            </div>
        </ChakraProvider>
    </div>
</div>
    )
}
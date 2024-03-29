import { Button, FormControl, FormLabel, Input, Textarea, FormErrorMessage, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { ChakraProvider } from '@chakra-ui/react'
import {sendContactForm} from "../lib/apiStudio"


const initValues = {subject: "Studio Form", twitter: "", discord:"", request: "", }

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
        <div className="flex flex-col items-center w-full">
            <ChakraProvider >
                {error && (
                    <Text color="red.300">{error}</Text>
                )}
            <div className="flex lg:grid lg:grid-cols-8 flex-col justify-center lg:gap-[20px] gap-[50px] w-1/2 lg:w-full ">
                <div className="flex flex-col lg:col-start-2 lg:col-span-2">
                    <div className="flex lg:flex-row flex-col items-center gap-[10px]">
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3693 19L2.62906e-08 2.63065L2.63065 0L19 16.3693L16.3693 19Z" fill="#FDFDFD"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19 2.63065L2.63065 19L0 16.3693L16.3693 5.82733e-07L19 2.63065Z" fill="#FDFDFD"/>
                        </svg>
                            <h3 className="uppercase mt-[5px]">Contact Info</h3>
                    </div>

                    {/* TWITTER AND DISCORD */}
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
                <div className="lg:col-start-4 col-span-2">
                    <div className="flex lg:flex-row flex-col items-center gap-[10px]">
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3693 19L2.62906e-08 2.63065L2.63065 0L19 16.3693L16.3693 19Z" fill="#FDFDFD"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19 2.63065L2.63065 19L0 16.3693L16.3693 5.82733e-07L19 2.63065Z" fill="#FDFDFD"/>
                        </svg>
                            <h3 className="uppercase mt-[5px]">Deadline</h3>
                    </div>
                    <FormControl  isInvalid={touched.deadline && !values.deadline}>
                    <Input
                        className="w-full pl-[20px] bg-transparent lg:text-left text-center" 
                        type="date"
                        name="deadline"
                        value={values.deadline}
                        onChange = {handleChange}
                        onBlur = {onBlur}
                        placeholder="Your deadline"
                        />
                        <FormErrorMessage>Required</FormErrorMessage>
                    </FormControl>
                </div>
                <div className="lg:col-start-6 col-span-2">
                    <div className="flex lg:flex-row flex-col items-center gap-[10px]">
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3693 19L2.62906e-08 2.63065L2.63065 0L19 16.3693L16.3693 19Z" fill="#FDFDFD"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19 2.63065L2.63065 19L0 16.3693L16.3693 5.82733e-07L19 2.63065Z" fill="#FDFDFD"/>
                        </svg>
                            <h3 className="uppercase mt-[5px]">Art Request</h3>
                    </div>
                    <FormControl  isInvalid={touched.request && !values.request}>
                    <Textarea 
                        className="w-full pl-[20px] bg-transparent lg:text-left text-center" 
                        name="request"
                        value={values.request}
                        onChange = {handleChange}
                        onBlur = {onBlur}
                        placeholder="Your Art Request Description"
                        rows={5}/>
                        <FormErrorMessage>Required</FormErrorMessage>
                    </FormControl>
                </div>
            </div>
            <div className="flex justify-center w-full lg:grid lg:grid-cols-9 ">
                <Button
                    isDisabled={!values.twitter || !values.discord || !values.request || !values.deadline}
                    onClick={onSubmit}
                    isLoading={isLoading}
                    className="uppercase mt-[40px] lg:mb-[60px] lg:col-span-5 lg:col-start-3 w-full ">
                        <h3 className="w-full py-[20px] border-[1px] border-white">Submit</h3>
                </Button>
            </div>
        </ChakraProvider>
    </div>
</div>
    )
}
"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { ToastAction } from "@/components/ui/toast"
import { useToast } from './ui/use-toast'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import useStore from '@/app/store'

const Languege = () => {
    const [memorizedLanguage, setMemorizedLanguage] = useState("")
    const languages = useStore(state => state.languages)
    const { toast } = useToast()
    const setLanguage = useStore(state => state.setLanguage)
    const language = useStore(state => state.selectedLanguage)

    const handleUndo = () => {
      
      if(language==="English"){
        setLanguage("Sesotho")
      }
      else if(language==="Sesotho"){
        setLanguage("English")
      }
    }

    const changeLanguage = (newLanguage: string) => {
        toast({
            title: "Language",
            description: `Language changed to: ${newLanguage}`,
            action: (
                <ToastAction onClick={handleUndo} altText="Go to schedule to undo">Undo</ToastAction>
            )
        });
        setLanguage(newLanguage);
        setMemorizedLanguage(language);
    };

    return (
        <div className='w-full flex justify-end py-5'>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>{language}</AccordionTrigger>
                    <AccordionContent>
                        <div>
                            {languages.map((language) => (
                                <Button
                                    key={language}
                                    variant="ghost"
                                    onClick={() => changeLanguage(language)}
                                >
                                    {language}
                                </Button>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default Languege

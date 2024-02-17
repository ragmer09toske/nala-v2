"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Languege from './Languege'
import { useToast } from './ui/use-toast'
import { ToastAction } from './ui/toast'
import { TicketIcon } from 'lucide-react'
import useStore from '@/app/store'

export const Payment = () => {
  const { toast } = useToast()
  const [languageLocal, setlaguageLocally] = useState("")
  const Mpesa_names = useStore(state => state.Mpesa_names)
  const Mpesa_number = useStore(state => state.Mpesa_number)
  const language = useStore(state => state.selectedLanguage)
  const  [title, setTitle] = useState("")

  useEffect(()=>{
    
    
  },[language])

  return (
    <div className="p-5 flex flex-col items-center gap-4">
        <div>
            <Languege />
            <Card className="flex p-5 flex-col items-center">
                <CardContent>
                    {/* <form> */}
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                        <label htmlFor="name">{language==="English" ? Mpesa_names.English : Mpesa_names.Sesotho}</label>
                        <Input id="name" placeholder={language === "English" ? Mpesa_names.Mpesa_names_english_placeholder : Mpesa_names.Mpesa_names_sesotho_placeholder} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                        <label htmlFor="name">{language==="English" ? Mpesa_number.English : Mpesa_number.Sesotho}</label>
                        <Input id="name" type="number" placeholder={language === "English" ? Mpesa_number.Mpesa_numbers_english_placeholder : Mpesa_number.Mpesa_numbers_sesotho_placeholder} />
                        </div>
                        <Button 
                        variant="outline"
                        onClick={()=>{
                            toast({
                                description: `Paid successfully ✅`,
                            })
                        }}
                        >
                            {language === "English" ? "Pay" : "Patala"}
                        </Button>
                    </div>
                    {/* </form> */}
                </CardContent>
            </Card>
        </div>
    </div>
  )
}

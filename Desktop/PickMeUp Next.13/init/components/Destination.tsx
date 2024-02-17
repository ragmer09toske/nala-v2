"use client"
import useStore from '@/app/store'
import Languege from '@/components/Languege'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React from 'react'

const Destination = () => {
  const drop_off = useStore(state => state.drop_off)
  const pick_up = useStore(state => state.pick_up)
  const language = useStore(state => state.selectedLanguage)

  return (
    <div className="p-5 flex flex-col items-center gap-4">
        <div>
            <Languege />
            <Card className="flex p-5 flex-col items-center">
                <CardContent>
                    <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                        <label htmlFor="name">{language==="English" ? pick_up.English : pick_up.Sesotho}</label>
                        <Input id="name" placeholder={language === "English" ? drop_off.English_placeholder : drop_off.Sesotho_placeholder} />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                        <label htmlFor="name">{language==="English" ? drop_off.English : drop_off.Sesotho}</label>
                        <Input id="name" placeholder={language === "English" ? drop_off.English_placeholder : drop_off.Sesotho_placeholder} />
                        </div>
                        <Link href="/payment" className='w-full'>
                        <Button
                            variant="outline"
                            className='w-full'
                        >
                            {language==="English" ? "Pay" : "Patala"}
                            </Button>
                        </Link>
                    </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}

export default Destination
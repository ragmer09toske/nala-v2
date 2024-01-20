import { Adjust, Apps, BlindsClosed, HourglassBottom, MoreVert, Public, Rocket } from '@mui/icons-material'
import { Box, Card } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FiGitPullRequest } from 'react-icons/fi'
import { DMs } from './DMs'
import { Schedules } from './Schedules'
import { Issues } from './Issues'

export const ActivityBar = ({setView}) => {
    let [ActivityState, setActivity] = useState("Linear");
    let [ActivitySateButton, setActivityButton] = useState(false)
    
    const handleActivityType_Linear = () => {
        setActivity("Linear")
        localStorage.setItem("ActivityState", "Linear")
        setActivityButton(!ActivitySateButton)   
    }

    const handleActivityType_Tiles = () => {
        setActivity("Tiles")
        localStorage.setItem("ActivityState", "Tiles")
        setActivityButton(!ActivitySateButton) 
    }

    const  handleDMs = () => {
        setView(
            <DMs />
        )
    }
    const handleTodo = () => {
        setView(
          <Issues />
        )
    }
    const handleSchedules = () => {
        setView(<Schedules />)
    }
    useEffect (()=> {
        const savedActivity = localStorage.getItem("ActivityState")
        if(savedActivity){
            setActivity(savedActivity)
        }
        else {
            setActivity("Linear")
        }
    },[ActivitySateButton, ActivityState])

    //   localStorage.clear();
    switch (ActivityState) {
      case 'Linear':
        ActivityState = <Card sx={{
            p:2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <Box sx={{
                display: "flex",
                gap: 3
            }}>
                <Public onClick={handleDMs} />
                <Rocket onClick={handleSchedules}/>
                <Adjust onClick={handleTodo}/>
            </Box>
            <Box>
              {ActivitySateButton ? 
              (<Apps onClick={handleActivityType_Tiles}/>) : 
              
              (<MoreVert onClick={handleActivityType_Linear}/>)
            }
            </Box>
          </Card>;
        break;
      case 'Tiles':
        ActivityState = <Card sx={{
            p:2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <Box sx={{
                display: "flex",
                gap: 3,
                flexDirection: "column"
            }}>
                <FiGitPullRequest onClick={handleDMs} />
                <HourglassBottom  onClick={handleSchedules}/>
                <BlindsClosed onClick={handleTodo}/>
            </Box>
            <Box>
              {ActivitySateButton ? 
              (<Apps onClick={handleActivityType_Tiles}/>) : 
              
              (<MoreVert onClick={handleActivityType_Linear}/>)
            }
            </Box>
          </Card>;
        break;
      case 'error':
        ActivityState = <div style={{ color: 'red' }}>Error! There was a problem with your request.</div>;
        break;
      default:
        ActivityState = <div>Status unknown.</div>;
    }
  return (
    <Box sx={{
        p:4
      }}>
        { ActivityState }
      </Box>
  )
}

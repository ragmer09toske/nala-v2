import { Box, Skeleton } from '@mui/material'
import React from 'react'

export const NuSkeleton = () => {
  return (
    <Box
        sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
        }}
        className="card-join"
    >
        <Skeleton
            sx={{
            width: 90,
            height: 150,
            borderRadius: "50%",
            background:
                "radial-gradient(circle, lightgray 50%, rgb(225,225,225) 100%)",
            }}
        ></Skeleton>
        <Box
            sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            }}
        >
            <Skeleton
            sx={{
                width: 160,
                height: 40,
                background:
                "linear-gradient(to right, rgb(245, 245, 245), lightgray)",
                backgroundColor: "lightgray",
                borderRadius: 4.6,
            }}
            ></Skeleton>
            <Skeleton
            sx={{
                width: 120,
                height: 40,
                background:
                "linear-gradient(to right, rgb(245, 245, 245), lightgray)",
                borderRadius: 4.7,
            }} 
            ></Skeleton>
            <Skeleton
            sx={{
                width: 230,
                height: 40,
                background:
                "linear-gradient(to right, rgb(245, 245, 245), lightgray)",
                borderRadius: 4.6,
            }} 
            ></Skeleton>
        </Box>
    </Box>
  )
}

import { Box, Skeleton } from "@mui/material"

export const ContentSkeleton = () => {
  return (
    <Box sx={{
        pl: 2,
        pr: 2,
        pb: 2,
        display: "flex",
        flexDirection: "column",
        gap:1,
      }}>
        <Skeleton sx={{}} />
        <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Skeleton sx={{width: "35%"}} />
            <Skeleton sx={{width: "35%"}} />
        </Box>
        <Skeleton sx={{}} />
    </Box>
  )
}

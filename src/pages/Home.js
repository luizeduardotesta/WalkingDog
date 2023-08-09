import React from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Box, Container, Grid } from "@mui/material"

function Home() {
    return (
        <div>
            <Box sx={{ bgColor: "#fafafa", minHeigth: "100vh" }}>
                <Navbar />
                <Container sx={{ pt: 5, pb: 5, minHeigth: "83vh" }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Grid item xs={2} sm={4} md={4} key={index} >

                            </Grid>
                        </Grid>
                    </Box>
                </Container>
                <Footer />
            </Box>
        </div>
    )
}

export default Home
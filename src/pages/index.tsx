import { useAuthentication } from "@/hooks/server";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import BedtimeRoundedIcon from "@mui/icons-material/BedtimeRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import CoffeeRoundedIcon from "@mui/icons-material/CoffeeRounded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FilterDramaOutlinedIcon from "@mui/icons-material/FilterDramaOutlined";
import LoginIcon from "@mui/icons-material/Login";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
const Icons = () => {
    return (
        <>
            <Grid item>
                <FavoriteBorderOutlinedIcon sx={{ color: "#415a83" }} />
            </Grid>
            <Grid item>
                <FilterDramaOutlinedIcon />
            </Grid>
            <Grid item>
                <PaletteOutlinedIcon />
            </Grid>
            <Grid item>
                <AccountBalanceRoundedIcon sx={{ color: "#3541af" }} />
            </Grid>
            <Grid item>
                <BedtimeRoundedIcon />
            </Grid>
            <Grid item>
                <CoffeeRoundedIcon sx={{ color: "#3541af" }} />
            </Grid>
            <Grid item>
                <ChatBubbleOutlineRoundedIcon />
            </Grid>
        </>
    );
};
const IconBackground = () => {
    return (
        <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{
                position: "absolute",
                left: "12vw",
                top: "20vh",
                zIndex: 0,
                color: "#001133",
            }}
        >
            {[...Array(16)].map((index) => (
                <Icons />
            ))}
        </Grid>
    );
};
const Home = () => {
    const { login } = useAuthentication();
    const [isLogin, setIsLogin] = useState(true);

    return (
        <Stack
            direction="row"
            sx={{ bgcolor: "#0b317a", width: "100vw", height: "100vh" }}
        >
            <Box sx={{ width: "80vw", position: "relative" }}>
                <Box>
                    <Box
                        sx={{
                            letterSpacing: 4,
                            position: "absolute",
                            top: "32vh",
                            left: "27vw",
                            zIndex: 100,
                            pt: 0.2,
                            pb: 0.8,
                            px: 2,
                            borderRadius: "9px",
                            backgroundColor: "#0b317a",
                            color: "white",
                        }}
                    >
                        <Typography variant="h2"> Welcome</Typography>
                        <Typography variant="h3" ml={18}>
                            to
                        </Typography>
                        <Typography variant="h2" ml={14}>
                            議事Log
                        </Typography>
                    </Box>
                </Box>
                <IconBackground />
            </Box>
            <Box
                sx={{
                    p: 1,
                    m: 1,
                    position: "relative",
                    borderRadius: 1,
                    width: "50vw",
                }}
            >
                <Button
                    onClick={() => login()}
                    variant="contained"
                    size="large"
                    endIcon={<LoginIcon />}
                    sx={{
                        borderRadius: "16px",
                        mr: 1,
                        position: "absolute",
                        top: "55vh",
                        right: "12vw",
                    }}
                >
                    <Typography variant="h5" py={0.5}>
                        ログイン
                    </Typography>
                </Button>
            </Box>
        </Stack>
    );
};
export default Home;

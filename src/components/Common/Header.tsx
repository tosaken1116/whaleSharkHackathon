import MenuIcon from "@mui/icons-material/Menu";
import {
    AppBar,
    Box,
    Button,
    CssBaseline,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { useState } from "react";
import SideBar from "./SideBar";
import { useAuthentication } from "@/hooks/server";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    isOpen?: boolean;
}

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const { login } = useAuthentication();
    const [isLogin, setIsLogin] = useState(true);

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="static"
                sx={{
                    width: isOpen ? `calc(100% - ${drawerWidth}px)` : "100vw",
                    marginLeft: isOpen ? `${drawerWidth}px` : "",
                }}
            >
                <Toolbar variant="dense">
                    <IconButton
                        color="inherit"
                        aria-label="isOpen drawer"
                        onClick={() => setIsOpen(!isOpen)}
                        edge="start"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" p={1}>
                        <Box textAlign="left">議事Log</Box>
                    </Typography>
                    <Box style={{ flexGrow: 1 }}></Box>
                    {isLogin ? (
                        <Button color="inherit" onClick={() => login()}>
                            ログイン
                        </Button>
                    ) : (
                        "MailAddress"
                    )}
                </Toolbar>
            </AppBar>
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        </Box>
    );

    <></>;
}

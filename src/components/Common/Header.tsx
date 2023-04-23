import { useAuthentication } from "@/hooks/server";
import { userAtom } from "@/state/userAtom";
import MenuIcon from "@mui/icons-material/Menu";
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { MeetingUser } from "../Meeting/MeetingUsers";
import HamburgerMenu from "./HamburgerMenu";
import SideBar from "./SideBar";

const drawerWidth = 240;

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
    const { login } = useAuthentication();
    const { userId, isLogin, iconPath, userName } = useRecoilValue(userAtom);

    return (
        <Box sx={{ display: "flex", height: "8vh" }}>
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
                    {!isLogin ? (
                        <Button color="inherit" onClick={() => login(true)}>
                            ログイン
                        </Button>
                    ) : (
                        <Button
                            onClick={() =>
                                setIsHamburgerMenuOpen(!isHamburgerMenuOpen)
                            }
                        >
                            <MeetingUser {...{ iconPath, userName }} />
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
            <HamburgerMenu
                isOpen={isHamburgerMenuOpen}
                setIsOpen={setIsHamburgerMenuOpen}
            />
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        </Box>
    );

    <></>;
}

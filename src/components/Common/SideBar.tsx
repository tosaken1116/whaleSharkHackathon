import React from "react";
import Link from "next/link";
import {
    Drawer,
    useTheme,
    List,
    Divider,
    IconButton,
    Stack,
    Box,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import HomeIcon from "@mui/icons-material/Home";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import { sidebarProps } from "@/types";

const drawerWidth = 240;

export default function SideBar({ isOpen, setIsOpen }: sidebarProps) {
    const theme = useTheme();

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                },
            }}
            variant="persistent"
            anchor="left"
            open={isOpen}
        >
            <Stack direction="row">
                <Box flexGrow={1} />
                <Box>
                    <IconButton onClick={() => setIsOpen(!isOpen)}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Box>
            </Stack>
            <Divider />
            <List>
                <Link href="/Home">
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="ホーム" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link href="/MeetingLog">
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <TextSnippetIcon />
                            </ListItemIcon>
                            <ListItemText primary="議事録" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link href="/Comunity">
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <RecentActorsIcon />
                            </ListItemIcon>
                            <ListItemText primary="コミュニティ" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link href="/MyPage">
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary="マイページ" />
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>
        </Drawer>
    );
}

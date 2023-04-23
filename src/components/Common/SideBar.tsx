import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
} from "@mui/material";
import Link from "next/link";

import { sidebarProps } from "@/types";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

const drawerWidth = 240;

export default function SideBar({ isOpen, setIsOpen }: sidebarProps) {
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

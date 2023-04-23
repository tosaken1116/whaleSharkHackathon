import { useAuthentication } from "@/hooks/server";
import { sidebarProps } from "@/types";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { ChangeUserNameForm } from "./ChangeUserNameForm";

export default function HamburgerMenu({ isOpen, setIsOpen }: sidebarProps) {
    const { logout } = useAuthentication();
    return (
        <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
            <List>
                <ListItem>
                    <ChangeUserNameForm />
                </ListItem>
                <ListItem>
                    <Button
                        onClick={() => {
                            setIsOpen(false);
                            logout();
                        }}
                        startIcon={<LogoutIcon />}
                    >
                        <ListItemText>logout</ListItemText>
                    </Button>
                </ListItem>
            </List>
        </Drawer>
    );
}

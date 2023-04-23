import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
export default function LeaveRoom() {
    return (
        <Button href="/meeting" startIcon={<LogoutIcon />}>
            部屋を退出する
        </Button>
    );
}

import { MeetingLog } from "@/generates/graphql";
import { sidebarProps } from "@/types";
import { Box, Modal } from "@mui/material";
import { useQRCode } from "next-qrcode";

export default function QRCodeGenerator({
    id: meetingId,
    isOpen,
    setIsOpen,
}: Pick<MeetingLog, "id"> & sidebarProps) {
    const { Canvas } = useQRCode();
    const protocol =
        typeof window !== "undefined" ? window.location.protocol : "http:";

    const domainName =
        typeof window !== "undefined" ? window.location.host : "";

    return (
        <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box sx={{ zIndex: 1000 }}>
                <Canvas
                    text={`${protocol}//${domainName}/invitation?meetingId=${meetingId}`}
                    options={{
                        level: "M",
                        margin: 3,
                        scale: 4,
                        width: 400,
                        color: {
                            dark: "#000000",
                            light: "#ffffff",
                        },
                    }}
                />
            </Box>
        </Modal>
    );
}

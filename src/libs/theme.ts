import { createTheme } from "@mui/material";

export const createMuiTheme = () =>
    createTheme({
        palette: {
            primary: {
                main: "#a1c9f9",
                dark: "#62d8ed",
            },
            secondary: {
                main: "#0b317a",
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: "none",
                        "::before": {
                            content: `""`,
                            position: "absolute",
                            left: "0%",
                            bottom: "2px",
                            width: "0",
                            borderBottom: "solid 2px #4169e1",
                            transform: "translateX(-0%)",
                            transition: "0.3s",
                        },

                        ":hover::before": {
                            width: "100%",
                        },
                    },
                },
            },
        },
    });

import { MarkdownProps } from "@/types";
import { Button } from "@mui/material";
import { saveAs } from "file-saver";

export default function SaveFile({ rawText, title }: MarkdownProps) {
    const downloadFile = () => {
        const blob = new Blob([rawText], {
            type: "text/markdown;charset=utf-8",
        });
        saveAs(blob, `${title}.md`);
    };
    return <Button onClick={downloadFile}>Download</Button>;
}

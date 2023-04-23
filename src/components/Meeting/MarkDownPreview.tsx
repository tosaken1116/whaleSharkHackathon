import { MarkdownProps } from "@/types";
import { Box } from "@mui/material";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import SaveFile from "./SaveFile";

export default function MarkDownPreview({ rawText, title }: MarkdownProps) {
    return (
        <Box>
            <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]}>
                {rawText}
            </ReactMarkdown>
            <SaveFile rawText={rawText} title={title} />
        </Box>
    );
}

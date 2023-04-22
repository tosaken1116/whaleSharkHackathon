import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkDownPreview({ rawText }: { rawText: string }) {
    return (
        <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]}>
            {rawText}
        </ReactMarkdown>
    );
}

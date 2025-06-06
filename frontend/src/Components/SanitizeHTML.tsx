import DOMPurify from "dompurify";
import parse from "html-react-parser";
import type {SanitizeHtmlProps} from "../Types/SanitizeHtmlProps";

export default function SanitizeHTML({html} : SanitizeHtmlProps) {
    const rawHtml = html.replaceAll("\\n", "<br>")
    const sanitizedHtml = DOMPurify.sanitize(rawHtml);
    const output = parse(sanitizedHtml);

    return (
        <div
            className="prose"
        >
            {output}
        </div>
    )
}
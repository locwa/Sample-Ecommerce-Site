import DOMPurify from "dompurify";
import type {SanitizeHtmlProps} from "../Types/SanitizeHtmlProps";

export default function SanitizeHTML({html} : SanitizeHtmlProps) {
    const rawHtml = html.replaceAll("\\n", "<br>")
    const sanitizedHtml = DOMPurify.sanitize(rawHtml);

    return (
        <div
            className="prose"
            dangerouslySetInnerHTML={{__html: sanitizedHtml}}
        />
    )

}
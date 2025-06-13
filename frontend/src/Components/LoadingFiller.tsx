import {LoadingSpinner} from "../Logos.tsx";
export function LoadingFiller() {
    return (
        <div className="h-[70vh] flex flex-col justify-center">
            <div className="flex flex-col items-center gap-y-5">
                <LoadingSpinner />
                <p>Loading</p>
            </div>
        </div>
    )
}
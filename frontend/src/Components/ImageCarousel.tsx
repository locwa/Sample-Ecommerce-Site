import {LeftCaret, RightCaret} from "../Logos.tsx";
import {useState} from "react";

export default function ImageCarousel({gallery} : {gallery? : string[]}) {
    const [imageCount, setImageCount] = useState<number>(0);
    const imageItems = gallery ? gallery.length - 1 : 0;

    return (
        <div className="h-[65vh] w-11/12 flex gap-10 grow-2 ">
            <div className="overflow-y-scroll scrollbar-hidden">
                {gallery && gallery.map((image, index) => (
                    <img src={image} alt="photo" className="h-28 w-28 mb-4 object-cover hover:cursor-pointer" onClick={() => setImageCount(index)}/>
                ))}
            </div>
            <div className="relative">
                <img src={gallery?.[imageCount]} alt="image" className="h-[35rem] w-[50rem] object-scale-down"/>
                <div className="absolute top-70 left-0 flex justify-between w-full">
                    <button
                        className="flex justify-center items-center w-9 h-7 bg-[#4f4f4f] text-lg hover:cursor-pointer"
                        onClick={() => imageCount > 0 ? setImageCount(imageCount - 1) : setImageCount(imageItems)}
                    >
                        <LeftCaret />
                    </button>
                    <button
                        className="flex justify-center items-center w-9 h-7 bg-[#4f4f4f] text-lg hover:cursor-pointer"
                        onClick={() => imageCount < imageItems ? setImageCount(imageCount + 1) : setImageCount(0)}
                    >
                        <RightCaret />
                    </button>
                </div>

            </div>
        </div>
    )
}
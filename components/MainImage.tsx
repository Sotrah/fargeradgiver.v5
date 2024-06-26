// MainImage displays the main image and includes a loading indicator

import { ColorType } from './ColorType';
import {ScaleLoader} from "react-spinners"; // A loading spinner
import React, {useState} from "react";
import {useSpinDelay} from "spin-delay"; // This controls when the loading spinner is shown to avoid flickering
import CldImage from "../components/CldImage";

const MainImage: React.FC<{
    selectedColor: ColorType | null,
    selectedImage: String | null,
    loading: boolean,
    setLoading: (loading: boolean) => void,
    recolorOption: string,
    formattedHex: string | null
} > = ({ selectedColor, selectedImage, loading = false, setLoading, recolorOption, formattedHex }) => {

    const showSpinner = useSpinDelay(loading, { delay: 125, minDuration: 500 });


    return (
        <div className='w-full h-full'>
           
            {/* The below section is dimmed until the image is loaded */}
            <div className={`w-full h-full relative`}>
                <div className="w-full h-full absolute flex items-center justify-center z-30 pointer-events-none">
                    <ScaleLoader
                        color="#000000"
                        speedMultiplier={0.5}
                        loading={showSpinner}
                        aria-label="Loading"
                    />
                    <div role="status" className="sr-only">
                        {showSpinner ? "Laster..." : "Ferdig!"}
                    </div>
                </div>
                {/* CldImage is documented here: https://next.cloudinary.dev/cldimage/configuration
                If there is an image and a selectedColor, transform it with Recolor */}
                {selectedImage && selectedColor && (
                    <div className={`absolute top-0 left-0 w-full h-full flex justify-center items-center z-20 rounded ${showSpinner ? "opacity-0" : ""} `}>
                        <CldImage
                            placeholder="empty"
                            onLoad={() => setLoading(false)}
                            width='600'
                            height='400'
                            src={selectedImage}
                            alt="Det valgte bildet, endret"
                            title="Det valgte bilde, endret"
                            sizes="100vw"
                            className="rounded"
                            recolor={[`${recolorOption}`, formattedHex]}
                        />
                    </div>
                )}
                {/* Always show the original image underneath the edited one */}
                {selectedImage &&(
                    <div className={`${showSpinner ? "opacity-50" : ""} absolute top-0 left-0 w-full h-full flex justify-center items-center z-10 rounded `}>
                        <CldImage
                            placeholder="empty"
                            onLoad={() =>
                            {if (!selectedColor) {
                                setLoading(false)}
                            }
                            }
                            width='600'
                            height='400'
                            src={selectedImage}
                            alt="Det valgte bildet, uendret"
                            title="Det valgte bildet, uendret"
                            sizes="100vw"
                            className="rounded"
                        />
                    </div>
                )}
                {/* If no image is selected, show help text to user */}
                <div className="flex justify-center items-center z-0 bg-gray-300 rounded aspect-[4/3]">
                    {!selectedImage &&(
                        <div>
                            <span className="desktop-text">
                                Velg et bilde til venstre eller&nbsp;
                                <button className="underline" 
                                onClick={() => document.getElementById('uploadButton')?.click()}>
                                    last opp ditt eget
                                </button>
                            </span>
                            <span className="mobile-text">Velg et bilde over eller&nbsp;
                                <button className="underline" 
                                onClick={() => document.getElementById('uploadButton')?.click()}>
                                    last opp ditt eget
                                </button>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MainImage;
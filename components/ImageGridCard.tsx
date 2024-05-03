// ImageGridCard presents a grid display of all available images

'use client';
import CldImage from "./CldImage";
import React, { useState, useRef, useEffect } from 'react';
import UploadButton from "../components/UploadButton";

const ImageGridCard: React.FC<{
    selectedImage: String | null,
    onImageSelect: (image: String | null) => void
    } > = ({ selectedImage, onImageSelect }) => {
    const [selectedGridIndex, setSelectedGridIndex] = useState<number | null>(null);

    const popupRef = useRef<HTMLDivElement>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setShowPopup(false);
            }
        };

        if (showPopup) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showPopup]); // Avhengighet til showPopup slik at effekten kjører når tilstanden endres

    const [images, setImages] = useState<string[]>([
        'https://res.cloudinary.com/dv4ydb3qf/image/upload/v1713522064/jycc1koodetkfjvdcoky_cnhibb-600px_height_oyw2kz.jpg',
        'https://res.cloudinary.com/dv4ydb3qf/image/upload/v1713522063/qrkelyfikaa03biiaedn_od2u99-600px_height_qhbttx.jpg',
        'https://res.cloudinary.com/dv4ydb3qf/image/upload/v1713522072/aufzdixrvc5apdvpbkbj_chmtzg-600px_height_gpgnpl.png',
        'https://res.cloudinary.com/dv4ydb3qf/image/upload/v1713522070/dc3x1mvacxdq8qc7kk80_mxzxpo-600px_height_k8i9p1.jpg',
        'https://res.cloudinary.com/dv4ydb3qf/image/upload/v1713522067/aegvqdxc0i1hbsuksdcp_cmm97v-600px_height_zzwzas.png'
    ]);

    const handleImageClick = (clickedIndex: number): void => {
        if (clickedIndex === selectedGridIndex) {
            setSelectedGridIndex(null);
            onImageSelect(null);
        }
        else {
            setSelectedGridIndex(clickedIndex);
            console.log("Selected image: " + images[clickedIndex]);
            onImageSelect(images[clickedIndex]);
            const element = document.getElementById("middle-column");
            if (element) {
                element.scrollIntoView();
            }
        }
    };

    const handleUploadSuccess = (result: string): void => {
        // Always push new uploaded images to the front of the list
        const updatedImages = images
        updatedImages.unshift(result);
        setImages(updatedImages);
        console.log(result);
        handleImageClick(0);
    };

    return (
        <div className="lg:h-full flex flex-col justify-between gap-2">
            <div className="flex justify-end items-center gap-2">
                <span className="mr-auto self-start text-md font-bold min-width-24">Velg bilde</span>
                <div className="flex items-center">
                    <UploadButton onUploadSuccess={handleUploadSuccess}/>
                    <div className="w-1"></div>
                    <button 
                    className="cursor-pointer" 
                    onClick={() => setShowPopup(!showPopup)}
                    title="Tips til å ta gode bilder"
                    >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                            <path
                                d="M14.9849 7.9C15.6249 8.62 15.9249 9.59999 15.7849 10.64C15.5449 12.56 14.1449 13.24 12.9049 13.24C12.8449 13.24 12.8049 13.24 12.8049 13.24V13.72C12.8049 14.16 12.4449 14.52 12.0049 14.52C11.5649 14.52 11.2049 14.16 11.2049 13.72V13.08C11.2049 12.42 11.4849 11.64 12.9049 11.64C13.6849 11.64 14.0849 11.24 14.1849 10.44C14.2249 10.18 14.2449 9.48001 13.7649 8.96001C13.3849 8.54001 12.7649 8.31999 11.9249 8.31999C10.1249 8.31999 10.0649 9.49999 10.0649 9.62C10.0649 10.06 9.70494 10.42 9.26494 10.42C8.82494 10.42 8.46494 10.06 8.46494 9.62C8.46494 8.81999 9.08493 6.71999 11.9249 6.71999C13.5849 6.71999 14.5049 7.36 14.9849 7.9ZM11.9449 15.2C11.6849 15.2 11.4249 15.3 11.2449 15.5C11.0649 15.68 10.9449 15.94 10.9449 16.2C10.9449 16.46 11.0449 16.72 11.2449 16.9C11.4249 17.08 11.6849 17.2 11.9449 17.2C12.2049 17.2 12.4649 17.1 12.6449 16.9C12.8249 16.72 12.9449 16.46 12.9449 16.2C12.9449 15.94 12.8449 15.68 12.6449 15.5C12.4849 15.32 12.2249 15.2 11.9449 15.2ZM21.2049 12C21.2049 17.08 17.0849 21.2 12.0049 21.2C6.92493 21.2 2.80493 17.08 2.80493 12C2.80493 6.92 6.92493 2.8 12.0049 2.8C17.0849 2.8 21.2049 6.92 21.2049 12ZM19.6049 12C19.6049 7.8 16.2049 4.4 12.0049 4.4C7.80493 4.4 4.40493 7.8 4.40493 12C4.40493 16.2 7.80493 19.6 12.0049 19.6C16.2049 19.6 19.6049 16.2 19.6049 12Z"
                                fill="gray">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>

                {showPopup && (
                    <div
                        ref={popupRef}
                        className="popup absolute bg-white p-4 border rounded shadow-lg z-50"
                        style={{zIndex: 1000}}
                    >
                    <div className="flex justify-end">
                        <button onClick={() => setShowPopup(false)} className="text-lg absolute">×</button>
                    </div>
                    <p className="pb-2">Tips til å ta gode bilder:</p>
                    <ul className="list-disc list-inside pb-2">
                        <li>Liggende format</li>
                        <li>Mye naturlig lys</li>
                        <li>Minst mulig rot foran veggflaten</li>
                    </ul>
                    <p>Se på demobildene for inspirasjon</p>
                </div>
            )}

            <div className="flex-auto grid auto-rows-max lg:grid-cols-1 grid-cols-3 gap-2 relative overflow-y-auto">
                {images.map((src, index) => (
                    <button
                        key={index}
                        className={`rounded flex aspect-[4/3] items-center overflow-hidden relative border-[3px] ${selectedGridIndex === index ? 'border-gray-600' : 'hover:border-gray-400 border-transparent'}`}
                        onClick={() => handleImageClick(index)}
                    >
                        <CldImage
                            width={400}
                            height={300}
                            src={src}
                            alt={`Bilde nummer ${index + 1}. Velg et bilde for å redigere det.`}
                            title={`Bilde nummer ${index + 1}. Velg et bilde for å redigere det.`}
                            layout="responsive"
                            objectFit="cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ImageGridCard;
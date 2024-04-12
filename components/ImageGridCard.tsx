'use client';
import CloudinaryWrapper from "./CldImage";
import React, { useState } from 'react';
import UploadButton from "../components/UploadButton";

const ImageGridCard: React.FC<{
    selectedImage: String | null,
    onImageSelect: (image: String | null) => void
    } > = ({ selectedImage, onImageSelect }) => {
    const [selectedGridIndex, setSelectedGridIndex] = useState<number | null>(null);
    const maxImageLength = 9;
    const initialUploadImageSlot = 5; // The first index to upload an image to
    let uploadImageSlot = initialUploadImageSlot; // The current index to upload an image to

    const [images, setImages] = useState<string[]>([
        'https://res.cloudinary.com/dv4ydb3qf/image/upload/v1712314352/qrkelyfikaa03biiaedn_od2u99.jpg',
        'https://res.cloudinary.com/dv4ydb3qf/image/upload/v1712314351/dc3x1mvacxdq8qc7kk80_mxzxpo.jpg',
        'https://res.cloudinary.com/dv4ydb3qf/image/upload/v1712314351/jycc1koodetkfjvdcoky_cnhibb.jpg',
        'https://res.cloudinary.com/dv4ydb3qf/image/upload/v1712314351/aufzdixrvc5apdvpbkbj_chmtzg.png',
        'https://res.cloudinary.com/dv4ydb3qf/image/upload/v1712314351/aegvqdxc0i1hbsuksdcp_cmm97v.png'
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
        }

    };

    // Function to handle the state update in the parent component
    const handleUploadSuccess = (result: string): void => {
        
        // This loops which slot to upload the next image to between the initial value and the max
        const updatedImages = images
        updatedImages[uploadImageSlot] = result; // Add the uploaded photo to the images array at the current upload slot
        setImages(updatedImages);
        console.log(result);
        handleImageClick(uploadImageSlot); // "click" (select) the uploaded image
        uploadImageSlot += 1;
        if (uploadImageSlot >= maxImageLength) {
            console.log("Resetting upload slot to " + initialUploadImageSlot);
            uploadImageSlot = initialUploadImageSlot;
        }
        console.log("Next upload slot: " + uploadImageSlot);
    };

    return (
        <div className="lg:h-full flex flex-col justify-between gap-2">
            <div className="flex-none grid lg:grid-cols-2 grid-cols-3 gap-2 relative">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className={` rounded-lg flex items-center overflow-hidden relative border-2 ${selectedGridIndex === index ? 'border-black' : 'border-transparent'}  hover:border-gray-500`}
                        onClick={() => handleImageClick(index)}
                    >
                        <CloudinaryWrapper
                            width={400}
                            height={300}
                            src={src}
                            alt={`Image ${index + 1}`}
                            layout="responsive"
                            objectFit="cover"
                        />
                    </div>
                ))}
                {images.length < maxImageLength && (
                    <div className="w-full rounded-lg border-dashed border-2 border-gray-400 flex items-center justify-center">
                        <p></p>
                    </div>
                )} 
            </div>
            <div
                className={`rounded-lg flex-initial`}
                style={{ height: '5.25em' }}
                >
                    <UploadButton onUploadSuccess={handleUploadSuccess} />
            </div>
        </div>    
    );
}

export default ImageGridCard;
// GetUrlColor retrieves a hex-code from the URL parameters

import React, {useEffect, useState, Suspense} from "react";
import { useSearchParams } from "next/navigation"
import { ColorType } from "@/components/ColorType";

const GetUrlColor: React.FC<{
    selectedColor: ColorType | null,
    colorsAreLoaded: boolean,
    onColorSelect: (color: ColorType | null) => void,
    handleColorSelect: (color: ColorType | null) => void,
    colors: ColorType[] } > = ({ selectedColor, onColorSelect, colorsAreLoaded, colors, handleColorSelect = () => {} }) => {

    const searchParams = useSearchParams();

    useEffect(() => {
        if (colorsAreLoaded) {
            const urlColor = searchParams.get('color');
            // Check if hexcode is provided in the query parameters
            if (urlColor) {
                const urlHexCode = "#" + urlColor;
                console.log("Hexcode from url: " + urlHexCode);
                // Find the color with the provided hexcode
                const urlColorObject = colors.find((color) => color.hex === urlHexCode);
                // If the color is found, set it as the selected color
                if (urlColorObject) {
                    handleColorSelect(urlColorObject);
                    console.log("URL color found: " + urlColorObject.shortName);
                }
                else {
                    console.log("URL color not found");
                }
            }
        }
    }, [colorsAreLoaded, colors, searchParams]);

    return null;
}
export default GetUrlColor;
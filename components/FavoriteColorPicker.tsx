import React, { useEffect, useState } from 'react';
import { ColorType } from "@/components/ColorType";
import ColorCard from "@/components/ColorCard";
import { useContext } from 'react';
import { FavoriteColorContext } from "@/components/FavoriteColorContext";


const FavoriteColorPicker: React.FC<{
    selectedColor: ColorType | null,
    favoriteColors: ColorType[],
    onColorSelect: (color: ColorType | null) => void }> = ({ selectedColor, onColorSelect }) => {

    const { favoriteColors } = useContext(FavoriteColorContext);



    const handleColorClick = (colorItem: ColorType) => {
        if (selectedColor && selectedColor.hex === colorItem.hex) {
            console.log('Deselecting color');
            onColorSelect(null); // remove selected color
            return false;
        }
        else {
            onColorSelect(colorItem); // "Feed" the selected color to the parent component
            console.log('Selected color:', colorItem);
            return true;
        }
    };

    return (
        <div className="flex-auto grid h-20 auto-rows-max grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 lg:gap-2 overflow-y-auto  rounded ">
            {favoriteColors.map((colorItem, index) => (
                <ColorCard key={index} colorItem={colorItem} handleColorClick={handleColorClick} selectedColor={selectedColor} />
            ))}
            {favoriteColors.length == 0 && (
                <div className='col-span-3 p-3 text-center'>
                    <p>Se dine favoritte fargene her ved å trykke på en hjerteknappe i alle farger</p>
                </div>
            )}
        </div>
    );
};

export default FavoriteColorPicker;
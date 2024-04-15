import React from 'react';
import { ColorType } from "@/components/ColorType";
import ColorCard from "@/components/ColorCard";

const ColorPicker: React.FC<{
    selectedColor: ColorType | null,
    onColorSelect: (color: ColorType | null) => void,
    colors?: ColorType[] } > = ({ selectedColor, onColorSelect, colors = [] }) => {

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
        <div>
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 lg:gap-2 ">

                {colors.slice(0).map((colorItem, index) => (
                    <ColorCard key={index} colorItem={colorItem} handleColorClick={handleColorClick} selectedColor={selectedColor} />
                ))}
            </div>
        </div>
    );
};

export default ColorPicker;
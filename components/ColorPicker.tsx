import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ColorType } from "@/components/ColorType";
import ColorCard from "@/components/ColorCard";

const ColorPicker: React.FC<{
    selectedColor: ColorType | null,
    onColorSelect: (color: ColorType | null) => void,
    colors?: ColorType[]
}> = ({ selectedColor, onColorSelect, colors = [] }) => {

    const [displayCount, setDisplayCount] = useState(30);
    const loaderRef = useRef<HTMLDivElement>(null);

    const handleColorClick = (colorItem: ColorType) => {
        if (selectedColor && selectedColor.hex === colorItem.hex) {
            console.log('Deselecting color');
            onColorSelect(null); // remove selected color
            return false;
        } else {
            onColorSelect(colorItem); // "Feed" the selected color to the parent component
            console.log('Selected color:', colorItem);
            return true;
        }
    };

    // Use `useCallback` to memoize the function, preventing excessive re-registrations
    const handleScroll = useCallback((event: Event) => {
        const target = event.target as HTMLDivElement; // Type assertion for `target`
        const { scrollTop, scrollHeight, clientHeight } = target;
        if (scrollHeight - scrollTop <= clientHeight * 1.1) { // Trigger when within 10% of the bottom
            if (displayCount < colors.length) {
                setDisplayCount(prevCount => Math.min(prevCount + 21, colors.length));
            }
        }
    }, [displayCount, colors.length]);

    useEffect(() => {
        const div = loaderRef.current;
        if (div) {
            div.addEventListener('scroll', handleScroll);
            return () => {
                if (div) {
                    div.removeEventListener('scroll', handleScroll);
                }
            };
        }
    }, [handleScroll]); // Include `handleScroll` in the dependency array

    return (
        <div ref={loaderRef} className="flex-auto grid h-20 auto-rows-max grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3 lg:gap-2 overflow-y-scroll rounded ">
            {colors.slice(0, displayCount).map((colorItem, index) => (
                <ColorCard key={index} colorItem={colorItem} handleColorClick={handleColorClick} selectedColor={selectedColor} />
            ))}
        </div>
    );
};

export default ColorPicker;

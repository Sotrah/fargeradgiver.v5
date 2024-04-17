import { ColorType } from "@/components/ColorType";
import React, { useContext } from 'react';
import { FavoriteColorContext, FavoriteColorContextType } from './FavoriteColorContext';

interface ColorCardProps {
    colorItem: ColorType;
    handleColorClick: (color: ColorType) => void;
    selectedColor: ColorType | null,
}

const ColorCard: React.FC<ColorCardProps> = ({ colorItem, handleColorClick, selectedColor }) => {
    const { favoriteColors, setFavoriteColors }: FavoriteColorContextType = useContext(FavoriteColorContext);

    const handleFavoriteClick = (colorItem: ColorType) => {
        if (favoriteColors.includes(colorItem)) {
            const indexToRemove =favoriteColors.indexOf(colorItem);
            if (indexToRemove !== -1) {
                const updatedFavoriteColors: ColorType[] = [...favoriteColors]; // Create a copy of the array
                updatedFavoriteColors.splice(indexToRemove, 1); // Remove colorItem from the copy
                setFavoriteColors(updatedFavoriteColors); // Update state with the modified array
              }
            return false;
        }
        else {
            const updatedFavoriteColors: ColorType[] = [...favoriteColors, colorItem]; // Add colorItem to a new copy of the array
            setFavoriteColors(updatedFavoriteColors); // Update state with the modified array
            return true;
        }
    };

    return (
        <div className={`w-full h-auto aspect-square rounded border-2 relative overflow-hidden ${selectedColor?.hex === colorItem.hex ? 'border-gray-600' : 'hover:border-gray-400 border-gray-200'}`} >
            {/* Favorite button */}
            <button
                className="absolute opacity-80 top-1 right-1 w-[30%] h-[30%] bg-transparent z-10 flex items-center justify-center overflow-visible"
                onClick={(event) => {
                    // event.stopPropagation(); // Prevent the color card click event from triggering
                    handleFavoriteClick(colorItem); // Pass the color item to the handleFavoriteClick function
                }}
                aria-label={`Favorite ${colorItem.shortName}`}
            >
                <svg className="absolute bg-transparent" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="49" fill="white" />
                </svg>

                <div className={`h-full w-full flex items-center justify-center z-20 stroke-1 stroke-gray-700 fill-current  ${favoriteColors.includes(colorItem) ? 'fill-gray-700' : 'hover:fill-gray-400 fill-transparent'}`}>
                    <svg className='w-2/3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </div>
            </button>

            {/* Deselect button, shown if color is selected */}
            {selectedColor?.hex === colorItem.hex && (
                <button
                    className="absolute opacity-80 top-1 left-1 w-[30%] h-[30%] bg-transparent z-10 flex items-center justify-center "
                    aria-label={`Deselect ${colorItem.shortName}`}
                    onClick={() => handleColorClick(colorItem)}
                >
                    <svg className="absolute bg-transparent " viewBox="0 0 100 100">
                        <circle cx="49" cy="50" r="49" fill="white" />
                    </svg>

                    <div className={`h-full w-full flex items-center justify-center z-30 fill-gray-700 hover:fill-black }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='w-2/4 h-2/4 z-30' viewBox="0 0 122.878 122.88" enable-background="new 0 0 122.878 122.88" >
                            <path d="M1.426,8.313c-1.901-1.901-1.901-4.984,0-6.886c1.901-1.902,4.984-1.902,6.886,0l53.127,53.127l53.127-53.127 c1.901-1.902,4.984-1.902,6.887,0c1.901,1.901,1.901,4.985,0,6.886L68.324,61.439l53.128,53.128c1.901,1.901,1.901,4.984,0,6.886 c-1.902,1.902-4.985,1.902-6.887,0L61.438,68.326L8.312,121.453c-1.901,1.902-4.984,1.902-6.886,0 c-1.901-1.901-1.901-4.984,0-6.886l53.127-53.128L1.426,8.313L1.426,8.313z"/>
                        </svg>
                    </div>
                </button>
            )}

            {/* Rest of color card */}
            <button
                className={`w-full absolute inset-0 flex flex-col items-center justify-center `}
                style={{ backgroundColor: '#F9F9F9' }}
                onClick={() => handleColorClick(colorItem)}
                aria-label={`Select ${colorItem.shortName} color`}
            >
                <div className="w-full h-2/3 flex items-center justify-center" style={{ backgroundColor: colorItem.hex }}>
                    {/* <div className="w-3/4 h-3/4 rounded" style={{ backgroundColor: colorItem.hex }}></div> */}
                </div>
                <div className="w-full h-1/3 flex items-center justify-center text-xs text-center" style={{ lineHeight: '1' }}>
                    <span>{colorItem.shortName}</span>
                </div>
            </button>
        </div>
    );
}

export default ColorCard;
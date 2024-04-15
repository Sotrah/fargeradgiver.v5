import React from 'react';
import { connectInfiniteHits } from 'react-instantsearch-dom';
import ColorCard from '@/components/ColorCard';
import { ColorType } from "@/components/ColorType"; // Importing the necessary type

const CustomInfiniteHits = ({
                                hits,
                                hasMore,
                                refineNext,
                                handleColorClick,
                                selectedColor,
                                setSelectedColor // Assuming state management is external
                            }) => {
    const onScroll = event => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight) {
            hasMore && refineNext();
        }
    };

    return (
        <div onScroll={onScroll} style={{ overflowY: 'auto', height: '400px' }} className="grid grid-cols-3 gap-3">
             {hits.map(hit => (
                 <ColorCard
                     key={hit.objectID}
                     colorItem={{ ...hit, hex: hit.hex.startsWith('#') ? hit.hex.slice(0) : hit.selectedColor.hex }}
                     handleColorClick={() => handleColorClick(hit, selectedColor, setSelectedColor)}
                     selectedColor={selectedColor}
                 />
            ))}
        </div>
    );
};

export default connectInfiniteHits(CustomInfiniteHits);

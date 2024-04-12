import React, { useEffect, useRef } from 'react';
import { connectInfiniteHits } from 'react-instantsearch-dom';
import ColorCard from "@/components/ColorCard";
import { HitProps } from "@/components/ColorSearchHit";
import ColorPicker from "@/components/ColorPicker"; // Ensure this import path is correct

// Extend the props interface to include onResultsUpdate
interface InfiniteHitsProps {
    hits: HitProps[];
    hasMore: boolean;
    refineNext: () => void;
    onResultsUpdate: (hits: HitProps[]) => void; // Add this line
}

const InfiniteHits: React.FC<InfiniteHitsProps> = ({ hits, hasMore, refineNext, onResultsUpdate }) => {
    const sentinel = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && hasMore) {
                    refineNext();
                }
            });
        }, { rootMargin: '150px' });

        if (sentinel.current) {
            observer.observe(sentinel.current);
        }

        return () => observer.disconnect();
    }, [hasMore, refineNext]);

    // Call onResultsUpdate with the current hits
    useEffect(() => {
        onResultsUpdate(hits);
    }, [hits, onResultsUpdate]);

    return (
        <div>
            {hits.map(hit => (
                <ColorPicker key={hit.hex} colorItem={hit} />
            ))}
            <div ref={sentinel} style={{ textAlign: ''}}></div>
        </div>
    );
};

export const CustomInfiniteHits = connectInfiniteHits(InfiniteHits);

// A collection of helper functions

import {HitProps} from "@/components/ColorSearchHit";
import {ColorType} from "@/components/ColorType";

// Removes the hashtag from hex-codes
export function formatHexColor(hexColor: string): string {
    return hexColor.startsWith('#') ? hexColor.slice(1) : hexColor;
}

// Converts an array of search hits into an array of ColorType objects
export function mapHitsToColorType(hits: HitProps[]): ColorType[] {
    return hits.map(hit => ({
        fullName: hit.fullName,
        shortName: hit.shortName,
        code: hit.code,
        ncsCode: hit.ncsCode,
        hex: hit.hex,
        description: hit.description,
        imageUrls: [],
        matchingColors: {},
        shades: {},
        collections: [],
    }));
}

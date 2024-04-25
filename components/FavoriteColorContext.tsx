// Manages list of favorite colors using a state setter function

import React, { createContext } from 'react';
import {ColorType} from "@/components/ColorType";

export interface FavoriteColorContextType {
    favoriteColors: ColorType[];
    setFavoriteColors: React.Dispatch<React.SetStateAction<ColorType[]>>;
}

export const FavoriteColorContext = createContext<FavoriteColorContextType>({
    favoriteColors: [],
    setFavoriteColors: () => {}
});

  
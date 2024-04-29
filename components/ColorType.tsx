// Data structure for storing details about each color
export interface ColorType{
    fullName: string;
    shortName: string;
    code: string;
    ncsCode: string;
    hex: string;
    description: string | null;
    imageUrls: string[];
    matchingColors: any;
    shades: any;
    collections: {
        code: string;
        name: string;
        promoted: boolean;
        imageUrl: string | null;
        createdAt: string | null;
        brand: string | null;
        type: string | null;
        applicationArea: string | null;
    }[];
}
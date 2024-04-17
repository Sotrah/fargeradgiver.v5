import React, {useEffect, useState} from 'react';
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/satellite.css';
import {Configure, InstantSearch, SearchBox, RefinementList, CurrentRefinements, connectStateResults, ClearRefinements} from 'react-instantsearch-dom';
import {HitProps} from "@/components/ColorSearchHit";
import {SearchResults} from "algoliasearch-helper";
import {CurrentRefinementsProps} from "react-instantsearch";

interface CustomResultsProps{
    searchState: any;
    searchResults: SearchResults<HitProps>;
    onResultsUpdate: (hits: HitProps[]) => null;

}


const CustomResultsComponent: React.FC<CustomResultsProps> = ({searchResults, onResultsUpdate }) => {
    useEffect(() => {
        if (searchResults && searchResults.hits.length > 0) {
            onResultsUpdate(searchResults.hits as HitProps[]);
        }
    }, [searchResults, onResultsUpdate]);

    return null; // No rendering
};

const CustomResults = connectStateResults(CustomResultsComponent);


const searchClient = algoliasearch('NOLK3JAMLX', 'fcde24d65b04aa23920ceb878b4362d9'); //Search-Only API key, Lite sikkerhetsfare

interface SearchProps {
    onResultsUpdate: (hits: HitProps[]) => void;
}
const transformItems: CurrentRefinementsProps['transformItems'] = (items) => {
    return items.map(item => ({
        ...item,
        label: item.label.replace(/^[^:]+: /, ''),  // Removes everything before and after the ":".

    }))
};
export const Search: React.FC<SearchProps> = ({ onResultsUpdate }) => {
    const [isCollapsed, setIsCollapsed] = useState(true); // Default to collapsed

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const panelElement = document.querySelector('.filter-panel') as HTMLDivElement;
            if (panelElement && !panelElement.contains(event.target as Node)) {
                setIsCollapsed(true);
            }
        };

        if (!isCollapsed) {
            document.addEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isCollapsed]);

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    return (
        <InstantSearch searchClient={searchClient} indexName="colours_dump">
            <Configure hitsPerPage={500}/>
            <CustomResults onResultsUpdate={onResultsUpdate}/>

            <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                    <SearchBox translations={{ placeholder: 'Søk her' }}/>
                </div>
                <button onClick={toggleCollapse}
                        className="text-sm lg:text-xs xl:text-sm border-2 bg-white hover:border-gray-500 rounded">
                    {isCollapsed ? 'Vis filter' : 'Skjul filter'}
                </button>
            </div>

            {/* Clear refinements button and current refinements display */}
            <div className="flex space-x-2 bg-white py-1">
                <ClearRefinements
                    translations={{ reset: "Nullstill" }}
                    className="text-xs text-white rounded-full cursor-pointer"
                />
                <div className="flex overflow-x-auto whitespace-nowrap">
                    <CurrentRefinements transformItems={transformItems} className="flex flex-wrap gap-2"/>
                </div>
            </div>

            {/* Slideout panel for the filters */}
            <div className={`filter-panel ${!isCollapsed ? 'active' : ''}`}>
                <ClearRefinements
                    translations={{ reset: 'Tilbakestill alle filtre' }}
                    className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-800 rounded"
                />
                <RefinementList attribute="collections.name" className="text-xlg"/>
                <button onClick={() => setIsCollapsed(true)} className="reset-button">
                    Lukk
                </button>
            </div>
        </InstantSearch>
    );
};
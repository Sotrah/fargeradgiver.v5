import React, {useEffect, useState} from 'react';
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/satellite.css';
import {Configure, InstantSearch, SearchBox, RefinementList, CurrentRefinements, connectStateResults} from 'react-instantsearch-dom';
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
        label: item.label.replace(/^[^:]+: /, '')  // Removes everything before and after the ":".
    }));
};
export const Search: React.FC<SearchProps> = ({ onResultsUpdate }) => {
    const [isCollapsed, setIsCollapsed] = useState(true); // Default to collapsed

    const toggleCollapse = () => setIsCollapsed(!isCollapsed); // Toggle function
    return (
        <InstantSearch searchClient={searchClient} indexName="colours_dump">
            <Configure hitsPerPage={500}/>
            <CustomResults onResultsUpdate={onResultsUpdate}/>
            <CurrentRefinements transformItems={transformItems} />

            <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                    <SearchBox translations={{ placeholder: 'Søk her' }}/>
                </div>

                <button onClick={toggleCollapse}
                        className="text-sm lg:text-xs xl:text-sm border-2 bg-white hover:border-gray-500 rounded-lg">
                    {isCollapsed ? 'Vis filter' : 'Gjem filter'}
                </button>
            </div>

            {/* Slideout panel for the filters */}
            <div className={`filter-panel ${!isCollapsed ? 'active' : ''}`}>
                <div className={isCollapsed ? 'hidden' : ''}>
                    <RefinementList attribute="collections.name"/>
                </div>
            </div>
        </InstantSearch>
    );
};
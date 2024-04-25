// ColorSearch integrates Algolia's search capabilities with an interface for handling search results and filters

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

    return null;
};

const CustomResults = connectStateResults(CustomResultsComponent);
const searchClient = algoliasearch('NOLK3JAMLX', 'fcde24d65b04aa23920ceb878b4362d9'); //Search-Only API key, low security risk

interface SearchProps {
    onResultsUpdate: (hits: HitProps[]) => void;
}

var currentRefinements: any[] = [];

const transformItems: CurrentRefinementsProps['transformItems'] = (items) => {
    currentRefinements = items;
    return items.map(item => ({
        ...item,
        label: item.label.replace(/^[^:]+: /, ''),
    }))
};
export const Search: React.FC<SearchProps> = ({ onResultsUpdate }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

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

    const toggleCollapse = () => {
            setIsCollapsed(!isCollapsed);
        }

    console.log();

    return (
        <InstantSearch searchClient={searchClient} indexName="colours_dump">
            <Configure hitsPerPage={500}/>
            <CustomResults onResultsUpdate={onResultsUpdate}/>

            <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                    <SearchBox translations={{ placeholder: 'Søk her' }}/>
                </div>
                <button onClick={toggleCollapse}
                        className="text-sm lg:text-xs xl:text-sm border-2 bg-white hover:border-gray-400 rounded">
                    Vis filtre
                </button>
            </div>

            {/* Clear refinements button and current refinements display */}
            <div className="flex space-x-2 bg-white py-1">
                {currentRefinements.length !== 0 && (
                    <ClearRefinements
                    translations={{ reset: "Nullstill" }}
                    className="text-xs text-white rounded-full cursor-pointer"
                />
                )}
                
                <div className="flex overflow-x-auto whitespace-nowrap">
                    <CurrentRefinements transformItems={transformItems} className="flex flex-wrap gap-2"/>
                </div>
            </div>

            {/* Slideout panel for the filters */}
            <div {...{ inert: isCollapsed ? '' : null }}  id="filter-panel" className={`filter-panel ${!isCollapsed ? 'active' : ''}`}>
                    <div >
                        <ClearRefinements
                            translations={{ reset: 'Nullstill alle filtre' }}
                            className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-800 rounded"
                        />
                        <RefinementList title="Filtre" attribute="collections.name" className="text-xlg"/>
                        <button onClick={() => setIsCollapsed(true)} className="reset-button">
                            Vis resultatene
                        </button>
                    </div>
            </div>
        </InstantSearch>
    );
};
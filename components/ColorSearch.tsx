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
        id: item.attribute + ':' + item.label // Legg til en unik ID basert på både attributt og label

    }))
};
export const Search: React.FC<SearchProps> = ({ onResultsUpdate }) => {
    const [isCollapsed, setIsCollapsed] = useState(true); // Default to collapsed

    // Oppdaterer useEffect for å håndtere klikk utenfor filter-panelet
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const panelElement = document.querySelector('.filter-panel') as HTMLDivElement;
            // Sjekker om panelElement eksisterer og om det ikke inneholder klikket mål
            if (panelElement && !panelElement.contains(event.target as Node)) {
                setIsCollapsed(true);
            }
        };

        // Legger til event listener hvis panel er åpent
        if (!isCollapsed) {
            document.addEventListener('click', handleOutsideClick);
        }

        // Opprydning: fjerner event listener
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isCollapsed]); // Avhenger av isCollapsed for å legge til/fjerne listener
    const toggleCollapse = () => setIsCollapsed(!isCollapsed); // Toggle function

    return (
        <InstantSearch searchClient={searchClient} indexName="colours_dump">
            <Configure hitsPerPage={500}/>
            <CustomResults onResultsUpdate={onResultsUpdate}/>

            <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                    <SearchBox translations={{placeholder: 'Søk her'}}/>

                </div>

                <button onClick={toggleCollapse}
                        className="text-sm lg:text-xs xl:text-sm border-2 bg-white hover:border-gray-500 rounded-lg">
                    {isCollapsed ? 'Vis filter' : 'Skjul filter'}
                </button>
                <CurrentRefinements transformItems={transformItems}/>



            </div>

            {/* Slideout panel for the filters */}
            <div className={`filter-panel ${!isCollapsed ? 'active' : ''}`}>
                <ClearRefinements
                    translations={{
                        reset: 'Tilbakestill alle filtre'
                    }}
                />
                <RefinementList attribute="collections.name"/>
                <button onClick={() => setIsCollapsed(true)} className="reset-button">
                    Lukk
                </button>

            </div>
        </InstantSearch>
    );
};
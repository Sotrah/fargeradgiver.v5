"use client"
import ColorPicker from "../components/ColorPicker";
import RecentColorPicker from "../components/RecentColorPicker";
import FavoriteColorPicker from "../components/FavoriteColorPicker";
import { FavoriteColorContext } from "@/components/FavoriteColorContext";
import {ColorType} from "@/components/ColorType";
import ImageGridCard from "@/components/ImageGridCard";
import React, {useEffect, useState, Suspense} from "react";
import {formatHexColor, mapHitsToColorType} from "@/components/Utils";
import {Search}  from "@/components/ColorSearch";
import colours_dump from "colours_dump.json"
import {HitProps} from "@/components/ColorSearchHit";
import GetUrlColor from "@/components/GetUrlColor";
import ChosenColorInfo from "@/components/ChosenColorInfo";
import MainImage from "@/components/MainImage";
import DisclaimerBox from "@/components/Disclaimer";

export default function Home() {

  const [selectedImage, setSelectedImage] = useState<String | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorType | null>(null);
  const [favoriteColors, setFavoriteColors] = useState<ColorType[]>([]);
  const formattedHex = selectedColor ? formatHexColor(selectedColor.hex) : null;
  const [visibleModule, setVisibleModule] = useState("modul2");
  const [loading, setLoading] = useState(false);
  
  const [colors, setColors] = useState<ColorType[]>([]); 
  const [searchResults, setSearchResults] = useState<ColorType[]>([]);
  const[colorsAreLoaded, setColorsAreLoaded] = useState(false);
  const [recolorOption, setRecolorOption] = useState("All the walls and every wall");


  const handleResultsUpdate = (hits: HitProps[]) => {
    // Convert HitProps[] to ColorType[]
    const convertedResults = mapHitsToColorType(hits);
    if (searchResults.length !== convertedResults.length || !convertedResults.every((result, index) => result.code === searchResults[index]?.code)) {
      setSearchResults(convertedResults);
      setColorsAreLoaded(true);
    }
  };   

  // Load initial color data
  useEffect(() => {
    setColors(colours_dump);
  }, []);

  // Handle image selection changes
  const handleImageSelect = (selectedImage: String | null) => {
    if (selectedImage != null) {
      setLoading(true);
    }
    else{
      setLoading(false);
    }
    setSelectedImage(selectedImage)
  }

  // Handle color selection changes
  const handleColorSelect = (selectedColor: ColorType | null) => {
    if (selectedColor != null && selectedImage != null) {
        setLoading(true);
    }
    else{
        setLoading(false);
    }
    setSelectedColor(selectedColor)
  }


  return (
    <FavoriteColorContext.Provider value={{ favoriteColors, setFavoriteColors }}>
        <Suspense>
            <GetUrlColor onColorSelect={handleColorSelect}
                        handleColorSelect={handleColorSelect}
                        selectedColor={selectedColor}
                        colors={colors}
                        colorsAreLoaded={colorsAreLoaded}/>
        </Suspense>
        
      <div className="bg-jernia-nettside new-style page-proxiedContentWrapper pageType-ContentPage template-pages-layout-landingLayout2Page pageLabel-proxiedContentWrapper smartedit-page-uid-proxiedContentWrapper smartedit-page-uuid-eyJpdGVtSWQiOiJwcm94aWVkQ29udGVudFdyYXBwZXIiLCJjYXRhbG9nSWQiOiJjbkNvbnRlbnRDYXRhbG9nIiwiY2F0YWxvZ1ZlcnNpb24iOiJPbmxpbmUifQ== smartedit-catalog-version-uuid-cnContentCatalog/Online language-no">

        {/* Navbar */}
        <div className="c-site-header">
          <div className="header-container">
            <div className="c-site-header__top text-white text-2xl">
              <div className="container">
                <figure className=" c-site-header__top__logo">
                  <svg id="Jernia_Logo" width="150px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 733.99 177.76">
                      <path className="cls-1" id="Name" d="M143,174.82c.19-.54,19.11-56.07,19.11-56.07h32.56a3,3,0,0,0,3-3.83l-4-16.41a2.66,2.66,0,0,0-2.45-1.92h-45.7a3,3,0,0,0-2.61,1.87L118.27,171.1c-5.79,20.16,3.61,34.07,24.09,34.07h73.56a3,3,0,0,0,3-3.83l-4-16.41a2.65,2.65,0,0,0-2.45-1.92h-64.2C145.08,183,141.25,180.07,143,174.82Z" transform="translate(-37.88 -62.06)"></path>
                      <path className="cls-1" id="Name" d="M197.75,158.13l-4-16.41a2.66,2.66,0,0,0-2.44-1.92H164.51a3,3,0,0,0-2.61,1.87l-5.64,16.56a2.66,2.66,0,0,0,2.68,3.73h35.82A2.94,2.94,0,0,0,197.75,158.13Z" transform="translate(-37.88 -62.06)"></path>
                      <rect className="cls-1" id="Name" x="386.58" width="25.34" height="22.03" rx="2.46"></rect>
                      <rect className="cls-1" id="Name" x="41.73" width="25.34" height="22.03" rx="2.46"></rect>
                      <path className="cls-1" id="Name" d="M365.52,96.7h-26.3a2.47,2.47,0,0,0-2.47,2.46V202.71a2.47,2.47,0,0,0,2.47,2.46h20.41a2.46,2.46,0,0,0,2.46-2.46V118.92l45.18,84.51a3.61,3.61,0,0,0,2.89,1.74h37.18a2.47,2.47,0,0,0,2.46-2.46V99.16a2.47,2.47,0,0,0-2.46-2.46H426.92a2.47,2.47,0,0,0-2.46,2.46v84.06l-41-76.65C382.85,105.36,378.23,96.7,365.52,96.7Z" transform="translate(-37.88 -62.06)"></path>
                      <path className="cls-1" id="Name" d="M322.76,201.7l-32.08-60.09a3.59,3.59,0,0,0-2.89-1.74H265.67c-2.17,0-3.1,1.56-2.08,3.47l32.14,60.09a3.61,3.61,0,0,0,2.9,1.74h22.05C322.85,205.17,323.78,203.61,322.76,201.7Z" transform="translate(-37.88 -62.06)"></path>
                      <path className="cls-1" id="Name" d="M314.05,115.36l-9-16.92a3.62,3.62,0,0,0-2.9-1.74H231.49A2.47,2.47,0,0,0,229,99.16V202.71a2.47,2.47,0,0,0,2.46,2.46H251.9a2.47,2.47,0,0,0,2.47-2.46V118.84H312C314.13,118.84,315.07,117.27,314.05,115.36Z" transform="translate(-37.88 -62.06)"></path>
                      <path className="cls-1" id="Name" d="M102.49,96.7H82.08a2.46,2.46,0,0,0-2.46,2.46V183H40.38c-2.17,0-3.1,1.57-2.08,3.48l9,16.92a3.62,3.62,0,0,0,2.9,1.74H93.31A11.65,11.65,0,0,0,105,193.52V99.16A2.47,2.47,0,0,0,102.49,96.7Z" transform="translate(-37.88 -62.06)"></path>
                      <path className="cls-1" id="Name" d="M545.87,174.84a5.75,5.75,0,0,1-5.21,8.19h-33.5c-2.17,0-3.11,1.57-2.09,3.48l9.05,16.92a3.61,3.61,0,0,0,2.9,1.74h29.07c21.25,0,32.74-16.35,24.52-36.38L541.76,98.52A3.19,3.19,0,0,0,539,96.7H505.19a3.19,3.19,0,0,0-2.72,1.82l-42.16,103a2.46,2.46,0,0,0,2.45,3.65H484a3.21,3.21,0,0,0,2.73-1.82L522.17,117Z" transform="translate(-37.88 -62.06)"></path>
                      <path className="cls-2" d="M632.82,62.06H619a2,2,0,0,0-1.55.88L598.9,94.64c-.66,1.13-.13,2.06,1.19,2.06h13.78a2,2,0,0,0,1.54-.89L634,64.12C634.66,63,634.13,62.06,632.82,62.06Z" transform="translate(-37.88 -62.06)"></path>
                      <path className="cls-2" d="M666,122.81H652.21a2,2,0,0,0-1.54.89l-18.59,31.69c-.66,1.14-.13,2.07,1.18,2.07H647a2,2,0,0,0,1.55-.89l18.59-31.69C667.84,123.74,667.31,122.81,666,122.81Z" transform="translate(-37.88 -62.06)"></path>
                      <path className="cls-2" d="M694.14,192.1H680.36a2,2,0,0,0-1.54.88l-26.25,44.77c-.67,1.14-.14,2.07,1.18,2.07h13.78a2,2,0,0,0,1.54-.89l26.26-44.77C696,193,695.46,192.1,694.14,192.1Z" transform="translate(-37.88 -62.06)"></path>
                      <path className="cls-2" d="M715.7,96.7H701.92a2,2,0,0,0-1.54.88l-26.26,44.77c-.66,1.14-.13,2.07,1.18,2.07h13.78a2,2,0,0,0,1.55-.89l26.25-44.77C717.55,97.63,717,96.7,715.7,96.7Z" transform="translate(-37.88 -62.06)"></path>
                      <path className="cls-2" d="M701.63,62.06H687.85a2,2,0,0,0-1.55.88l-26.25,44.77c-.67,1.13-.14,2.06,1.18,2.06H675a2,2,0,0,0,1.54-.88l26.26-44.77C703.47,63,702.94,62.06,701.63,62.06Z" transform="translate(-37.88 -62.06)"></path>
                      <path className="cls-2" d="M680.07,157.46H666.29a2,2,0,0,0-1.54.88l-26.26,44.77c-.66,1.13-.13,2.06,1.18,2.06h13.78a2,2,0,0,0,1.55-.88l26.25-44.77C681.92,158.38,681.38,157.46,680.07,157.46Z" transform="translate(-37.88 -62.06)"></path>
                      <path className="cls-2" d="M770.41,62.06H756.63a2,2,0,0,0-1.54.88L688.2,177c-.67,1.13-.14,2.06,1.18,2.06h13.78a2,2,0,0,0,1.54-.89l66.89-114C772.26,63,771.72,62.06,770.41,62.06Z" transform="translate(-37.88 -62.06)"></path>
                  </svg>
                </figure>
                <input type="text" className="searchbar block w-full h-12 px-4 py-2 rounded-full border pointer-events-none bg-gray-50 focus:outline-none focus:border-blue-500 text-base" placeholder="Søkebaren og toppdelen er bare et eksempel" />
                <div className="dummy-button-container flex items-center">
                  <div className="dummy-button bg-gray-100 rounded-full"></div>
                  <div className="dummy-button bg-gray-100 rounded-full"></div>
                  <div className="dummy-button bg-gray-100 rounded-full"></div>
                  <div className="dummy-button bg-gray-100 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="jernia-navigation-container"/>
          </div>
        </div>

        {/* Headline and info */}
        <div className="main-container mx-auto px-4">
          <div className="text-center lg:my-8 my-4 background-image-container">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 text-left">Visualiseringsverktøy</h1>
            <p className="mt-4 text-sm lg:text-lg text-gray-600 text-left lg:pr-96 pr-10">La deg inspirere av Jotuns fantastiske fargeunivers.
                Finn fargene som passer best til din stil og last opp bilde av rommet du vil male.
                Etter at bildet er lastet opp kan du enkelt endre veggfargen til den fargen du ønsker.</p>
          </div>

            {/* Container for the main elements */}
            <div role="main" className="main-flexbox"> {/* Added role of main to meet WCAG requirements */}

                {/* Image picker */}
                <div role="bildevelger" className="left-column lg:order-1 relative rounded bg-white p-3 ">
                    <ImageGridCard selectedImage={selectedImage}
                                   onImageSelect={handleImageSelect}/>
                </div>

                {/* The middle column for desktop */}
                <div
                    className="middle-column lg:order-2 relative w-full h-full flex flex-col items-stretch justify-center" id="middle-column">

                    {/* Main image */}
                    <div role="hovedbildet" className="middle-column order-2 lg:order-1">
                        <MainImage selectedColor={selectedColor} selectedImage={selectedImage} loading={loading}
                                   setLoading={setLoading} recolorOption={recolorOption} formattedHex={formattedHex}/>
                    </div>

                    {/* Chosen color info for desktop */}
                    <div
                      role="info om valgt farge"
                        className="color-info-lg order-3 lg:order-2 rounded bg-white flex justify-center items-center p-3 max-h-36">
                        <ChosenColorInfo selectedColor={selectedColor} formattedHex={formattedHex}/>
                    </div>

                    {/* Disclaimer */}
                    <div role="disclaimer" className="order-1 lg:order-3">
                        <DisclaimerBox/>
                    </div>
                </div>

                {/* Last column for desktop */}
                <div role="fargevelger" className="flex flex-col right-column lg:order-3 relative w-full h-auto bg-white rounded p-3 " id="right-column">
                    <span className="text-md font-bold mb-4 hidden lg:block">Velg farge</span>

                    {/* Tabs for colorpicker */}
                    <ul role="tablist" aria-label="Fargevalg tabber"
                      className="tab-container text-sm">
                      <li role="presentation">
                        <button role="tab"
                            className={`tab-button ${visibleModule === "modul2" ? "selected" : ""}`}
                            onClick={() => setVisibleModule("modul2")}>
                            Alle farger
                        </button>
                      </li>
                      <li role="presentation">
                        <button role="tab"
                            className={`tab-button ${visibleModule === "modul3" ? "selected" : ""}`}
                            onClick={() => setVisibleModule("modul3")}>
                            Nylig brukt
                        </button>
                      </li>
                      <li role="presentation">
                        <button role="tab"
                            className={`tab-button ${visibleModule === "modul4" ? "selected" : ""}`}
                            onClick={() => setVisibleModule("modul4")}>
                            Favoritter
                        </button>
                      </li>
                    </ul>

                    {/* Searchbar and colorpicker */}
                    <div
                        className={`${visibleModule === "modul2" ? "" : "hidden"} grow flex flex-col  rounded pt-4`}>
                        <Search onResultsUpdate={handleResultsUpdate}/>
                        <ColorPicker onColorSelect={handleColorSelect}
                                     selectedColor={selectedColor}
                                     colors={searchResults}/>
                    </div>

                    {/* Recently used colors */}
                    <div
                        className={`${visibleModule === "modul3" ? "" : "hidden"} grow flex flex-col  rounded pt-2`}>
                        <RecentColorPicker onColorSelect={handleColorSelect} selectedColor={selectedColor}
                                           visibleModule={visibleModule}/>
                    </div>

                    {/* Favorite colors*/}
                    <div
                        className={`${visibleModule === "modul4" ? "" : "hidden"} grow flex flex-col  rounded pt-2`}>
                        <FavoriteColorPicker onColorSelect={handleColorSelect} selectedColor={selectedColor}
                                             favoriteColors={favoriteColors}/>
                    </div>
                </div>

            </div>
        </div>

          {/* Chosen color info for mobile */}
          <div role="info om valgt farge på mobil"
              className={`${(selectedImage || selectedColor) ? "!bottom-[0px]" : ""} color-info-sm lg:hidden rounded bg-white flex justify-center z-50 items-center p-3 max-h-36 w-full`}>
              <ChosenColorInfo selectedColor={selectedColor} formattedHex={formattedHex}/>
          </div>
      </div>
    </FavoriteColorContext.Provider>
  );
}

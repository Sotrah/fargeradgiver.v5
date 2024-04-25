// Disclaimer displays the disclaimer in a dedicated box


import React from 'react';

const DisclaimerBox = () => {
    return (
        <div className="flex p-4 rounded w-full bg-neutral-50 border border-neutral-200 text-text-700">
            <span className="shrink-0">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="undefined w-4 h-4">
                    <path d="M14.9849 7.9C15.6249 8.62 15.9249 9.59999 15.7849 10.64C15.5449 12.56 14.1449 13.24 12.9049 13.24C12.8449 13.24 12.8049 13.24 12.8049 13.24V13.72C12.8049 14.16 12.4449 14.52 12.0049 14.52C11.5649 14.52 11.2049 14.16 11.2049 13.72V13.08C11.2049 12.42 11.4849 11.64 12.9049 11.64C13.6849 11.64 14.0849 11.24 14.1849 10.44C14.2249 10.18 14.2449 9.48001 13.7649 8.96001C13.3849 8.54001 12.7649 8.31999 11.9249 8.31999C10.1249 8.31999 10.0649 9.49999 10.0649 9.62C10.0649 10.06 9.70494 10.42 9.26494 10.42C8.82494 10.42 8.46494 10.06 8.46494 9.62C8.46494 8.81999 9.08493 6.71999 11.9249 6.71999C13.5849 6.71999 14.5049 7.36 14.9849 7.9ZM11.9449 15.2C11.6849 15.2 11.4249 15.3 11.2449 15.5C11.0649 15.68 10.9449 15.94 10.9449 16.2C10.9449 16.46 11.0449 16.72 11.2449 16.9C11.4249 17.08 11.6849 17.2 11.9449 17.2C12.2049 17.2 12.4649 17.1 12.6449 16.9C12.8249 16.72 12.9449 16.46 12.9449 16.2C12.9449 15.94 12.8449 15.68 12.6449 15.5C12.4849 15.32 12.2249 15.2 11.9449 15.2ZM21.2049 12C21.2049 17.08 17.0849 21.2 12.0049 21.2C6.92493 21.2 2.80493 17.08 2.80493 12C2.80493 6.92 6.92493 2.8 12.0049 2.8C17.0849 2.8 21.2049 6.92 21.2049 12ZM19.6049 12C19.6049 7.8 16.2049 4.4 12.0049 4.4C7.80493 4.4 4.40493 7.8 4.40493 12C4.40493 16.2 7.80493 19.6 12.0049 19.6C16.2049 19.6 19.6049 16.2 19.6049 12Z" fill="currentColor">
                    </path>
                </svg>
            </span>
            <div className="flex-grow ml-4 flex items-center">
                <div className="text-xs">
                    <h5 className="leading-hd font-semibold tracking-hd hyphens-manual text-hd-5-m md:text-hd-5 text-text-700" style={{ overflowWrap: 'break-word' }}>
                        Vi anbefaler å bestille en fargeprøve før man velger farge
                    </h5>
                    <p className="leading-p text-p-xs mt-2">Farger vil som oftest avvike fra skjerm til vegg. Fargeopplevelsen kan også være forskjellig under ulike lysforhold. Glans og underlag kan påvirke fargenes utseende.</p>
                </div>
            </div>
        </div>
    );
};

export default DisclaimerBox;

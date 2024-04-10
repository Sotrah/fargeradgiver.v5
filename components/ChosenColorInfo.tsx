import React from 'react';
import { ColorType } from './ColorType';

const ChosenColorInfo: React.FC<{
    selectedColor: ColorType | null,
    formattedHex: string| null,
} > = ({ selectedColor, formattedHex = () => {} }) => {
    return (
        <div className='flex-1'>
            {selectedColor && (
                <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                    <div style={{
                        backgroundColor: `#${formattedHex}`,
                        width: '60px',
                        height: '60px',
                        borderRadius: '8px',
                    }}>
                        <img src="/jernia-paint-blob.png" alt="Paint blob"/>
                    </div>
                    <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <span className="colorName">{selectedColor.fullName}</span>
                        <span className="colorCode">{selectedColor.ncsCode}</span>
                    </div>
                    <div>
                        <button
                            className="px-6 xl:px-10 lg:px-2 py-1 md:py-2 bg-green-500 hover:bg-green-700 text-white rounded"
                            onClick={() => window.open(('https://www.jernia.no/farger/' + selectedColor.code), '_blank')}>
                            Kjøp
                        </button>
                    </div>
                </div>
            )}
            {!selectedColor && (
                <div className="flex items-center justify-center text-center">
                    <span className="desktop-text">Velg en farge til høyre for å redigere bildet, og velg et annet bilde eller laste opp ditt eget til venstre.</span>
                    <span className="mobile-text">Velg en farge under for å redigere bildet, og velg et annet bilde eller last opp ditt eget øverst.</span>
                </div>

            )}
        </div>
    )
}

export default ChosenColorInfo;
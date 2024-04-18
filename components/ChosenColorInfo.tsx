import React from 'react';
import { ColorType } from './ColorType';

const ChosenColorInfo: React.FC<{
    selectedColor: ColorType | null,
    formattedHex: string| null,
} > = ({ selectedColor, formattedHex = () => {} }) => {
    return (
        <div className='flex-1 max-w-[550px]'>
            {selectedColor && (
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <div className="w-11 h-11 lg:w-14 lg:h-14 rounded" style={{
                        backgroundColor: `#${formattedHex}`,
                    }}>
                        <img src="/jernia-paint-blob.png" alt="Paint blob"/>
                    </div>
                    <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <span className="colorName">{selectedColor.fullName}</span>
                        <span className="colorCode">{selectedColor.ncsCode}</span>
                    </div>
                    <div>
                        <button
                            className="w-16 h-10 lg:w-20 lg:h-12 bg-[#198009] hover:bg-[#206116] text-white rounded"
                            onClick={() => window.open(('https://www.jernia.no/farger/' + selectedColor.code), '_blank')}>
                            Kjøp
                        </button>
                    </div>
                </div>
            )}
            {!selectedColor && (
                <div className="flex items-center justify-center text-cente h-11 lg:h-14">
                    <span className="desktop-text">Velg en farge til høyre for å redigere bildet</span>
                    <span className="mobile-text">Velg en farge for å redigere bildet</span>
                </div>

            )}
        </div>
    )
}

export default ChosenColorInfo;
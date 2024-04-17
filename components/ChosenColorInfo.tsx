import React from 'react';
import { ColorType } from './ColorType';

const ChosenColorInfo: React.FC<{
    selectedColor: ColorType | null,
    formattedHex: string| null,
} > = ({ selectedColor, formattedHex = () => {} }) => {
    return (
        <div className='flex-1'>
            {selectedColor && (
                <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <div style={{
                        backgroundColor: `#${formattedHex}`,
                        width: '3.5rem',
                        height: '3.5rem',
                        borderRadius: '1rem',
                    }}>
                        <img src="/jernia-paint-blob.png" alt="Paint blob"/>
                    </div>
                    <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <span className="colorName">{selectedColor.fullName}</span>
                        <span className="colorCode">{selectedColor.ncsCode}</span>
                    </div>
                    <div>
                        <button
                            className="w-20 h-12 bg-[#198009] hover:bg-[#206116] text-white rounded"
                            onClick={() => window.open(('https://www.jernia.no/farger/' + selectedColor.code), '_blank')}>
                            Kjøp
                        </button>
                    </div>
                </div>
            )}
            {!selectedColor && (
                <div className="flex items-center justify-center text-cente h-14">
                    <span className="desktop-text">Velg en farge til høyre for å redigere bildet</span>
                    <span className="mobile-text">Velg en farge for å redigere bildet</span>
                </div>

            )}
        </div>
    )
}

export default ChosenColorInfo;
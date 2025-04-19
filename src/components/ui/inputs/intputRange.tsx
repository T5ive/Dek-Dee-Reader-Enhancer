import React from 'react';

interface InputRangeProps {
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: (value: number) => void;
}

export const InputRange: React.FC<InputRangeProps> = ({ min, max, step, value, onChange }) => {
    return (
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            style={{
                width: '100%',
                accentColor: '#1E90FF',
                background: '#FFFFFF',
            }}
        />
    );
};

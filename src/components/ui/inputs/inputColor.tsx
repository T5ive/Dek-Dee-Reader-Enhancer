import React from 'react';

interface InputColorProps {
    value: string;
    onChange: (value: string) => void;
}

export const InputColor: React.FC<InputColorProps> = ({ value, onChange }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    width: '24px',
                    height: '24px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginRight: '8px',
                }}
            />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    padding: '6px 8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    width: '100px',
                    fontSize: '14px',
                }}
            />
        </div>
    );
};

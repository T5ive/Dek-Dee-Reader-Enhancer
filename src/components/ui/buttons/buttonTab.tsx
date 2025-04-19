import React from 'react';

interface ButtonTabProps {
    active: boolean;
    onClick: () => void;
    label: string;
}

export const ButtonTab: React.FC<ButtonTabProps> = ({ active, onClick, label }) => {
    return (
        <button
            onClick={onClick}
            style={{
                background: 'none',
                border: 'none',
                borderBottom: active ? '2px solid #1E90FF' : '2px solid transparent',
                color: active ? '#1E90FF' : '#555',
                padding: '8px 16px',
                cursor: 'pointer',
                fontWeight: active ? 600 : 400,
                transition: 'all 0.2s',
            }}
        >
            {label}
        </button>
    );
};

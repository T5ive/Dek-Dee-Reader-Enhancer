import React from 'react';

interface ButtonColorProps {
	color: string;
	onClick: () => void;
	isSelected: boolean;
}

export const ButtonColor: React.FC<ButtonColorProps> = ({
	color,
	onClick,
	isSelected,
}) => {
	return (
		<button
			type="button"
			onClick={onClick}
			style={{
				backgroundColor: color,
				width: '24px',
				height: '24px',
				borderRadius: '50%',
				border: '1px solid #ddd',
				cursor: 'pointer',
				boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
				borderWidth: '2px',
				borderStyle: 'solid',
				borderColor: isSelected ? '#3B82F6' : '#E5E7EB',
			}}
			title={color}
		/>
	);
};

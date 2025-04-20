import React from 'react';

interface InputNumberProps {
	min: number;
	max: number;
	step: number;
	value: number;
	onChange: (value: number) => void;
}

export const InputNumber: React.FC<InputNumberProps> = ({
	min,
	max,
	step,
	value,
	onChange,
}) => {
	return (
		<input
			type="number"
			min={min}
			max={max}
			step={step}
			value={value}
			onChange={(e) => onChange(Number.parseFloat(e.target.value))}
			style={{
				width: 'calc(100% - 18px)',
				padding: '8px',
				borderRadius: '4px',
				border: '1px solid #ccc',
				fontSize: '16px',
				outline: 'none',
				transition: 'border-color 0.3s',
			}}
			onFocus={(e) => {
				e.target.style.borderColor = '#1E90FF';
			}}
			onBlur={(e) => {
				e.target.style.borderColor = '#ccc';
			}}
		/>
	);
};

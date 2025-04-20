import React from 'react';

interface SelectOption {
	value: string;
	label: string;
}

interface SelectProps {
	value: string;
	options: SelectOption[];
	onChange: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({ value, options, onChange }) => {
	return (
		<select
			value={value}
			onChange={(e) => onChange(e.target.value)}
			style={{
				width: '100%',
				padding: '8px 12px',
				borderRadius: '4px',
				border: '1px solid #ddd',
				fontSize: '14px',
				backgroundColor: '#fff',
			}}
		>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
};

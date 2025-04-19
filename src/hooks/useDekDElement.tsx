import React, { useEffect, useState } from 'react';

export const useDekDElement = () => {
	const [headerElement, setHeaderElement] = useState<HTMLElement | null>(null);
	const [contentElement, setContentElement] = useState<HTMLElement | null>(
		null,
	);

	useEffect(() => {
		const header = document.getElementById('head1');
		const content = document.querySelector('.story-content');

		if (header) setHeaderElement(header);
		if (content) setContentElement(content as HTMLElement);
	}, []);

	return { headerElement, contentElement };
};

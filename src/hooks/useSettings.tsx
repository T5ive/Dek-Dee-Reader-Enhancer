import { useState, useEffect } from 'react';
import { defaultSettings } from '../config/defaultSettings';
import { Settings } from '../types/settings';
import { saveToStorage, loadFromStorage } from '../utils/storage';

export const useSettings = () => {
	const [settings, setSettings] = useState<Settings>(defaultSettings);

	useEffect(() => {
		const savedSettings = loadFromStorage<Settings>('dek-d-reader-settings');
		if (savedSettings) {
			setSettings({ ...defaultSettings, ...savedSettings });
		}
	}, []);

	const updateSettings = (newSettings: Partial<Settings>) => {
		const updatedSettings = { ...settings, ...newSettings };
		setSettings(updatedSettings);
		saveToStorage('dek-d-reader-settings', updatedSettings);
		applySettings(updatedSettings);
	};

	const resetToDefault = () => {
		setSettings(defaultSettings);
		saveToStorage('dek-d-reader-settings', defaultSettings);
		applySettings(defaultSettings);
	};

	const hookHeader = (appliedSettings: Settings) => {
		const header = document.getElementById('head');
		if (header) {
			if (appliedSettings.unfixHeader) {
				header.classList.remove('stickable');
			} else {
				header.classList.add('stickable');
			}
		}

		const header1 = document.getElementById('head1');
		if (header1) {
			if (appliedSettings.changeHeaderColor) {
				header1.style.background = appliedSettings.backgroundColor;
			} else {
				header1.style.background = '#FFC22F';
			}
		}
	};

	const hookBanner = (appliedSettings: Settings) => {
		hideElements('#banner', appliedSettings.hideAds, 'flex');
	};

	const hookFooter = (appliedSettings: Settings) => {
		const footer = document.querySelector('#novel_action_footer');
		if (!footer) return;
		const displayStyle = appliedSettings.hideFooter ? 'static' : 'sticky';
		footer.setAttribute(
			'style',
			`position: ${displayStyle} !important; background: ${appliedSettings.backgroundColor} !important;`,
		);
	};

	const hookScrollToTop = (appliedSettings: Settings) => {
		hideElements('.scroll-to-top-btn', appliedSettings.hideAds, 'flex');
	};

	const hookMain = (appliedSettings: Settings) => {
		const main = document.querySelector('#content-area');
		if (!main) return;

		main.setAttribute(
			'style',
			`background: ${appliedSettings.backgroundColor} !important;`,
		);

		const others = document.querySelector('#novel_action_wrapper');
		if (!others) return;
		others.setAttribute(
			'style',
			`background: ${appliedSettings.backgroundColor} !important;`,
		);
	};

	const hookMainCenter = (appliedSettings: Settings) => {
		const mainCenter = document.querySelector('#main-center');
		if (!mainCenter) return;

		const width = appliedSettings.mainCenterFullWidth
			? appliedSettings.contentWidth === 0
				? '100%'
				: `${appliedSettings.contentWidth}px`
			: '987px';

		const widthStyle = `width: ${width} !important; max-width: ${width} !important;`;
		const backgroundColorStyle = `background-color: ${appliedSettings.backgroundColor} !important;`;
		const marginStyle = 'margin: 0 auto !important;';
		const style = `${widthStyle} ${backgroundColorStyle} ${marginStyle}`;
		mainCenter.setAttribute('style', style);
	};

	const hookStoryContent = (appliedSettings: Settings) => {
		const storyContent = document.querySelector('#story-content');
		if (!storyContent) return;
		const width =
			appliedSettings.contentWidth === 0
				? '100%'
				: `${appliedSettings.contentWidth}px`;

		const widthStyle = `width: ${width} !important; max-width: ${width} !important;`;
		const backgroundColorStyle = `background-color: ${appliedSettings.backgroundColor} !important;`;
		const marginStyle = 'margin: 0 auto !important;';
		const style = `${widthStyle} ${backgroundColorStyle} ${marginStyle}`;
		storyContent.setAttribute('style', style);
	};

	const hookChapterBox = (appliedSettings: Settings) => {
		const buttonId = 'download-button';
		const existingButton = document.getElementById(buttonId);

		if (!appliedSettings.download) {
			existingButton?.remove();
			return;
		}

		if (existingButton) return;

		const storyContent = document.querySelector('#story-content');
		if (!storyContent) return;

		const chapterBox = document.querySelector('.chapter-box-wrapper');
		if (!chapterBox) return;

		const button = document.createElement('button');
		button.id = buttonId;
		button.innerText = '💾 ดาวน์โหลดตอนนี้';

		Object.assign(button.style, {
			padding: '8px 16px',
			margin: '10px 0',
			fontSize: '14px',
			backgroundColor: '#1E90FF',
			color: '#fff',
			border: 'none',
			borderRadius: '5px',
			cursor: 'pointer',
			boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
			transition: 'background-color 0.3s ease',
		});
		button.addEventListener('mouseover', () => {
			button.style.backgroundColor = '#1E80FF';
		});
		button.addEventListener('mouseout', () => {
			button.style.backgroundColor = '#1E90FF';
		});

		button.addEventListener('click', () => {
			const rawText = (storyContent as HTMLElement).innerText.trim();

			const cleanedText = rawText
				.split('\n')
				.map((line) => line.trim())
				.filter((line) => line.length > 0)
				.join('\n');

			const blob = new Blob([cleanedText], {
				type: 'text/plain;charset=utf-8',
			});

			const link = document.createElement('a');
			link.href = URL.createObjectURL(blob);

			const title = document.title || 'dekd-chapter';
			link.download = `${title.replace(/[\\/:*?"<>|]/g, '')}.txt`;

			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		});

		chapterBox.appendChild(button);
	};

	const hookContent = (appliedSettings: Settings) => {
		const contentElements = document.querySelectorAll('#story-content *');
		if (!contentElements) return;
		for (const element of contentElements) {
			setStyle(element, appliedSettings);
			setContent(element);
		}
	};

	const hookOuter = (appliedSettings: Settings) => {
		hideElements('#suggest-list', appliedSettings.hideSuggestList);
		hideElements('#ebook-rand-list', appliedSettings.hideDiscountList);
		hideElements('#show-mini-comment-app', appliedSettings.hideComment);
	};

	const applySettings = (appliedSettings: Settings) => {
		hookHeader(appliedSettings);
		hookBanner(appliedSettings);
		hookFooter(appliedSettings);
		hookScrollToTop(appliedSettings);
		hookMain(appliedSettings);
		hookMainCenter(appliedSettings);
		hookStoryContent(appliedSettings);
		hookChapterBox(appliedSettings);
		hookContent(appliedSettings);
		hookOuter(appliedSettings);
	};

	const setStyle = (element: Element, appliedSettings: Settings) => {
		const isIndentA = element.classList.contains('indent-a');
		const textAlignStyle = isIndentA
			? appliedSettings.justifyText
				? 'justify'
				: 'left'
			: 'center';
		const textIndentStyle = isIndentA
			? `${appliedSettings.textIndent}px`
			: '0px';

		const fontFamily = `font-family: ${appliedSettings.fontFamily} !important;`;
		const fontSize = `font-size: ${appliedSettings.fontSize}px !important;`;
		const fontWeight = `font-weight: ${appliedSettings.fontWeight} !important;`;
		const lineHeight = `line-height: ${appliedSettings.lineHeight} !important;`;
		const letterSpacing = `letter-spacing: ${appliedSettings.letterSpacing}px !important;`;
		const textIndent = `text-indent: ${textIndentStyle} !important;`;
		const color = `color: ${appliedSettings.textColor} !important;`;
		const backgroundColor = `background-color: ${appliedSettings.backgroundColor} !important;`;
		const padding = `padding: ${appliedSettings.padding}px !important;`;
		const margin = 'margin: 0 auto !important;';
		const textAlign = `text-align: ${textAlignStyle} !important;`;
		const style = `${fontFamily} ${fontSize} ${fontWeight} ${lineHeight} ${letterSpacing} ${textIndent} ${color} ${backgroundColor} ${padding} ${margin} ${textAlign}`;

		element.setAttribute('style', style);
	};

	const setContent = (element: Element) => {
		const content = element.textContent;
		if (!content) return;
		const replacedContent = replaceUnicodeRange(content);
		element.textContent = replacedContent;
	};

	const hideElements = (
		selectors: string,
		config: boolean,
		display = 'block',
	) => {
		const selector = document.querySelector(selectors);
		if (!selector) return;
		const displayStyle = config ? 'none' : display;
		selector.setAttribute('style', `display: ${displayStyle} !important;`);
	};

	const unicodeMap = {
		'\u0E65': 'ก',
		'\u0E66': 'ข',
		'\u0E67': 'ฃ',
		'\u0E68': 'ค',
		'\u0E69': 'ฅ',
		'\u0E6A': 'ฆ',
		'\u0E6B': 'ง',
		'\u0E6C': 'จ',
		'\u0E6D': 'ฉ',
		'\u0E6E': 'ช',
		'\u0E6F': 'ซ',
		'\u0E70': 'ฌ',
		'\u0E71': 'ญ',
		'\u0E72': 'ฎ',
		'\u0E73': 'ฏ',
		'\u0E74': 'ฐ',
		'\u0E75': 'ฑ',
		'\u0E76': 'ฒ',
		'\u0E77': 'ณ',
		'\u0E78': 'ด',
		'\u0E79': 'ต',
	};

	const replaceUnicodeRange = (input: string) => {
		return input.replace(
			/[\u0E65-\u0E79]/g,
			(match) => unicodeMap[match as keyof typeof unicodeMap] || match,
		);
	};

	// ใช้การตั้งค่าเมื่อ settings เปลี่ยนแปลง
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		applySettings(settings);
	}, [settings]);

	return { settings, updateSettings, resetToDefault };
};

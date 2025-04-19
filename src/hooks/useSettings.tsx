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
            if (appliedSettings.chnageHeaderColor) {
                header1.style.background = appliedSettings.backgroundColor;
            } else {
                header1.style.background = '#FFC22F';
            }
        }
    };

    const hookBanner = (appliedSettings: Settings) => {
        const banner = document.querySelector('#banner');
        if (!banner) return;
        const displayStyle = appliedSettings.hideAds ? 'none' : 'flex';
        banner.setAttribute('style', `display: ${displayStyle} !important;`);
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
        const button = document.querySelector('.scroll-to-top-btn');
        if (!button) return;
        const displayStyle = appliedSettings.hideScrollToTop ? 'none' : 'flex';
        button.setAttribute('style', `display: ${displayStyle} !important;`);
    };

    const hookMain = (appliedSettings: Settings) => {
        const main = document.querySelector('#content-area');
        if (!main) return;

        main.setAttribute('style', `background: ${appliedSettings.backgroundColor} !important;`);

        const others = document.querySelector('#novel_action_wrapper');
        if (!others) return;
        others.setAttribute('style', `background: ${appliedSettings.backgroundColor} !important;`);
    };

    const hookMainCenter = (appliedSettings: Settings) => {
        const mainCenter = document.querySelector('#main-center');
        if (!mainCenter) return;

        const width = appliedSettings.mainCenterFullWidth
            ? appliedSettings.contentWidth == 0
                ? '100%'
                : `${appliedSettings.contentWidth}px`
            : '987px';

        const widthStyle = `width: ${width} !important; max-width: ${width} !important;`;
        const backgroundColorStyle = `background-color: ${appliedSettings.backgroundColor} !important;`;
        const marginStyle = `margin: 0 auto !important;`;
        const style = `${widthStyle} ${backgroundColorStyle} ${marginStyle}`;
        mainCenter.setAttribute('style', style);
    };

    const hookStoryContent = (appliedSettings: Settings) => {
        const storyContent = document.querySelector('#story-content');
        if (!storyContent) return;
        const width = appliedSettings.contentWidth == 0 ? '100%' : `${appliedSettings.contentWidth}px`;

        const widthStyle = `width: ${width} !important; max-width: ${width} !important;`;
        const backgroundColorStyle = `background-color: ${appliedSettings.backgroundColor} !important;`;
        const marginStyle = `margin: 0 auto !important;`;
        const style = `${widthStyle} ${backgroundColorStyle} ${marginStyle}`;
        storyContent.setAttribute('style', style);
    };

    const hookContent = (appliedSettings: Settings) => {
        const contentElements = document.querySelectorAll('#story-content *');
        if (!contentElements) return;
        contentElements.forEach((el) => {
            setStyle(el, appliedSettings);
        });
    };

    const applySettings = (appliedSettings: Settings) => {
        hookHeader(appliedSettings);
        hookBanner(appliedSettings);
        hookFooter(appliedSettings);
        hookScrollToTop(appliedSettings);
        hookMain(appliedSettings);
        hookMainCenter(appliedSettings);
        hookStoryContent(appliedSettings);
        hookContent(appliedSettings);
    };

    const setStyle = (element: Element, appliedSettings: Settings) => {
        const isIndentA = element.classList.contains('indent-a');
        const textAlignStyle = isIndentA ? (appliedSettings.justifyText ? 'justify' : 'left') : 'center';
        const textIndentStyle = isIndentA ? `${appliedSettings.textIndent}px` : '0px';

        const fontSize = `font-size: ${appliedSettings.fontSize}px !important;`;
        const lineHeight = `line-height: ${appliedSettings.lineHeight} !important;`;
        const letterSpacing = `letter-spacing: ${appliedSettings.letterSpacing}px !important;`;
        const textIndent = `text-indent: ${textIndentStyle} !important;`;
        const color = `color: ${appliedSettings.textColor} !important;`;
        const backgroundColor = `background-color: ${appliedSettings.backgroundColor} !important;`;
        const padding = `padding: ${appliedSettings.padding}px !important;`;
        const margin = 'margin: 0 auto !important;';
        const textAlign = `text-align: ${textAlignStyle} !important;`;
        const style = `${fontSize} ${lineHeight} ${letterSpacing} ${textIndent} ${color} ${backgroundColor} ${padding} ${margin} ${textAlign}`;

        element.setAttribute('style', style);
    };

    // ใช้การตั้งค่าเมื่อ settings เปลี่ยนแปลง
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        applySettings(settings);
    }, [settings]);

    return { settings, updateSettings, resetToDefault };
};

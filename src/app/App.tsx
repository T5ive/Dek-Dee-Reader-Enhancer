import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ButtonSetting } from '../components/ui/buttons/buttonSetting';
import { SettingsPanel } from '../components/layouts/SettingsPanel';
import { useSettings } from '../hooks/useSettings';
import { useDekDElement } from '../hooks/useDekDElement';

export const App: React.FC = () => {
	const [showSettings, setShowSettings] = useState(false);
	const { settings, updateSettings, resetToDefault } = useSettings();
	const { headerElement, contentElement } = useDekDElement();

	useEffect(() => {
		if (!headerElement) return;

		const fontSizePopup = document.getElementById('font-size-popup');
		if (!fontSizePopup) return;

		let settingButtonWrapper = document.getElementById(
			'dek-d-reader-settings-button',
		) as HTMLElement;
		if (!settingButtonWrapper) {
			settingButtonWrapper = document.createElement('div');
			settingButtonWrapper.id = 'dek-d-reader-settings-button';
			settingButtonWrapper.className = 'box-icon-header-font';
			fontSizePopup.parentNode?.insertBefore(
				settingButtonWrapper,
				fontSizePopup.nextSibling,
			);
		}

		const toggleSettings = () => setShowSettings((prev) => !prev);

		const buttonContainer = document.createElement('div');
		settingButtonWrapper.appendChild(buttonContainer);
		const root = ReactDOM.createRoot(buttonContainer);
		root.render(
			<ButtonSetting btnColor={settings.textColor} onClick={toggleSettings} />,
		);

		return () => {
			root.unmount();
			settingButtonWrapper.remove();
		};
	}, [headerElement, settings.textColor]);

	return (
		<>
			{showSettings && (
				<SettingsPanel
					settings={settings}
					updateSettings={updateSettings}
					resetToDefault={resetToDefault}
					onClose={() => setShowSettings(false)}
				/>
			)}
		</>
	);
};

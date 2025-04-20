import React, { useState } from 'react';
import { Settings } from '../types/settings';
import { saveToStorage, loadFromStorage } from '../utils/storage';

interface ThemeItem {
	id: string;
	name: string;
	settings: Settings;
}

interface ThemeManagerProps {
	currentSettings: Settings;
	applySettings: (settings: Settings) => void;
}

export const ThemeManager: React.FC<ThemeManagerProps> = ({
	currentSettings,
	applySettings,
}) => {
	const [themeName, setThemeName] = useState('');
	const [themes, setThemes] = useState<ThemeItem[]>(() => {
		const savedThemes = loadFromStorage<ThemeItem[]>('dek-d-reader-themes');
		return savedThemes || [];
	});

	const saveTheme = () => {
		if (!themeName.trim()) {
			alert('กรุณาระบุชื่อธีม');
			return;
		}

		let isOverwrite = false;
		let themeId: string | undefined;
		if (themes.some((theme) => theme.name === themeName.trim())) {
			if (!window.confirm('ชื่อธีมนี้มีอยู่แล้ว คุณแน่ใจว่าต้องการแทนที่?')) return;
			isOverwrite = true;
			themeId = themes.find((theme) => theme.name === themeName.trim())?.id;
		}

		const existingTheme = themes.find((theme) => isSameSettings(theme));
		if (existingTheme) {
			if (!isOverwrite) alert('ธีมนี้มีอยู่แล้ว กรุณาใช้ธีมที่แตกต่างกัน');
			return;
		}

		const id = themeId ?? Date.now().toString();
		const newTheme: ThemeItem = {
			id: id,
			name: themeName.trim(),
			settings: { ...currentSettings, id: id },
		};
	
		const filteredThemes = isOverwrite
			? themes.filter((theme) => theme.name !== themeName.trim())
			: themes;
	
		const updatedThemes = [...filteredThemes, newTheme];
		setThemes(updatedThemes);
		saveToStorage('dek-d-reader-themes', updatedThemes);
		setThemeName('');
	};

	const loadTheme = (theme: ThemeItem) => {
		applySettings(theme.settings);
	};

	const deleteTheme = (id: string) => {
		if (currentSettings.id === id) {
			alert('ไม่สามารถลบธีมที่กำลังใช้งานอยู่ได้');
			return;
		}
		if (!window.confirm('คุณแน่ใจว่าต้องการลบธีมนี้?')) return;

		const updatedThemes = themes.filter((theme) => theme.id !== id);
		setThemes(updatedThemes);
		saveToStorage('dek-d-reader-themes', updatedThemes);
	};

	const isSameSettings = ({ settings }: ThemeItem): boolean => {
		const keys: (keyof Settings)[] = [
			'fontSize',
			'lineHeight',
			'letterSpacing',
			'textIndent',
			'backgroundColor',
			'textColor',
			'contentWidth',
			'padding',
			'justifyText',
			'chnageHeaderColor',
			'unfixHeader',
			'hideAds',
			'hideFooter',
			'hideScrollToTop',
			'mainCenterFullWidth',
		];

		return keys.every((key) => currentSettings[key] === settings[key]);
	};

	return (
		<div
			style={{
				marginTop: '16px',
				borderTop: '1px solid #eee',
				paddingTop: '16px',
			}}
		>
			<h3 style={{ fontSize: '16px', marginBottom: '12px' }}>จัดการธีม</h3>

			<div style={{ display: 'flex', marginBottom: '16px' }}>
				<input
					type="text"
					value={themeName}
					onChange={(e) => setThemeName(e.target.value)}
					placeholder="ชื่อธีม"
					style={{
						flex: 1,
						padding: '8px',
						border: '1px solid #ddd',
						borderRadius: '4px',
						marginRight: '8px',
					}}
				/>
				<button
					type="button"
					onClick={saveTheme}
					style={{
						backgroundColor: '#1E90FF',
						color: '#fff',
						border: 'none',
						borderRadius: '4px',
						padding: '8px 16px',
						cursor: 'pointer',
					}}
				>
					บันทึกธีม
				</button>
			</div>

			{themes.length > 0 ? (
				<div>
					<h4 style={{ fontSize: '14px', marginBottom: '8px' }}>ธีมที่บันทึกไว้</h4>
					<div style={{ maxHeight: '150px', overflowY: 'auto' }}>
						{themes.map((theme) => (
							<div
								key={theme.id}
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									padding: '8px',
									backgroundColor: '#f5f5f5',
									borderRadius: '4px',
									marginBottom: '4px',
									borderWidth: '2px',
									borderStyle: 'solid',
									borderColor: isSameSettings(theme) ? '#1E90FF' : '#ddd',
								}}
							>
								<span>{theme.name}</span>
								<div>
									<button
										type="button"
										onClick={() => loadTheme(theme)}
										style={{
											backgroundColor: '#1E90FF',
											color: '#fff',
											border: 'none',
											borderRadius: '4px',
											padding: '4px 8px',
											marginRight: '4px',
											fontSize: '12px',
											cursor: 'pointer',
										}}
									>
										ใช้งาน
									</button>
									<button
										type="button"
										onClick={() => deleteTheme(theme.id)}
										style={{
											backgroundColor: '#ff5252',
											color: '#fff',
											border: 'none',
											borderRadius: '4px',
											padding: '4px 8px',
											fontSize: '12px',
											cursor: 'pointer',
										}}
									>
										ลบ
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			) : (
				<p style={{ fontSize: '14px', color: '#777' }}>ยังไม่มีธีมที่บันทึกไว้</p>
			)}
		</div>
	);
};

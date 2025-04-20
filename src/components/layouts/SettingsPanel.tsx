import React, { useRef, useState } from 'react';
import { Settings } from '../../types/settings';
import { InputRange } from '../ui/inputs/intputRange';
import { InputColor } from '../ui/inputs/inputColor';
import { ButtonTab } from '../ui/buttons/buttonTab';
import { ButtonColor } from '../ui/buttons/buttonColor';
import { ThemeManager } from '../../features/themeManager';
import { InputNumber } from '../ui/inputs/inputNumber';
import styled from 'styled-components';
import { Select } from '../ui/inputs/select';

interface SettingsPanelProps {
	settings: Settings;
	updateSettings: (newSettings: Partial<Settings>) => void;
	resetToDefault: () => void;
	onClose: () => void;
}

const SettingPanel = styled.div`
	position: fixed;
	top: 100px;
	right: 100px;
	width: 400px;
	background-color: #fff;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
	border-radius: 8px;
	z-index: 9999;
	padding: 16px;
	font-family: 'Sarabun', sans-serif;
	font-size: 16px;

	@media (max-width: 768px) {
		top: 16px;
		right: 16px;
		left: 16px;
		width: auto;
		padding: 12px;
		font-size: 15px;
	}
`;

//TODO: แยกแถบการตั้งค่าออกเป็นคอมโพเนนต์ย่อย
export const SettingsPanel: React.FC<SettingsPanelProps> = ({
	settings,
	updateSettings,
	resetToDefault,
	onClose,
}) => {
	const [activeTab, setActiveTab] = useState<
		'general' | 'text' | 'layout' | 'color' | 'themes'
	>('general');

	const fontOptions = [
		{ value: 'THSarabunNew_content', label: 'THSarabunNew' },
		{ value: 'Sarabun_content', label: 'Sarabun' },
		{ value: 'Mali_content', label: 'Mali' },
		{ value: 'Trirong_content', label: 'Trirong' },
		{ value: 'Maitree_content', label: 'Maitree' },
		{ value: 'Taviraj_content', label: 'Taviraj' },
		{ value: 'Kodchasan_content', label: 'Kodchasan' },
		{ value: 'ChakraPetch_content', label: 'ChakraPetch' },
	];

	const defaultSettingsRef = useRef<Settings>(settings);

	const handleReset = () => {
		if (window.confirm('คุณต้องการรีเซ็ตการตั้งค่าทั้งหมดเป็นค่าเริ่มต้นหรือไม่?')) {
			resetToDefault();
		}
	};

	const predefinedThemes = [
		{ bg: '#ffffff', text: '#000000', label: 'ขาว-ดำ (มาตรฐาน)' },
		{ bg: '#f8f7f1', text: '#333333', label: 'สีกระดาษ' },
		{ bg: '#282c35', text: '#ffffff', label: 'โหมดกลางคืน' },
		{ bg: '#0a1929', text: '#e6f0ff', label: 'น้ำเงินเข้ม' },
		{ bg: '#2d2d2d', text: '#e0e0e0', label: 'สีเทาเข้ม' },
		{ bg: '#f0e6d6', text: '#5b4636', label: 'สีซีเปีย' },
	];

	return (
		<SettingPanel>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginBottom: '16px',
				}}
			>
				<h2 style={{ margin: 0, fontSize: '18px' }}>การตั้งค่าการแสดงผล</h2>
				<button
					type="button"
					onClick={onClose}
					style={{
						background: 'none',
						border: 'none',
						cursor: 'pointer',
						fontSize: '20px',
					}}
				>
					✕
				</button>
			</div>

			<div
				style={{
					display: 'flex',
					marginBottom: '16px',
					borderBottom: '1px solid #eee',
				}}
			>
				<ButtonTab
					active={activeTab === 'general'}
					onClick={() => setActiveTab('general')}
					label="ทั่วไป"
				/>
				<ButtonTab
					active={activeTab === 'text'}
					onClick={() => setActiveTab('text')}
					label="ข้อความ"
				/>
				<ButtonTab
					active={activeTab === 'layout'}
					onClick={() => setActiveTab('layout')}
					label="เค้าโครง"
				/>
				<ButtonTab
					active={activeTab === 'color'}
					onClick={() => setActiveTab('color')}
					label="สี"
				/>
				<ButtonTab
					active={activeTab === 'themes'}
					onClick={() => setActiveTab('themes')}
					label="ธีม"
				/>
			</div>

			{activeTab === 'general' && (
				<div>
					<div style={{ marginBottom: '16px' }}>
						<label
							style={{
								display: 'flex',
								alignItems: 'center',
								cursor: 'pointer',
							}}
						>
							<input
								type="checkbox"
								checked={settings.chnageHeaderColor}
								onChange={(e) =>
									updateSettings({ chnageHeaderColor: e.target.checked })
								}
								style={{ marginRight: '8px' }}
							/>
							เปลี่ยนสี Header
						</label>
					</div>
					<div style={{ marginBottom: '16px' }}>
						<label
							style={{
								display: 'flex',
								alignItems: 'center',
								cursor: 'pointer',
							}}
						>
							<input
								type="checkbox"
								checked={settings.unfixHeader}
								onChange={(e) =>
									updateSettings({ unfixHeader: e.target.checked })
								}
								style={{ marginRight: '8px' }}
							/>
							ซ่อน Header เวลาเลื่อนขึ้น/ลง
						</label>
					</div>
					<div style={{ marginBottom: '16px' }}>
						<label
							style={{
								display: 'flex',
								alignItems: 'center',
								cursor: 'pointer',
							}}
						>
							<input
								type="checkbox"
								checked={settings.hideAds}
								onChange={(e) => updateSettings({ hideAds: e.target.checked })}
								style={{ marginRight: '8px' }}
							/>
							ซ่อนแบนเนอร์โฆษณา
						</label>
					</div>
					<div style={{ marginBottom: '16px' }}>
						<label
							style={{
								display: 'flex',
								alignItems: 'center',
								cursor: 'pointer',
							}}
						>
							<input
								type="checkbox"
								checked={settings.hideFooter}
								onChange={(e) =>
									updateSettings({ hideFooter: e.target.checked })
								}
								style={{ marginRight: '8px' }}
							/>
							ซ่อน Footer เวลาเลื่อนขึ้น/ลง
						</label>
					</div>
					<div style={{ marginBottom: '16px' }}>
						<label
							style={{
								display: 'flex',
								alignItems: 'center',
								cursor: 'pointer',
							}}
						>
							<input
								type="checkbox"
								checked={settings.hideScrollToTop}
								onChange={(e) =>
									updateSettings({ hideScrollToTop: e.target.checked })
								}
								style={{ marginRight: '8px' }}
							/>
							ซ่อน Scoll To Top เวลาเลื่อนขึ้น/ลง
						</label>
					</div>

					<div style={{ marginBottom: '16px' }}>
						<label
							style={{
								display: 'flex',
								alignItems: 'center',
								cursor: 'pointer',
							}}
						>
							<input
								type="checkbox"
								checked={settings.hideSuggestList}
								onChange={(e) =>
									updateSettings({ hideSuggestList: e.target.checked })
								}
								style={{ marginRight: '8px' }}
							/>
							ซ่อน แนะนำนิยาย
						</label>
					</div>

					<div style={{ marginBottom: '16px' }}>
						<label
							style={{
								display: 'flex',
								alignItems: 'center',
								cursor: 'pointer',
							}}
						>
							<input
								type="checkbox"
								checked={settings.hideDiscountList}
								onChange={(e) =>
									updateSettings({ hideDiscountList: e.target.checked })
								}
								style={{ marginRight: '8px' }}
							/>
							ซ่อน อีบุ๊กลดราคา
						</label>
					</div>

					<div style={{ marginBottom: '16px' }}>
						<label
							style={{
								display: 'flex',
								alignItems: 'center',
								cursor: 'pointer',
							}}
						>
							<input
								type="checkbox"
								checked={settings.hideComment}
								onChange={(e) =>
									updateSettings({ hideComment: e.target.checked })
								}
								style={{ marginRight: '8px' }}
							/>
							ซ่อน ความคิดเห็น
						</label>
					</div>

					<div style={{ marginTop: '16px', textAlign: 'center' }}>
						<button
							type="button"
							onClick={handleReset}
							style={{
								backgroundColor: '#ff5252',
								color: '#fff',
								border: '1px solid #ddd',
								borderRadius: '4px',
								padding: '8px 16px',
								cursor: 'pointer',
								fontSize: '14px',
							}}
						>
							รีเซ็ตเป็นค่าเริ่มต้น
						</button>
					</div>
				</div>
			)}

			{activeTab === 'text' && (
				<div>
					<div style={{ marginBottom: '16px' }}>
						<label style={{ display: 'block', marginBottom: '8px' }}>
							รูปแบบตัวอักษร
						</label>
						<Select
							value={settings.fontFamily}
							options={fontOptions}
							onChange={(value) => updateSettings({ fontFamily: value })}
						/>
					</div>
					<div style={{ marginBottom: '16px' }}>
						<label style={{ display: 'block', marginBottom: '8px' }}>
							ขนาดตัวอักษร: {settings.fontSize}px
						</label>
						<InputRange
							min={12}
							max={128}
							step={1}
							value={settings.fontSize}
							onChange={(value) => updateSettings({ fontSize: value })}
						/>
					</div>

					<div style={{ marginBottom: '16px' }}>
						<label style={{ display: 'block', marginBottom: '8px' }}>
							ความหนาตัวอักษร: {settings.fontWeight}
						</label>
						<InputNumber
							min={400}
							max={600}
							step={200}
							value={settings.fontWeight}
							onChange={(value) => updateSettings({ fontWeight: value })}
						/>
					</div>

					<div style={{ marginBottom: '16px' }}>
						<label style={{ display: 'block', marginBottom: '8px' }}>
							ระยะห่างบรรทัด: {settings.lineHeight}
						</label>
						<InputRange
							min={1}
							max={3}
							step={0.1}
							value={settings.lineHeight}
							onChange={(value) => updateSettings({ lineHeight: value })}
						/>
					</div>

					<div style={{ marginBottom: '16px' }}>
						<label style={{ display: 'block', marginBottom: '8px' }}>
							ระยะห่างตัวอักษร: {settings.letterSpacing}px
						</label>
						<InputRange
							min={0}
							max={2}
							step={0.1}
							value={settings.letterSpacing}
							onChange={(value) => updateSettings({ letterSpacing: value })}
						/>
					</div>

					<div style={{ marginBottom: '16px' }}>
						<label style={{ display: 'block', marginBottom: '8px' }}>
							เยื้องข้อความ: {settings.textIndent}px
						</label>
						<InputRange
							min={0}
							max={100}
							step={1}
							value={settings.textIndent}
							onChange={(value) => updateSettings({ textIndent: value })}
						/>
					</div>

					<div style={{ marginBottom: '16px' }}>
						<label
							style={{
								display: 'flex',
								alignItems: 'center',
								cursor: 'pointer',
							}}
						>
							<input
								type="checkbox"
								checked={settings.justifyText}
								onChange={(e) =>
									updateSettings({ justifyText: e.target.checked })
								}
								style={{ marginRight: '8px' }}
							/>
							จัดข้อความชิดขอบทั้งสองด้าน
						</label>
					</div>
				</div>
			)}

			{activeTab === 'layout' && (
				<div>
					<div style={{ marginBottom: '16px' }}>
						<label style={{ display: 'block', marginBottom: '8px' }}>
							ความกว้างเนื้อหา:{' '}
							{settings.contentWidth === 0
								? '100%'
								: `${settings.contentWidth}px`}
						</label>
						<InputRange
							min={0}
							max={3840}
							step={1}
							value={settings.contentWidth}
							onChange={(value) => updateSettings({ contentWidth: value })}
						/>
					</div>

					<div style={{ marginBottom: '16px' }}>
						<label style={{ display: 'block', marginBottom: '8px' }}>
							ระยะห่างขอบ: {settings.padding}px
						</label>
						<InputRange
							min={0}
							max={64}
							step={4}
							value={settings.padding}
							onChange={(value) => updateSettings({ padding: value })}
						/>
					</div>

					<div style={{ marginBottom: '16px' }}>
						<label
							style={{
								display: 'flex',
								alignItems: 'center',
								cursor: 'pointer',
							}}
						>
							<input
								type="checkbox"
								checked={settings.mainCenterFullWidth}
								onChange={(e) =>
									updateSettings({ mainCenterFullWidth: e.target.checked })
								}
								style={{ marginRight: '8px' }}
							/>
							แสดงเนื้อหาเต็มหน้าจอ
						</label>
					</div>
				</div>
			)}

			{activeTab === 'color' && (
				<div>
					<div style={{ marginBottom: '16px' }}>
						<label style={{ display: 'block', marginBottom: '8px' }}>ธีมสี</label>
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(3, 1fr)',
								gap: '0.5rem',
							}}
						>
							{predefinedThemes.map((theme) => {
								const isSelected =
									settings.backgroundColor === theme.bg &&
									settings.textColor === theme.text;

								return (
									<button
										type="button"
										key={theme.label}
										style={{
											height: '3rem',
											borderRadius: '0.25rem',
											borderWidth: '2px',
											borderStyle: 'solid',
											borderColor: isSelected ? '#3B82F6' : '#E5E7EB',
											backgroundColor: theme.bg,
										}}
										onClick={() =>
											updateSettings({
												backgroundColor: theme.bg,
												textColor: theme.text,
											})
										}
										title={theme.label}
									/>
								);
							})}
						</div>
					</div>

					<div style={{ marginBottom: '16px' }}>
						<label style={{ display: 'block', marginBottom: '8px' }}>
							สีพื้นหลัง
						</label>
						<InputColor
							value={settings.backgroundColor}
							onChange={(value) => updateSettings({ backgroundColor: value })}
						/>

						<div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
							{predefinedThemes.map((theme) => {
								return (
									<ButtonColor
										key={theme.label}
										color={theme.bg}
										isSelected={settings.backgroundColor === theme.bg}
										onClick={() =>
											updateSettings({
												backgroundColor: theme.bg,
											})
										}
									/>
								);
							})}
						</div>
					</div>

					<div style={{ marginBottom: '16px' }}>
						<label style={{ display: 'block', marginBottom: '8px' }}>
							สีข้อความ
						</label>
						<InputColor
							value={settings.textColor}
							onChange={(value) => updateSettings({ textColor: value })}
						/>

						<div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
							{predefinedThemes.map((theme) => {
								return (
									<ButtonColor
										key={theme.label}
										color={theme.text}
										isSelected={settings.textColor === theme.text}
										onClick={() =>
											updateSettings({
												textColor: theme.text,
											})
										}
									/>
								);
							})}
						</div>
					</div>
				</div>
			)}

			{activeTab === 'themes' && (
				<ThemeManager
					currentSettings={settings}
					applySettings={(newSettings) => updateSettings(newSettings)}
				/>
			)}

			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					marginTop: '16px',
				}}
			>
				<button
					type="button"
					onClick={() => {
						updateSettings({ ...defaultSettingsRef.current });
						onClose();
					}}
					style={{
						backgroundColor: '#f5f5f5',
						color: '#333',
						border: 'none',
						borderRadius: '4px',
						padding: '8px 16px',
						cursor: 'pointer',
					}}
				>
					ปิด
				</button>
				<button
					type="button"
					onClick={() => {
						updateSettings({ ...settings, id: Date.now().toString() });
						onClose();
					}}
					style={{
						backgroundColor: '#1E90FF',
						color: '#fff',
						border: 'none',
						borderRadius: '4px',
						padding: '8px 16px',
						cursor: 'pointer',
						marginLeft: '8px',
					}}
				>
					บันทึกการตั้งค่า
				</button>
			</div>
		</SettingPanel>
	);
};

import React, { useState } from 'react';
import { Settings } from '../types/settings';
import { defaultSettings } from '../config/defaultSettings';
import { ButtonSetting } from '../components/ui/buttons/buttonSetting';
import { SettingsPanel } from '../components/layouts/SettingsPanel';

export const Preview: React.FC = () => {
    const [showSettings, setShowSettings] = useState(false);
    const [settings, setSettings] = useState<Settings>(defaultSettings);

    const updateSettings = (newSettings: Partial<Settings>) => {
        setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
    };

    const resetToDefault = () => {
        setSettings(defaultSettings);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Sarabun, sans-serif' }}>
            <h1>ตัวอย่าง DekD Reader Enhancer</h1>

            <div style={{ marginBottom: '20px' }}>
                <ButtonSetting btnColor={settings.textColor} onClick={() => setShowSettings(true)} />
            </div>

            <div
                style={{
                    fontSize: `${settings.fontSize}px`,
                    lineHeight: settings.lineHeight,
                    letterSpacing: `${settings.letterSpacing}px`,
                    color: settings.textColor,
                    backgroundColor: settings.backgroundColor,
                    maxWidth: `${settings.contentWidth}px`,
                    padding: `${settings.padding}px`,
                    textAlign: settings.justifyText ? 'justify' : 'left',
                }}
            >
                <h2>ตัวอย่างเนื้อหา</h2>
                <p>
                    นี่คือตัวอย่างข้อความที่จะแสดงเมื่อใช้การตั้งค่าที่กำหนด คุณสามารถปรับแต่งรูปแบบต่างๆ เช่น
                    ขนาดตัวอักษร ระยะห่างบรรทัด สีพื้นหลัง และอื่นๆ ได้ตามต้องการ
                </p>
                <p>
                    เมื่อคุณเปลี่ยนการตั้งค่า คุณจะเห็นการเปลี่ยนแปลงในตัวอย่างนี้ทันที
                    ลองปรับแต่งดูและเลือกการตั้งค่าที่ทำให้คุณอ่านได้สบายตาที่สุด
                </p>
                <p>คุณสามารถบันทึกการตั้งค่าที่คุณชอบเป็นธีมได้ เพื่อใช้งานในครั้งถัดไปได้อย่างรวดเร็ว</p>
            </div>

            {showSettings && (
                <SettingsPanel
                    settings={settings}
                    updateSettings={updateSettings}
                    resetToDefault={resetToDefault}
                    onClose={() => setShowSettings(false)}
                />
            )}
        </div>
    );
};

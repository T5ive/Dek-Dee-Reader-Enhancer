/**
 * บันทึกข้อมูลลง localStorage
 * @param key คีย์สำหรับเก็บข้อมูล
 * @param data ข้อมูลที่ต้องการบันทึก
 */
export const saveToStorage = <T>(key: string, data: T): void => {
	try {
		localStorage.setItem(key, JSON.stringify(data));
	} catch (error) {
		console.error('Error saving to localStorage:', error);
	}
};

/**
 * โหลดข้อมูลจาก localStorage
 * @param key คีย์ที่ต้องการโหลดข้อมูล
 * @returns ข้อมูลที่โหลดได้ หรือ null ถ้าไม่พบข้อมูล
 */
export const loadFromStorage = <T>(key: string): T | null => {
	try {
		const data = localStorage.getItem(key);
		return data ? (JSON.parse(data) as T) : null;
	} catch (error) {
		console.error('Error loading from localStorage:', error);
		return null;
	}
};

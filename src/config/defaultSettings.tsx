import { Settings } from '../types/settings';

export const defaultSettings: Settings = {
	id: '',
	//General	
	changeHeaderColor: true,
	unfixHeader: true,
	hideAds: true,
	hideFooter: true,
	hideScrollToTop: true,
	hideSuggestList: true,
	hideDiscountList: true,
	hideComment: true,
	download: true,
	//Text
	fontFamily: 'THSarabunNew',
	fontSize: 18,
	fontWeight: 400,
	lineHeight: 1.5,
	letterSpacing: 0.5,
	textIndent: 50,
	justifyText: false,
	//Layout
	contentWidth: 800,
	mainCenterFullWidth: false,
	padding: 16,
	//Color	
	backgroundColor: '#ffffff',
	textColor: '#333333',
};

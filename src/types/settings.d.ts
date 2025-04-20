export interface Settings {
	id: string;
	//General
	changeHeaderColor: boolean;
	unfixHeader: boolean;
	hideAds: boolean;
	hideFooter: boolean;
	hideScrollToTop: boolean;
	hideSuggestList: boolean;
	hideDiscountList: boolean;
	hideComment: boolean;
	download: boolean;
	//Text
	fontFamily: string;
	fontSize: number;
	fontWeight: number;
	lineHeight: number;
	letterSpacing: number;
	textIndent: number;
	justifyText: boolean;
	//Layout
	contentWidth: number;
	padding: number;
	mainCenterFullWidth: boolean;
	//Color	
	backgroundColor: string;
	textColor: string;
}

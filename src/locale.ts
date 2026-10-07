/**
 * Button labels in the operator's language.
 *
 * GENERATED FILE — do not edit by hand. Regenerate with:
 *     python tools/gen-locale.py <path-to>/liveplay/client/locales
 *
 * Strings are lifted verbatim from the LivePlay client's own locale files
 * so a Companion button and the on-screen control it mirrors are worded
 * identically. The active locale comes from the server (`ui.locale` in the
 * state summary), so changing the language in LivePlay relabels the
 * Stream Deck too.
 *
 * "GO", "PANIC" and "LIMITER" stay in English on purpose: they are the
 * industry terms operators look for, and they fit a 72 px button in a way
 * the translated phrases do not.
 */

/** The label set every locale provides (English is the complete reference). */
export type LocaleStrings = {
	go: string
	panic: string
	limiter: string
	playNext: string
	stopAll: string
	upNext: string
	playing: string
	preview: string
	selectUp: string
	selectDown: string
	playSelected: string
	setAsNext: string
	showMode: string
	master: string
	slot: string
	pause: string
	resume: string
}

const EN: LocaleStrings = {
	go: 'GO',
	panic: 'PANIC',
	limiter: 'LIMITER',
	playNext: 'Play Next',
	stopAll: 'Stop All',
	upNext: 'Up Next',
	playing: 'Playing',
	preview: 'Preview',
	selectUp: 'Select Up',
	selectDown: 'Select Down',
	playSelected: 'Play Selected',
	setAsNext: 'Set As Next',
	showMode: 'Show Mode',
	master: 'Master',
	slot: 'Slot',
	pause: 'Pause',
	resume: 'Resume',
}

/** Per-locale overrides; anything missing falls back to English. */
const TABLES: Record<string, Partial<LocaleStrings>> = {
	ar: {
		playNext: 'تشغيل التالي',
		stopAll: 'إيقاف الكل',
		upNext: 'التالي',
		playing: 'قيد التشغيل',
		preview: 'معاينة',
		selectUp: 'اختيار للأعلى',
		selectDown: 'اختيار للأسفل',
		playSelected: 'تشغيل المحدد',
		setAsNext: 'تعيين كالتالي',
		showMode: 'وضع العرض',
		slot: 'الفتحة',
		pause: 'إيقاف مؤقت',
		resume: 'استئناف',
	},
	bn: {
		playNext: 'পরবর্তী চালান',
		stopAll: 'সব বন্ধ করুন',
		upNext: 'পরবর্তী',
		playing: 'চলছে',
		preview: 'পূর্বশ্রবণ',
		selectUp: 'উপরে নির্বাচন করুন',
		selectDown: 'নিচে নির্বাচন করুন',
		playSelected: 'নির্বাচিত চালান',
		setAsNext: 'পরবর্তী হিসেবে সেট করুন',
		showMode: 'শো মোড',
		slot: 'স্লট',
		pause: 'বিরতি',
		resume: 'পুনরায় শুরু',
	},
	de: {
		playNext: 'Nächstes abspielen',
		stopAll: 'Alles stoppen',
		upNext: 'Als Nächstes',
		playing: 'Wird gespielt',
		preview: 'Vorschau',
		selectUp: 'Nach oben auswählen',
		selectDown: 'Nach unten auswählen',
		playSelected: 'Ausgewähltes abspielen',
		setAsNext: 'Als Nächstes festlegen',
		showMode: 'Show-Modus',
		pause: 'Pausieren',
		resume: 'Fortsetzen',
	},
	el: {
		playNext: 'Αναπαραγωγή επόμενου',
		stopAll: 'Διακοπή όλων',
		upNext: 'Επόμενο',
		playing: 'Σε αναπαραγωγή',
		preview: 'Προεπισκόπηση',
		selectUp: 'Επιλογή πάνω',
		selectDown: 'Επιλογή κάτω',
		playSelected: 'Αναπαραγωγή επιλεγμένου',
		setAsNext: 'Ορισμός ως Επόμενο',
		showMode: 'Λειτουργία Παράστασης',
		slot: 'Θέση',
		pause: 'Παύση',
		resume: 'Συνέχιση',
	},
	es: {
		playNext: 'Reproducir siguiente',
		stopAll: 'Detener todo',
		upNext: 'A continuación',
		playing: 'Reproduciendo',
		preview: 'Vista previa',
		selectUp: 'Seleccionar arriba',
		selectDown: 'Seleccionar abajo',
		playSelected: 'Reproducir seleccionado',
		setAsNext: 'Establecer como siguiente',
		showMode: 'Modo Espectáculo',
		slot: 'Ranura',
		pause: 'Pausar',
		resume: 'Reanudar',
	},
	fa: {
		playNext: 'پخش بعدی',
		stopAll: 'توقف همه',
		upNext: 'بعدی',
		playing: 'در حال پخش',
		preview: 'پیش‌نمایش',
		selectUp: 'انتخاب بالا',
		selectDown: 'انتخاب پایین',
		playSelected: 'پخش انتخاب‌شده',
		setAsNext: 'تنظیم به عنوان بعدی',
		showMode: 'حالت نمایش',
		slot: 'اسلات',
		pause: 'مکث',
		resume: 'ادامه',
	},
	fr: {
		playNext: 'Lire le suivant',
		stopAll: 'Tout arrêter',
		upNext: 'Suivant',
		playing: 'En lecture',
		preview: 'Aperçu',
		selectUp: 'Sélectionner vers le haut',
		selectDown: 'Sélectionner vers le bas',
		playSelected: 'Lire la sélection',
		setAsNext: 'Définir comme suivant',
		showMode: 'Mode Spectacle',
		slot: 'Emplacement',
		resume: 'Reprendre',
	},
	hi: {
		playNext: 'अगला चलाएं',
		stopAll: 'सभी रोकें',
		upNext: 'अगला',
		playing: 'चल रहा है',
		preview: 'पूर्वावलोकन',
		selectUp: 'ऊपर चुनें',
		selectDown: 'नीचे चुनें',
		playSelected: 'चयनित चलाएं',
		setAsNext: 'अगले पर सेट करें',
		showMode: 'शो मोड',
		slot: 'स्लॉट',
		pause: 'रोकें',
		resume: 'फिर से शुरू करें',
	},
	it: {
		playNext: 'Riproduci successivo',
		stopAll: 'Ferma tutto',
		upNext: 'Prossimo',
		playing: 'In riproduzione',
		preview: 'Anteprima',
		selectUp: 'Seleziona su',
		selectDown: 'Seleziona giù',
		playSelected: 'Riproduci selezionato',
		setAsNext: 'Imposta come prossimo',
		showMode: 'Modalità Show',
		pause: 'Pausa',
		resume: 'Riprendi',
	},
	ja: {
		playNext: '次を再生',
		stopAll: 'すべて停止',
		upNext: '次へ',
		playing: '再生中',
		preview: 'プレビュー',
		selectUp: '上に選択',
		selectDown: '下に選択',
		playSelected: '選択を再生',
		setAsNext: '次に設定',
		showMode: 'ショーモード',
		slot: 'スロット',
		pause: '一時停止',
		resume: '再開',
	},
	ko: {
		playNext: '다음 재생',
		stopAll: '모두 중지',
		upNext: '다음',
		playing: '재생 중',
		preview: '미리 듣기',
		selectUp: '위로 선택',
		selectDown: '아래로 선택',
		playSelected: '선택 항목 재생',
		setAsNext: '다음으로 설정',
		showMode: '쇼 모드',
		slot: '슬롯',
		pause: '일시정지',
		resume: '재개',
	},
	no: {
		playNext: 'Spill neste',
		stopAll: 'Stopp alle',
		upNext: 'Neste',
		playing: 'Spiller av',
		preview: 'Forhåndsvisning',
		selectUp: 'Velg opp',
		selectDown: 'Velg ned',
		playSelected: 'Spill av valgt',
		setAsNext: 'Sett som neste',
		showMode: 'Show-modus',
		slot: 'Spor',
		resume: 'Fortsett',
	},
	pt: {
		playNext: 'Reproduzir próximo',
		stopAll: 'Parar tudo',
		upNext: 'A seguir',
		playing: 'A reproduzir',
		preview: 'Pré-visualização',
		selectUp: 'Selecionar acima',
		selectDown: 'Selecionar abaixo',
		playSelected: 'Reproduzir selecionado',
		setAsNext: 'Definir como próximo',
		showMode: 'Modo Show',
		pause: 'Pausar',
		resume: 'Retomar',
	},
	ro: {
		playNext: 'Redare următorul',
		stopAll: 'Oprire tot',
		upNext: 'Următor',
		playing: 'Se redă',
		preview: 'Previzualizare',
		selectUp: 'Selectare sus',
		selectDown: 'Selectare jos',
		playSelected: 'Redare selectat',
		setAsNext: 'Setează ca următor',
		showMode: 'Mod Spectacol',
		pause: 'Pauză',
		resume: 'Reia',
	},
	ru: {
		playNext: 'Следующий трек',
		stopAll: 'Остановить всё',
		upNext: 'Следующий',
		playing: 'Воспроизводится',
		preview: 'Предпросмотр',
		selectUp: 'Выбрать выше',
		selectDown: 'Выбрать ниже',
		playSelected: 'Воспроизвести выбранное',
		setAsNext: 'Поставить следующим',
		showMode: 'Режим показа',
		slot: 'Слот',
		pause: 'Пауза',
		resume: 'Возобновить',
	},
	sq: {
		playNext: 'Luaj të ardhshmen',
		stopAll: 'Ndalo të gjitha',
		upNext: 'Tjetri',
		playing: 'Duke luajtur',
		preview: 'Paraparim',
		selectUp: 'Zgjidh lart',
		selectDown: 'Zgjidh poshtë',
		playSelected: 'Luaj të zgjedhurën',
		setAsNext: 'Vendos si tjetrin',
		showMode: 'Modaliteti Shfaqje',
		pause: 'Pushim',
		resume: 'Vazhdo',
	},
	sv: {
		playNext: 'Spela nästa',
		stopAll: 'Stoppa alla',
		upNext: 'Nästa',
		playing: 'Spelas',
		preview: 'Förhandsgranskning',
		selectUp: 'Välj uppåt',
		selectDown: 'Välj nedåt',
		playSelected: 'Spela valt',
		setAsNext: 'Ange som nästa',
		showMode: 'Föreställningsläge',
		slot: 'Plats',
		pause: 'Pausa',
		resume: 'Återuppta',
	},
	tr: {
		playNext: 'Sonrakini oynat',
		stopAll: 'Tümünü durdur',
		upNext: 'Sıradaki',
		playing: 'Çalıyor',
		preview: 'Ön İzleme',
		selectUp: 'Yukarı seç',
		selectDown: 'Aşağı seç',
		playSelected: 'Seçileni oynat',
		setAsNext: 'Sonraki olarak ayarla',
		showMode: 'Gösteri Modu',
		pause: 'Duraklat',
		resume: 'Devam Et',
	},
	ur: {
		playNext: 'اگلا چلائیں',
		stopAll: 'سب بند کریں',
		upNext: 'اگلا',
		playing: 'چل رہا ہے',
		preview: 'پیش نظارہ',
		selectUp: 'اوپر منتخب کریں',
		selectDown: 'نیچے منتخب کریں',
		playSelected: 'منتخب کو چلائیں',
		setAsNext: 'اگلے کے طور پر سیٹ کریں',
		showMode: 'شو موڈ',
		slot: 'سلاٹ',
		pause: 'روکیں',
		resume: 'دوبارہ شروع کریں',
	},
	zh: {
		playNext: '播放下一首',
		stopAll: '全部停止',
		upNext: '下一个',
		playing: '正在播放',
		preview: '预听中',
		selectUp: '向上选择',
		selectDown: '向下选择',
		playSelected: '播放所选',
		setAsNext: '设为下一个',
		showMode: '演出模式',
		slot: '槽位',
		pause: '暂停',
		resume: '恢复',
	},
}

/** Locale codes this module can label buttons in. */
export const SUPPORTED_LOCALES = [
	'en',
	'ar',
	'bn',
	'de',
	'el',
	'es',
	'fa',
	'fr',
	'hi',
	'it',
	'ja',
	'ko',
	'no',
	'pt',
	'ro',
	'ru',
	'sq',
	'sv',
	'tr',
	'ur',
	'zh',
] as const

/**
 * Label lookup for a locale code. Unknown codes (and the bare-language
 * prefix of a regional code, e.g. "pt-BR") degrade to English rather than
 * showing raw keys on a button mid-show.
 */
export function strings(locale: string | undefined): LocaleStrings {
	if (!locale) return EN
	// hasOwn, not a bare lookup: the locale code comes from the server, and
	// inherited names like "constructor" must not resolve to a table.
	if (Object.hasOwn(TABLES, locale)) return { ...EN, ...TABLES[locale] }
	const base = locale.split(/[-_]/)[0].toLowerCase()
	if (Object.hasOwn(TABLES, base)) return { ...EN, ...TABLES[base] }
	return EN
}

export const API_BASE_LINK = "https://www.googleapis.com/books/v1/volumes";

export const MAX_RESULTS = 16;

export interface ILanguage {
  value: string;
  label: string;
}

export const languagesList: ILanguage[] = [
  {
    value: "aa",
    label: "Afar",
  },
  {
    value: "ab",
    label: "Аҧсуа",
  },
  {
    value: "af",
    label: "Afrikaans",
  },
  {
    value: "ak",
    label: "Akana",
  },
  {
    value: "am",
    label: "አማርኛ",
  },
  {
    value: "an",
    label: "Aragonés",
  },
  {
    value: "ar",
    label: "العربية",
  },
  {
    value: "as",
    label: "অসমীয়া",
  },
  {
    value: "av",
    label: "Авар",
  },
  {
    value: "ay",
    label: "Aymar",
  },
  {
    value: "az",
    label: "Azərbaycanca / آذربايجان",
  },
  {
    value: "ba",
    label: "Башҡорт",
  },
  {
    value: "be",
    label: "Беларуская",
  },
  {
    value: "bg",
    label: "Български",
  },
  {
    value: "bh",
    label: "भोजपुरी",
  },
  {
    value: "bi",
    label: "Bislama",
  },
  {
    value: "bm",
    label: "Bamanankan",
  },
  {
    value: "bn",
    label: "বাংলা",
  },
  {
    value: "bo",
    label: "བོད་ཡིག / Bod skad",
  },
  {
    value: "br",
    label: "Brezhoneg",
  },
  {
    value: "bs",
    label: "Bosanski",
  },
  {
    value: "ca",
    label: "Català",
  },
  {
    value: "ce",
    label: "Нохчийн",
  },
  {
    value: "ch",
    label: "Chamoru",
  },
  {
    value: "co",
    label: "Corsu",
  },
  {
    value: "cr",
    label: "Nehiyaw",
  },
  {
    value: "cs",
    label: "Česky",
  },
  {
    value: "cu",
    label: "словѣньскъ / slověnĭskŭ",
  },
  {
    value: "cv",
    label: "Чăваш",
  },
  {
    value: "cy",
    label: "Cymraeg",
  },
  {
    value: "da",
    label: "Dansk",
  },
  {
    value: "de",
    label: "Deutsch",
  },
  {
    value: "dv",
    label: "ދިވެހިބަސް",
  },
  {
    value: "dz",
    label: "ཇོང་ཁ",
  },
  {
    value: "ee",
    label: "Ɛʋɛ",
  },
  {
    value: "el",
    label: "Ελληνικά",
  },
  {
    value: "en",
    label: "English",
  },
  {
    value: "eo",
    label: "Esperanto",
  },
  {
    value: "es",
    label: "Español",
  },
  {
    value: "et",
    label: "Eesti",
  },
  {
    value: "eu",
    label: "Euskara",
  },
  {
    value: "fa",
    label: "فارسی",
  },
  {
    value: "ff",
    label: "Fulfulde",
  },
  {
    value: "fi",
    label: "Suomi",
  },
  {
    value: "fj",
    label: "Na Vosa Vakaviti",
  },
  {
    value: "fo",
    label: "Føroyskt",
  },
  {
    value: "fr",
    label: "Français",
  },
  {
    value: "fy",
    label: "Frysk",
  },
  {
    value: "ga",
    label: "Gaeilge",
  },
  {
    value: "gd",
    label: "Gàidhlig",
  },
  {
    value: "gl",
    label: "Galego",
  },
  {
    value: "gn",
    label: "Avañe'ẽ",
  },
  {
    value: "gu",
    label: "ગુજરાતી",
  },
  {
    value: "gv",
    label: "Gaelg",
  },
  {
    value: "ha",
    label: "هَوُسَ",
  },
  {
    value: "he",
    label: "עברית",
  },
  {
    value: "hi",
    label: "हिन्दी",
  },
  {
    value: "ho",
    label: "Hiri Motu",
  },
  {
    value: "hr",
    label: "Hrvatski",
  },
  {
    value: "ht",
    label: "Krèyol ayisyen",
  },
  {
    value: "hu",
    label: "Magyar",
  },
  {
    value: "hy",
    label: "Հայերեն",
  },
  {
    value: "hz",
    label: "Otsiherero",
  },
  {
    value: "ia",
    label: "Interlingua",
  },
  {
    value: "id",
    label: "Bahasa Indonesia",
  },
  {
    value: "ie",
    label: "Interlingue",
  },
  {
    value: "ig",
    label: "Igbo",
  },
  {
    value: "ii",
    label: "ꆇꉙ / 四川彝语",
  },
  {
    value: "ik",
    label: "Iñupiak",
  },
  {
    value: "io",
    label: "Ido",
  },
  {
    value: "is",
    label: "Íslenska",
  },
  {
    value: "it",
    label: "Italiano",
  },
  {
    value: "iu",
    label: "ᐃᓄᒃᑎᑐᑦ",
  },
  {
    value: "ja",
    label: "日本語",
  },
  {
    value: "jv",
    label: "Basa Jawa",
  },
  {
    value: "ka",
    label: "ქართული",
  },
  {
    value: "kg",
    label: "KiKongo",
  },
  {
    value: "ki",
    label: "Gĩkũyũ",
  },
  {
    value: "kj",
    label: "Kuanyama",
  },
  {
    value: "kk",
    label: "Қазақша",
  },
  {
    value: "kl",
    label: "Kalaallisut",
  },
  {
    value: "km",
    label: "ភាសាខ្មែរ",
  },
  {
    value: "kn",
    label: "ಕನ್ನಡ",
  },
  {
    value: "ko",
    label: "한국어",
  },
  {
    value: "kr",
    label: "Kanuri",
  },
  {
    value: "ks",
    label: "कश्मीरी / كشميري",
  },
  {
    value: "ku",
    label: "Kurdî / كوردی",
  },
  {
    value: "kv",
    label: "Коми",
  },
  {
    value: "kw",
    label: "Kernewek",
  },
  {
    value: "ky",
    label: "Kırgızca / Кыргызча",
  },
  {
    value: "la",
    label: "Latina",
  },
  {
    value: "lb",
    label: "Lëtzebuergesch",
  },
  {
    value: "lg",
    label: "Luganda",
  },
  {
    value: "li",
    label: "Limburgs",
  },
  {
    value: "ln",
    label: "Lingála",
  },
  {
    value: "lo",
    label: "ລາວ / Pha xa lao",
  },
  {
    value: "lt",
    label: "Lietuvių",
  },
  {
    value: "lu",
    label: "Tshiluba",
  },
  {
    value: "lv",
    label: "Latviešu",
  },
  {
    value: "mg",
    label: "Malagasy",
  },
  {
    value: "mh",
    label: "Kajin Majel / Ebon",
  },
  {
    value: "mi",
    label: "Māori",
  },
  {
    value: "mk",
    label: "Македонски",
  },
  {
    value: "ml",
    label: "മലയാളം",
  },
  {
    value: "mn",
    label: "Монгол",
  },
  {
    value: "mo",
    label: "Moldovenească",
  },
  {
    value: "mr",
    label: "मराठी",
  },
  {
    value: "ms",
    label: "Bahasa Melayu",
  },
  {
    value: "mt",
    label: "bil-Malti",
  },
  {
    value: "my",
    label: "မြန်မာစာ",
  },
  {
    value: "na",
    label: "Dorerin Naoero",
  },
  {
    value: "nb",
    label: "Norsk bokmål",
  },
  {
    value: "nd",
    label: "Sindebele",
  },
  {
    value: "ne",
    label: "नेपाली",
  },
  {
    value: "ng",
    label: "Oshiwambo",
  },
  {
    value: "nl",
    label: "Nederlands",
  },
  {
    value: "nn",
    label: "Norsk nynorsk",
  },
  {
    value: "no",
    label: "Norsk",
  },
  {
    value: "nr",
    label: "isiNdebele",
  },
  {
    value: "nv",
    label: "Diné bizaad",
  },
  {
    value: "ny",
    label: "Chi-Chewa",
  },
  {
    value: "oc",
    label: "Occitan",
  },
  {
    value: "oj",
    label: "ᐊᓂᔑᓈᐯᒧᐎᓐ / Anishinaabemowin",
  },
  {
    value: "om",
    label: "Oromoo",
  },
  {
    value: "or",
    label: "ଓଡ଼ିଆ",
  },
  {
    value: "os",
    label: "Иронау",
  },
  {
    value: "pa",
    label: "ਪੰਜਾਬੀ / पंजाबी / پنجابي",
  },
  {
    value: "pi",
    label: "Pāli / पाऴि",
  },
  {
    value: "pl",
    label: "Polski",
  },
  {
    value: "ps",
    label: "پښتو",
  },
  {
    value: "pt",
    label: "Português",
  },
  {
    value: "qu",
    label: "Runa Simi",
  },
  {
    value: "rm",
    label: "Rumantsch",
  },
  {
    value: "rn",
    label: "Kirundi",
  },
  {
    value: "ro",
    label: "Română",
  },
  {
    value: "ru",
    label: "Русский",
  },
  {
    value: "rw",
    label: "Kinyarwandi",
  },
  {
    value: "sa",
    label: "संस्कृतम्",
  },
  {
    value: "sc",
    label: "Sardu",
  },
  {
    value: "sd",
    label: "सिनधि",
  },
  {
    value: "se",
    label: "Sámegiella",
  },
  {
    value: "sg",
    label: "Sängö",
  },
  {
    value: "sh",
    label: "Srpskohrvatski / Српскохрватски",
  },
  {
    value: "si",
    label: "සිංහල",
  },
  {
    value: "sk",
    label: "Slovenčina",
  },
  {
    value: "sl",
    label: "Slovenščina",
  },
  {
    value: "sm",
    label: "Gagana Samoa",
  },
  {
    value: "sn",
    label: "chiShona",
  },
  {
    value: "so",
    label: "Soomaaliga",
  },
  {
    value: "sq",
    label: "Shqip",
  },
  {
    value: "sr",
    label: "Српски",
  },
  {
    value: "ss",
    label: "SiSwati",
  },
  {
    value: "st",
    label: "Sesotho",
  },
  {
    value: "su",
    label: "Basa Sunda",
  },
  {
    value: "sv",
    label: "Svenska",
  },
  {
    value: "sw",
    label: "Kiswahili",
  },
  {
    value: "ta",
    label: "தமிழ்",
  },
  {
    value: "te",
    label: "తెలుగు",
  },
  {
    value: "tg",
    label: "Тоҷикӣ",
  },
  {
    value: "th",
    label: "ไทย / Phasa Thai",
  },
  {
    value: "ti",
    label: "ትግርኛ",
  },
  {
    value: "tk",
    label: "Туркмен / تركمن",
  },
  {
    value: "tl",
    label: "Tagalog",
  },
  {
    value: "tn",
    label: "Setswana",
  },
  {
    value: "to",
    label: "Lea Faka-Tonga",
  },
  {
    value: "tr",
    label: "Türkçe",
  },
  {
    value: "ts",
    label: "Xitsonga",
  },
  {
    value: "tt",
    label: "Tatarça",
  },
  {
    value: "tw",
    label: "Twi",
  },
  {
    value: "ty",
    label: "Reo Mā`ohi",
  },
  {
    value: "ug",
    label: "Uyƣurqə / ئۇيغۇرچە",
  },
  {
    value: "uk",
    label: "Українська",
  },
  {
    value: "ur",
    label: "اردو",
  },
  {
    value: "uz",
    label: "Ўзбек",
  },
  {
    value: "ve",
    label: "Tshivenḓa",
  },
  {
    value: "vi",
    label: "Tiếng Việt",
  },
  {
    value: "vo",
    label: "Volapük",
  },
  {
    value: "wa",
    label: "Walon",
  },
  {
    value: "wo",
    label: "Wollof",
  },
  {
    value: "xh",
    label: "isiXhosa",
  },
  {
    value: "yi",
    label: "ייִדיש",
  },
  {
    value: "yo",
    label: "Yorùbá",
  },
  {
    value: "za",
    label: "Cuengh / Tôô / 壮语",
  },
  {
    value: "zh",
    label: "中文",
  },
  {
    value: "zu",
    label: "isiZulu",
  },
];

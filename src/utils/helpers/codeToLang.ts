import { languagesList } from "../constants";

export default function codeToLang(code: string) {
  const lang = languagesList.filter((lang) => lang.value === code)[0]?.label;

  return lang || "";
}

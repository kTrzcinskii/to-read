export default function transformDescription(text: string) {
  text = text.replaceAll("<br>", "");
  text = text.replaceAll("<b>", "");
  text = text.replaceAll("</b>", "");
  text = text.replaceAll("<i>", "");
  text = text.replaceAll("</i>", "");

  return text;
}

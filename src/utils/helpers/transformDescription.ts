export default function transformDescription(text: string) {
  text = text.replaceAll("<br>", "");
  text = text.replaceAll("<b>", "");
  text = text.replaceAll("</b>", "");
  text = text.replaceAll("<i>", "");
  text = text.replaceAll("</i>", "");
  text = text.replaceAll("<p>", "");
  text = text.replaceAll("</p>", "");
  text = text.replaceAll("<li>", "");
  text = text.replaceAll("</li>", "");
  text = text.replaceAll("<ul>", "");
  text = text.replaceAll("</ul>", "");

  return text;
}

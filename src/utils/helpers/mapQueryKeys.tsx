export default function mapQueryKeys(key: string) {
  switch (key) {
    case "author":
      return "inauthor";
    case "category":
      return "subject";
    case "publisher":
      return "inpublisher";
    case "title":
      return "intitle";
    default:
      return "";
  }
}

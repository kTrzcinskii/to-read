export default function getCardTitle(title: string) {
  if (title.length <= 24) {
    return title;
  }

  return title.slice(0, 21) + "...";
}

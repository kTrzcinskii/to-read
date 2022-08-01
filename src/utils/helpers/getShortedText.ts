export default function getCardTitle(title: string, maxLength: number) {
  if (title.length <= maxLength) {
    return title;
  }

  return title.slice(0, maxLength - 3) + "...";
}

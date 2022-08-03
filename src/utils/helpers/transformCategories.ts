export default function transformCategories(categories: string[]): string[] {
  const newCategories = categories
    .map((category) => {
      if (category.includes("/")) {
        return category.split("/");
      }
      return category;
    })
    .flat();

  //@ts-ignore
  const uniqCategories = [...new Set(newCategories)];

  return uniqCategories;
}

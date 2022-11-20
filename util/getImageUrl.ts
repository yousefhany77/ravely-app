export const getImageUrl = (
  url: string,
  size: "orginal" | "w300" | "w780" = "w300"
) => {
  return new URL(`https://image.tmdb.org/t/p/${size}${url}`).toString();
};

export const getImageUrl = (
  url: string,
  size: "original" | "w300" | "w780" = "w300"
) => {
  if (!url) return "/logo.png";
  return new URL(`https://image.tmdb.org/t/p/${size}${url}`).toString();
};

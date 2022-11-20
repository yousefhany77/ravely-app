export default function getSortmethoud(string: string): string {
  switch (string) {
    case "Most Popular":
      return "popularity.desc";
    case "Top Rated":
      return "vote_average.desc";

    case "Newest":
      return "release_date.desc";

    default:
      return "popularity.desc";
  }
}

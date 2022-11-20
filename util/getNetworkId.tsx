export default function getNetworkId(string: string): string {
  switch (string) {
    case "Netflix":
      return "213";
    case "AmazonPrime":
      return " 1024";
    case "Disney":
      return "2739";
    case "HBO":
      return " 49";
    default:
      return "";
  }
}

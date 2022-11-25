import {
  getDataListing,
  ListResponse,
  mediaType,
  listType,
} from "./../../util/getDataListing";
import type { NextApiRequest, NextApiResponse } from "next";
interface query {
  mediaType: mediaType;
  listType: listType;
  page: number;
  limit?: number;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListResponse>
) {
  const { mediaType, listType, page, limit }: Partial<query> = req.query;
  try {
    if (mediaType && listType) {
      const list = await getDataListing(mediaType, listType, page);
      if (limit) {
        list.results = list.results.slice(0, limit);
        return res.json(list);
      }
      return res.status(200).json(list);
    }
    // fallback if user does not have a query
    const movies = await getDataListing("movie", "trending", 1);
    const series = await getDataListing("series", "trending", 1);
    if (movies.total_results && series.total_results) {
      const list = {
        page: 1,
        results: [
          ...movies.results.slice(0, 10),
          ...series.results.slice(0, 10),
        ],
        total_pages: 0,
        total_results: 20,
      };
      return res.status(200).json(list);
    } else {
      return res.status(404);
    }
  } catch (error) {
    // @ts-ignore
    res.status(500).json({ statusCode: 500, message: error });
  }
}

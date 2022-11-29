import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { serialize } from "cookie";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Not authorized" });
  }

  res.setHeader("Set-Cookie", [
    serialize("session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    }),
    serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    }),
  ]);
  res.status(200).json({ message: "Success" });
}

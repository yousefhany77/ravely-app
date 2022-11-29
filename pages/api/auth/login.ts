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

  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  const token = req.headers.authorization?.split("Bearer")[1].trim();
  res.setHeader(
    "Set-Cookie",
    serialize("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: expiresIn,
      path: "/",
    })
  );
  res.status(200).json({ message: "Success" });
}

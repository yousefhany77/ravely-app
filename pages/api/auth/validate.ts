import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { adminAuth } from "../../../firebase/firebase-admin";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  adminAuth
    .verifyIdToken(req.body)
    .then(() => {
      return res.status(200).json({ message: "User is verified" });
    })
    .catch((error) => {
      return res.status(401).json({ message: error.message });
    });
}

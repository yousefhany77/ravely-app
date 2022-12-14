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
  function parseJwt(token: string) {
    try {
      const user = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString()
      );
      return user["user_id"];
    } catch (error) {
      console.log(error);
    }
  }
  const uid = parseJwt(req.body);
  console.log(uid);
  try {
    const user = await adminAuth.verifyIdToken(req.body);
    if (!user.email_verified) {
      return res.status(401).json({ message: "Email not verified" });
    }
    return res.status(200).json({ message: "success" });
  } catch (error:any) {
    // console.log(error);
    if (error.code === "auth/id-token-expired") {
      // console.log(error);
      return res.status(200).json({ message: "success" });
    }
    adminAuth.revokeRefreshTokens(uid).then(() => {
      console.log(uid, "revoked ⚠️👮");
    });
    return res.status(401).json({ message: "Unauthorized" });
  }
}

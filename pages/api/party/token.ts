import { RtcTokenBuilder, RtcRole } from "agora-access-token";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const appId = process.env.AGORA_APP_ID;
  const appCertificate = process.env.AGORA_APP_CERTIFICATE;
  const { partyId, uid } = JSON.parse(req.body);

  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 7200;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
  // Build token with uid
  const tokenA = RtcTokenBuilder.buildTokenWithUid(
    appId!,
    appCertificate!,
    partyId,
    uid,
    role,
    privilegeExpiredTs
  );
  console.log(`Token with  ${uid}: => ${tokenA}`);
  res.status(200).json({ token: tokenA });
}

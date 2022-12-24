import { createClient } from "agora-rtc-react";
import AgoraRTC, {
  IAgoraRTCRemoteUser as IRTCRemoteUser,
} from "agora-rtc-sdk-ng";

const appId = "14e76cd9ed784c6eaa45cfdd754681f6";
const token =
  "007eJxTYLgkd2a/+qZd4pmvJP8xcZ4yiv+y+NiyV5wPOh3FWEPnbTqtwGBokmpulpximZpibmGSbJaamGhimpyWkmJuamJmYZhmxrp7aXJDICMD7x1mZkYGCATxRRgKzb3dKkr9/TxLAlIK8/NdnJ3TMhgYALFDJSc=";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient({
  mode: "rtc",
  codec: "vp8",
});
export const useMicrophoneAudioTrack = AgoraRTC.createMicrophoneAudioTrack;
export type IAgoraRTCRemoteUser = IRTCRemoteUser;
export const channelName = "main";

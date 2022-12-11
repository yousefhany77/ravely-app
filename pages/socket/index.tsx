import VideoPlayer from "../../components/video/PremiumVideoPlayer";

function Index() {
  // init socket connection
  // join room
  return (
    <div>
      <VideoPlayer mediaType="mp4" src="/api/video" room="room" />
    </div>
  );
}

export default Index;

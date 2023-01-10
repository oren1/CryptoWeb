import React, {useEffect}from "react";
import "./App.css";

export default function VideoPlayer(props) {
  useEffect(() => {
    // 👇️ use document.getElementById()
    const video = document.getElementById("vid");
    video.play()
  }, []);

  return (
    <video id="vid" className="the-video" autoplay muted playsinline controls>
      <source src={props.url} type="video/mp4" />
      Sorry, your browser doesn't support videos.
    </video>
  );
}

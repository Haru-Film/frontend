import type { Timestamp } from "@/types/recording";
import { useEffect, useRef, useState } from "react";
import zoom_in_icon from "@/assets/icons/zoom_in_icon.svg";
import zoom_out_icon from "@/assets/icons/zoom_out_icon.svg";
import { cn } from "@/lib/utils";
import type { SeekCommand } from "../types/recording";

interface VideoPlayerProps {
  videoUrl: string;
  timestamps: Timestamp[];
  seekCommand?: SeekCommand | null;
  className?: string;
}

export function VideoPlayer({
  videoUrl,
  timestamps,
  seekCommand,
  className,
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [currentSubtitle, setCurrentSubtitle] = useState<string>("");

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    const index = seekCommand?.timestampIndex;

    if (
      index !== undefined &&
      index !== null &&
      index >= 0 &&
      index < timestamps.length
    ) {
      videoRef.current.currentTime = timestamps[index]?.time ?? 0;
      videoRef.current.play();
    }
  }, [seekCommand, timestamps]);

  const toggleFullScreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const activeTimestamp = [...timestamps]
      .reverse()
      .find((t) => t.time <= videoRef.current!.currentTime);
    if (activeTimestamp) {
      setCurrentSubtitle(activeTimestamp.label);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative flex items-center justify-center overflow-hidden bg-black",
        className,
      )}
    >
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        className="aspect-video w-full object-contain [&::-webkit-media-controls-fullscreen-button]:hidden"
        playsInline
        onTimeUpdate={handleTimeUpdate}
      />

      <button
        onClick={toggleFullScreen}
        className="absolute top-4 right-4 z-10 cursor-pointer rounded-full bg-black/40 p-2 text-white opacity-0 transition group-hover:opacity-100 hover:bg-black/60"
        title="전체화면"
      >
        {isFullscreen ? (
          <img src={zoom_out_icon} alt="축소" />
        ) : (
          <img src={zoom_in_icon} alt="전체화면" />
        )}
      </button>

      {currentSubtitle && (
        <div className="pointer-events-none absolute right-0 bottom-12 left-0 flex w-full justify-center transition duration-300">
          <div
            className={cn(
              "w-fit rounded-lg bg-black/60 text-center text-white backdrop-blur-sm",
              isFullscreen ? "mb-14 px-6 py-3 text-2xl" : "text-md px-3 py-2",
            )}
          >
            {currentSubtitle}
          </div>
        </div>
      )}
    </div>
  );
}

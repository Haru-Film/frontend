import { useEffect } from "react";

interface CameraPreviewProps {
  stream: MediaStream | null;
  ref: React.RefObject<HTMLVideoElement | null>;
}

export function CameraPreview({ stream, ref }: CameraPreviewProps) {
  useEffect(() => {
    if (ref.current && stream) {
      ref.current.srcObject = stream;
    }
  }, [stream, ref]);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      playsInline
      className="absolute inset-0 h-full w-full scale-x-[-1] transform object-cover" // 거울 모드
    />
  );
}

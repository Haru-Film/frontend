import { createContext, useContext } from "react";
import type {
  CameraErrorType,
  PermissionStatus,
  Timestamp,
} from "@/types/recording";

export interface RecordContextType {
  // --- Camera ---
  stream: MediaStream | null; // 카메라 스트림
  permissionStatus: PermissionStatus; // 권한 상태
  isLoading: boolean; // 카메라 로딩 여부
  error: CameraErrorType | null; // 카메라 에러 상태
  startCamera: () => Promise<void>; // 카메라 시작 함수
  stopCamera: () => void; // 카메라 중지 함수

  // --- Media Recorder ---
  isRecording: boolean; // 녹화 중 여부
  recordedBlob: Blob | null; // 녹화된 Blob 데이터
  recordingStartTime: number | null; // 녹화 시작 시간
  startRecording: () => void; // 녹화 시작 함수
  stopRecording: () => void; // 녹화 중지 함수
  resetRecording: () => void; // 녹화 리셋 함수

  // --- Thumbnail ---
  thumbnail: Blob | null; // 스냅샷 이미지 Blob 데이터
  captureThumbnail: (
    videoRef: React.RefObject<HTMLVideoElement | null>,
  ) => Promise<void>; // 스냅샷 캡처 함수

  // --- Timestamps ---
  timestamps: Timestamp[]; // 타임스탬프 배열
  setTimestamps: (timestamps: Timestamp[]) => void; // 타임스탬프 설정 함수
}

export const RecordContext = createContext<RecordContextType | null>(null);

export const useRecordContext = () => {
  const context = useContext(RecordContext);

  if (!context) {
    throw new Error("useRecordContext must be used within a RecordLayout");
  }
  return context;
};

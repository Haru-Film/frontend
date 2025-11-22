export type CameraErrorType =
  | "permission-denied"
  | "not-found"
  | "not-readable"
  | "unknown";

export interface Timestamp {
  time: number; // 초
  label: string;
}

export interface SeekCommand {
  timestampIndex: number;
}

export interface Part {
  PartNumber: number;
  ETag: string;
}

export interface PermissionStatus {
  video: boolean;
  audio: boolean;
}

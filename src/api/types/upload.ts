import { z } from "zod";

// Initiate Multipart Video Upload
export const InitiateVideoUploadRequestSchema = z.object({
  uploadDate: z.string(),
});

export const InitiateVideoUploadResponseSchema = z.object({
  uploadId: z.string(),
});

// Continue Multipart Video Upload
export const ContinueVideoUploadRequestSchema = z.object({
  uploadId: z.string(),
  partNumber: z.number(),
  uploadDate: z.string(),
});

export const ContinueVideoUploadResponseSchema = z.object({
  presignedUrl: z.string(),
});

// Complete Multipart Video Upload
export const CompleteVideoUploadRequestSchema = z.object({
  uploadId: z.string(),
  uploadDate: z.string(),
  parts: z.array(
    z.object({
      PartNumber: z.number(),
      ETag: z.string(),
    }),
  ),
  timestamps: z.array(
    z.object({
      time: z.number(),
      label: z.string(),
    }),
  ),
});

// Initiate Thumbnail Upload
export const InitiateThumbnailUploadRequestSchema = z.object({
  uploadDate: z.string(),
});

export const InitiateThumbnailUploadResponseSchema = z.object({
  presignedUrl: z.string(),
});

// Complete Thumbnail Upload
export const CompleteThumbnailUploadRequestSchema = z.object({
  uploadDate: z.string(),
});

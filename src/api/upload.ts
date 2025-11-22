import { ky } from "@/lib/ky";
import { toastError, tryJson } from "@/lib/request";
import {
  InitiateVideoUploadRequestSchema,
  InitiateVideoUploadResponseSchema,
  ContinueVideoUploadRequestSchema,
  ContinueVideoUploadResponseSchema,
  CompleteVideoUploadRequestSchema,
  InitiateThumbnailUploadRequestSchema,
  InitiateThumbnailUploadResponseSchema,
  CompleteThumbnailUploadRequestSchema,
} from "./types/upload";
import { BaseSuccessResponse } from "./types/base";
import { z } from "zod";

export const uploadMutations = {
  // 멀티파트 업로드
  initiateMultipart: {
    mutationKey: ["upload", "initiateMultipart"],
    mutationFn: async (
      body: z.infer<typeof InitiateVideoUploadRequestSchema>,
    ) => {
      const res = await ky.post("uploads/multi-parts/initiate", { json: body });
      const response = tryJson(
        await res.text(),
        InitiateVideoUploadResponseSchema,
      );
      return toastError(res, response);
    },
  },
  getPartPresignedUrl: {
    mutationKey: ["upload", "getPartPresignedUrl"],
    mutationFn: async (
      body: z.infer<typeof ContinueVideoUploadRequestSchema>,
    ) => {
      const res = await ky.post("uploads/multi-parts/part", { json: body });
      const response = tryJson(
        await res.text(),
        ContinueVideoUploadResponseSchema,
      );
      return toastError(res, response);
    },
  },
  completeMultipart: {
    mutationKey: ["upload", "completeMultipart"],
    mutationFn: async (
      body: z.infer<typeof CompleteVideoUploadRequestSchema>,
    ) => {
      const res = await ky.post("uploads/multi-parts/complete", { json: body });
      const response = tryJson(await res.text(), BaseSuccessResponse);
      return toastError(res, response);
    },
  },

  // 썸네일 업로드
  initiateThumbnail: {
    mutationKey: ["upload", "initiateThumbnail"],
    mutationFn: async (
      body: z.infer<typeof InitiateThumbnailUploadRequestSchema>,
    ) => {
      const res = await ky.post("uploads/thumbnails", { json: body });
      const response = tryJson(
        await res.text(),
        InitiateThumbnailUploadResponseSchema,
      );
      return toastError(res, response);
    },
  },
  completeThumbnail: {
    mutationKey: ["upload", "completeThumbnail"],
    mutationFn: async (
      body: z.infer<typeof CompleteThumbnailUploadRequestSchema>,
    ) => {
      const res = await ky.post("uploads/thumbnails/complete", { json: body });
      const response = tryJson(await res.text(), BaseSuccessResponse);
      return toastError(res, response);
    },
  },
};

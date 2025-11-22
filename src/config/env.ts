import { z } from "zod";

// 환경변수 스키마
const envSchema = z.object({
  VITE_MULTIPART_SIZE: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive())
    .default(5 * 1024 * 1024),
  VITE_API_URL: z.url(),
  VITE_S3_BUCKET_URL: z.url(),

  // 아래는 VITE 기본 환경변수
  DEV: z.boolean().default(false),
  PROD: z.boolean().default(true),
});

const _env = envSchema.safeParse(import.meta.env);

if (!_env.success) {
  console.error("환경 변수 설정 오류:", z.treeifyError(_env.error));
  throw new Error("환경 변수 설정이 올바르지 않습니다.");
}

export const env = _env.data;

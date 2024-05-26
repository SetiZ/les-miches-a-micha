import { ImageLoaderProps } from "next/image";

export function imageLoader({ src, width, quality }: ImageLoaderProps) {
  return `https://img.perceptpixel.com/mehdi-edwrkbpj/w_${width},f_auto,q_${quality || 75}/${src}.png`;
}

export function supabaseLoader({ src, width, quality }: ImageLoaderProps) {
  return `https://koouaptdxslqcuugxngi.supabase.co/storage/v1/object/public/miches/${src}?width=${width}&quality=${
    quality || 75
  }`;
}

// https://koouaptdxslqcuugxngi.supabase.co/storage/v1/object/public/miches/0000_default.png

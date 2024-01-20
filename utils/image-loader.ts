import { ImageLoaderProps } from "next/image";

export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
    return `https://img.perceptpixel.com/mehdi-edwrkbpj/w_${width},f_auto,q_${quality || 75}/${src}.png`
  }

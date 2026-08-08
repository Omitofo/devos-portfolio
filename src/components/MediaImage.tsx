import Image, { type ImageProps } from "next/image";

export interface MediaImageProps
  extends Omit<ImageProps, "alt" | "sizes" | "fill"> {
  alt: string;
  /** Use for the first visible/LCP image only. Keep false for the rest. */
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
}

/**
 * Canonical image wrapper for project media.
 *
 * The wrapper keeps responsive sizing and accessibility requirements in one
 * place while delegating actual optimization to Next/Image.
 */
export function MediaImage({
  alt,
  priority = false,
  sizes = "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw",
  fill = false,
  ...props
}: MediaImageProps) {
  return (
    <Image
      {...props}
      alt={alt}
      sizes={sizes}
      fill={fill}
      priority={priority}
    />
  );
}

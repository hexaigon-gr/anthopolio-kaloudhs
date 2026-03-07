import Image from "next/image";

import { cn } from "@/lib/general/utils";

interface KaloudisLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function KaloudisLogo({ className, size = "md" }: KaloudisLogoProps) {
  const sizeMap = {
    sm: 32,
    md: 48,
    lg: 64,
  };

  const px = sizeMap[size];

  return (
    <Image
      src="/images/logo.png"
      alt="ΑΝΘΗ-ΦΥΤΑ KALOUDIS Logo"
      width={px}
      height={px}
      className={cn("rounded-full", className)}
    />
  );
}

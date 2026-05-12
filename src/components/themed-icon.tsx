import React, { PropsWithChildren } from "react";
import { IconProps } from "../../types/styles";
import { useTheme } from "@/hooks/use-theme";

export function ThemedIcon({
  children,
  color,
  size = 25,
}: PropsWithChildren & Partial<IconProps>) {
  const icon = children as any | undefined | null;
  color = color || useTheme().text;

  const Icon =
    icon &&
    React.cloneElement<any>(icon, {
      size: size || icon?.props?.size,
      color: color,
    });

  return Icon as React.ReactElement;
}

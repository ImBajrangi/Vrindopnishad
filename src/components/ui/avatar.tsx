import * as React from 'react';
import { cn } from '../../lib/utils';

export function Avatar({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full", className)} {...props}>
      {children}
    </div>
  );
}

export function AvatarImage({ className, alt = '', src, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [hasError, setHasError] = React.useState(false);
  if (hasError || !src) return null;
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={cn("aspect-square h-full w-full object-cover", className)}
      {...props}
    />
  );
}

export function AvatarFallback({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex h-full w-full items-center justify-center rounded-full bg-slate-700 font-medium text-xs text-slate-200", className)}
      {...props}
    >
      {children}
    </div>
  );
}

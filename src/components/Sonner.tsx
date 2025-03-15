"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function Sonner({
  text,
  description,
  title,
  action,
  label,
}: {
  description: string;
  text: string;
  title?: string;
  action: () => void;
  label: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast(title, {
          description: description,
          action: {
            label: label,
            onClick: () => action(),
          },
        })
      }
    >
      {text}
    </Button>
  );
}

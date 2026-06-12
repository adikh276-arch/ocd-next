"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { StandardFinishCard } from "@/components/StandardFinishCard";
import { useTranslation } from "react-i18next";

interface StandardCompletionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  onStartOver?: () => void;
  startOverText?: string;
  onDone?: () => void;
  doneText?: string;
  showHome?: boolean;
  emoji?: string;
}

export function StandardCompletionModal({
  isOpen,
  onOpenChange,
  title,
  description,
  onStartOver,
  startOverText,
  onDone,
  doneText,
  showHome = true,
  emoji,
}: StandardCompletionModalProps) {
  const { t } = useTranslation("common");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[400px] p-0 border-none bg-white rounded-[2rem] shadow-2xl overflow-hidden [&_svg]:h-5 [&_svg]:w-5 [&>button]:right-6 [&>button]:top-6 [&>button]:transition-all [&>button]:hover:scale-110">
        <DialogHeader className="sr-only">
          <DialogTitle>{title || t('activity_completed')}</DialogTitle>
          <DialogDescription>
            {description || t('finished_journey_share')}
          </DialogDescription>
        </DialogHeader>
        <StandardFinishCard
          title={title}
          description={description}
          emoji={emoji}
          onStartOver={() => {
            onOpenChange(false);
            if (onStartOver) onStartOver();
          }}
          startOverText={startOverText}
          onDone={() => {
            onOpenChange(false);
            if (onDone) onDone();
            else window.location.href = '/ocd';
          }}
          doneText={doneText}
          className="shadow-none border-none animate-none"
          showShare={true}
          showHome={showHome}
        />
      </DialogContent>
    </Dialog>
  );
}

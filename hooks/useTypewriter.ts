"use client";

import { useState, useEffect, useCallback } from "react";

export function useTypewriter(
  texts: string[],
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseMs = 2000
) {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const tick = useCallback(() => {
    const current = texts[textIndex];
    if (!current) return;

    if (isPaused) return;

    if (!isDeleting) {
      if (charIndex < current.length) {
        setDisplayText(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      } else {
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseMs);
      }
    } else {
      if (charIndex > 0) {
        setDisplayText(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      } else {
        setIsDeleting(false);
        setTextIndex((i) => (i + 1) % texts.length);
      }
    }
  }, [charIndex, isDeleting, isPaused, textIndex, texts, pauseMs]);

  useEffect(() => {
    if (isPaused) return;
    const timeout = setTimeout(tick, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [tick, isDeleting, isPaused, typingSpeed, deletingSpeed]);

  return displayText;
}

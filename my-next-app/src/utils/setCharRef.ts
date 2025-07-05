// src/utils/setCharRef.ts
import { RefObject } from "react";

export const setCharRef =
  <T extends HTMLElement>(refArray: RefObject<(T | null)[]>) =>
  (index: number) =>
  (el: T | null) => {
    refArray.current[index] = el;
  };

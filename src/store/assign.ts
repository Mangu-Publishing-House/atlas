import { create } from "zustand";
import type { Carrier } from "@/lib/taxonomy";

export type Draft = {
  id: string;
  title: string;
  language: string;
  carrier: Carrier;
  tags: string[];
  facets: string[];
  updated: number;
};

type AssignState = {
  hydrated: boolean;
  current: Draft;
  saved: Draft[];
  hydrate: () => void;
  setField: <K extends keyof Draft>(key: K, value: Draft[K]) => void;
  addTag: (label: string) => void;
  removeTag: (label: string) => void;
  addFacet: (facet: string) => void;
  removeFacet: (facet: string) => void;
  save: () => void;
  load: (id: string) => void;
  reset: () => void;
  removeSaved: (id: string) => void;
};

const KEY = "mangu-atlas-assign";

function uid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `d-${Math.random().toString(36).slice(2)}`;
}

function fresh(): Draft {
  return {
    id: uid(),
    title: "",
    language: "eng",
    carrier: "print",
    tags: [],
    facets: [],
    updated: Date.now(),
  };
}

function readSaved(): Draft[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { saved?: Draft[] };
    return Array.isArray(parsed.saved) ? parsed.saved : [];
  } catch {
    return [];
  }
}

function writeSaved(saved: Draft[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify({ saved }));
}

export const useAssign = create<AssignState>((set, get) => ({
  hydrated: false,
  current: {
    id: "draft",
    title: "",
    language: "eng",
    carrier: "print",
    tags: [],
    facets: [],
    updated: 0,
  },
  saved: [],
  hydrate: () => {
    if (get().hydrated) return;
    set({ hydrated: true, saved: readSaved() });
  },
  setField: (key, value) =>
    set((s) => ({ current: { ...s.current, [key]: value, updated: Date.now() } })),
  addTag: (label) =>
    set((s) => {
      if (s.current.tags.includes(label)) return s;
      return {
        current: {
          ...s.current,
          tags: [...s.current.tags, label],
          updated: Date.now(),
        },
      };
    }),
  removeTag: (label) =>
    set((s) => ({
      current: {
        ...s.current,
        tags: s.current.tags.filter((t) => t !== label),
        updated: Date.now(),
      },
    })),
  addFacet: (facet) =>
    set((s) => {
      if (s.current.facets.includes(facet)) return s;
      return {
        current: {
          ...s.current,
          facets: [...s.current.facets, facet],
          updated: Date.now(),
        },
      };
    }),
  removeFacet: (facet) =>
    set((s) => ({
      current: {
        ...s.current,
        facets: s.current.facets.filter((t) => t !== facet),
        updated: Date.now(),
      },
    })),
  save: () => {
    const cur = {
      ...get().current,
      id: get().current.id === "draft" ? uid() : get().current.id,
      updated: Date.now(),
    };
    const rest = get().saved.filter((d) => d.id !== cur.id);
    const saved = [cur, ...rest].slice(0, 40);
    writeSaved(saved);
    set({ current: cur, saved });
  },
  load: (id) => {
    const found = get().saved.find((d) => d.id === id);
    if (found) set({ current: { ...found } });
  },
  reset: () => set({ current: fresh() }),
  removeSaved: (id) => {
    const saved = get().saved.filter((d) => d.id !== id);
    writeSaved(saved);
    set({ saved });
  },
}));

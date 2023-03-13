import create from "zustand";

const useDimStore = create((set) => ({
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0,
}));

const useCompileStore = create((set) => ({
  ready: false,
  compile: false,
  setReady: () => set({ ready: true }),
}));

const useTermStore = create((set) => ({
  text: null,
  write: (newText) => set({ text: newText }),
}));

export { useDimStore, useCompileStore, useTermStore };

//const useClickStore = create((set))

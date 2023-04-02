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
  // might want to store genPixles and orbit together in a set
  // to avoid unnessarcy re renders
  genPixles: null,
  setGenPixles: (fcn) => set({ genPixles: fcn }),
  orbit: null,
  setOrbit: (fcn) => set({ orbit: fcn }),
  module: null,
  setModule: (mod) => set({ module: mod }),
  initialType: null,
  setInitialType: (type) => set({ initialType: type }),
  malloc: null,
  free: null,
  setMalloc: (fcn) => set({ malloc: fcn }),
  setFree: (free) => set({ free: free }),
  u8buff: null,
  setU8buff: (buff) => set({ u8buff: buff }),
  content: null,
  setContent: (cont) => set({ content: cont }),
}));

const useTermStore = create((set) => ({
  text: null,
  write: (newText) => set({ text: newText }),
}));

const useColorsStore = create((set) => ({
  amt: null,
  colors: null,
  set: (colors, len) => set({ amt: len, colors: colors }),
}));

export { useDimStore, useCompileStore, useTermStore, useColorsStore };

//const useClickStore = create((set))

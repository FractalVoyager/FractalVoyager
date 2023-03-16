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
}));

const useTermStore = create((set) => ({
  text: null,
  write: (newText) => set({ text: newText }),
}));

export { useDimStore, useCompileStore, useTermStore };

//const useClickStore = create((set))

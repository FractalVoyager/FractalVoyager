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
  color: null,
  newLine: true,
  write: (newText, color, newLine) =>
    set({ text: newText, color: color, newLine: newLine }),
  quickWrite: (text) => set({ text: text, color: "white", newLine: true }),
}));

const useColorsStore = create((set) => ({
  amt: null,
  colors: null,
  set: (colors, len) => set({ amt: len, colors: colors }),
}));

const useBackState = create((set) => ({
  allowed: false,
  setAllowed: (bool) => set({ allowed: bool }),
}));

const useTmpParamsStore = create((set) => ({
  realMin: -2,
  realMax: 2,
  imgMin: -2,
  imgMax: 2,
  maxRad: 4,
  minRad: 0.001,
  epsilon: 0.000001,
  maxIters: 64,
  imagAxisRes: 2160,
  colors: [
    [0, 0, 0],
    [0, 39, 51],
    [0, 46, 60],
    [0, 52, 68],
    [0, 59, 77],
    [0, 65, 85],
    [0, 72, 94],
    [0, 78, 102],
    [0, 85, 111],
    [0, 91, 119],
    [0, 98, 128],
    [0, 105, 136],
    [0, 111, 145],
    [0, 118, 153],
    [0, 124, 162],
    [0, 131, 170],
    [0, 137, 179],
    [0, 144, 187],
    [0, 150, 195],
    [0, 157, 204],
    [0, 163, 212],
    [0, 170, 221],
    [0, 176, 229],
    [0, 183, 238],
    [0, 189, 246],
    [0, 196, 255],
    [9, 198, 255],
    [17, 200, 255],
    [26, 202, 255],
    [34, 204, 255],
    [43, 206, 255],
    [51, 208, 255],
    [59, 210, 255],
    [68, 212, 255],
    [77, 214, 255],
    [85, 216, 255],
    [94, 218, 255],
    [102, 220, 255],
    [111, 222, 255],
    [119, 224, 255],
    [128, 226, 255],
    [136, 227, 255],
    [145, 229, 255],
    [153, 231, 255],
    [162, 233, 255],
    [170, 235, 255],
    [179, 237, 255],
    [187, 239, 255],
    [195, 241, 255],
    [204, 243, 255],
  ],
  numColors: 50,
  re: null,
  im: null,
  type: null,
  orbitNum: 64,
  orbitColor: "red",
  reset: () =>
    set({
      realMin: -2,
      realMax: 2,
      imgMin: -2,
      imgMax: 2,
      maxRad: 4,
      minRad: 0.001,
      epsilon: 0.000001,
      maxIters: 64,
      imagAxisRes: 2160,
      colors: [
        [0, 0, 0],
        [0, 39, 51],
        [0, 46, 60],
        [0, 52, 68],
        [0, 59, 77],
        [0, 65, 85],
        [0, 72, 94],
        [0, 78, 102],
        [0, 85, 111],
        [0, 91, 119],
        [0, 98, 128],
        [0, 105, 136],
        [0, 111, 145],
        [0, 118, 153],
        [0, 124, 162],
        [0, 131, 170],
        [0, 137, 179],
        [0, 144, 187],
        [0, 150, 195],
        [0, 157, 204],
        [0, 163, 212],
        [0, 170, 221],
        [0, 176, 229],
        [0, 183, 238],
        [0, 189, 246],
        [0, 196, 255],
        [9, 198, 255],
        [17, 200, 255],
        [26, 202, 255],
        [34, 204, 255],
        [43, 206, 255],
        [51, 208, 255],
        [59, 210, 255],
        [68, 212, 255],
        [77, 214, 255],
        [85, 216, 255],
        [94, 218, 255],
        [102, 220, 255],
        [111, 222, 255],
        [119, 224, 255],
        [128, 226, 255],
        [136, 227, 255],
        [145, 229, 255],
        [153, 231, 255],
        [162, 233, 255],
        [170, 235, 255],
        [179, 237, 255],
        [187, 239, 255],
        [195, 241, 255],
        [204, 243, 255],
      ],
      numColors: 50,
      re: null,
      im: null,
      type: null,
      orbitNum: 64,
      orbitColor: "red",
    }),

  setAll: (
    realMax,
    realMin,
    imgMax,
    imgMin,
    maxRad,
    minRad,
    epsilon,
    maxIters,
    imagAxisRes,
    colors,
    numColors,
    re,
    im,
    type,
    orbitNum,
    orbitColor
  ) => {
    set({
      realMax: realMax,
      realMin: realMin,
      imgMax: imgMax,
      imgMin: imgMin,
      maxRad: maxRad,
      minRad: minRad,
      epsilon: epsilon,
      maxIters: maxIters,
      imagAxisRes: imagAxisRes,
      colors: colors,
      numColors: numColors,
      re: re,
      im: im,
      type: type,
      orbitNum: orbitNum,
      orbitColor: orbitColor,
    });
  },
  setAxises: (realMin, realMax, imgMin, imgMax) =>
    set({ realMin: realMin, realMax: realMax, imgMin: imgMin, imgMax: imgMax }),
  setType: (type) => set({ type: type }),
  setGenVals: (re, im) => set({ re: re, im: im }),
}));

const useFracRefStore = create((set) => ({
  fracRef: null,
  update: (ref) => set({ fracRef: ref }),
}));

// kind of a stupid - this is to make the viewer to know the new type
// when you tpye a new script, without this - it draws the right type, but then
// when you zoom or do anything it viewer it reverts back to the old type
const useResetType = create((set) => ({
  type: null,
  update: 0,
  setType: (type) => set((state) => ({ type: type, update: state.update + 1 })),
}));

const useWriteOrbitStore = create((set) => ({
  write: true,
  setWrite: (bool) => set({ write: bool }),
}));

export {
  useDimStore,
  useCompileStore,
  useTermStore,
  useColorsStore,
  useBackState,
  useTmpParamsStore,
  useFracRefStore,
  useResetType,
  useWriteOrbitStore,
};

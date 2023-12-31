import { createSlice } from "@reduxjs/toolkit";
import useHexadecimal from "@/hooks/useHexadecimal";

type colorType = {
  colorid: string;
  size: string;
  shape: string;
  positionX: number;
  positionY: number;
  color1: string;
  endingPoint: number;
  bg: string;
};
type initialStateType = {
  selectedItem: string;
  color: colorType;
  colors: colorType[];
  single: string;
  background: string;
};
type stateType = {
  meshReducer: initialStateType;
};

const generateRandomBlock = () => {
  const size = ["circle", "ellipse"][Math.random() < 0.5 ? 0 : 1];
  const shape = [
    "closest-side",
    "closest-corner",
    "farthest-side",
    "farthest-corner",
  ][Math.floor(Math.random() * 4)];
  const positionX = Math.floor(Math.random() * 100);
  const positionY = Math.floor(Math.random() * 100);
  const color1 = useHexadecimal();
  const endingPoint = Math.floor(Math.random() * 100) + 20;
  const data = {
    size,
    shape,
    positionX,
    positionY,
    color1,
    endingPoint: endingPoint > 100 ? 100 : endingPoint,
  };
  return {
    colorid: crypto.randomUUID(),
    ...data,
    bg: `radial-gradient(${data.size} ${data.shape} at ${data.positionX}% ${data.positionY}%, ${data.color1} 0%, transparent ${data.endingPoint}%)`,
  };
};
const makeBackground = (info: initialStateType) => {
  const colors = info.colors;
  let bg = "";
  for (let i = 0; i < colors.length; i++) {
    bg += colors[i].bg + (i !== colors.length - 1 ? "," : "");
  }
  return bg;
};
const d1 = generateRandomBlock();
const d2 = generateRandomBlock();
const d3 = generateRandomBlock();
const d4 = generateRandomBlock();
const initialState: initialStateType = {
  selectedItem: "",
  color: d1,
  colors: [d2, d3, d4],
  single: useHexadecimal(),
  background: `${d2.bg},${d3.bg},${d4.bg}`,
};

const meshSlice = createSlice({
  name: "mesh",
  initialState,
  reducers: {
    selectItem: (state, action) => {
      state.selectedItem = action.payload.selectedId;
    },
    updateFull: (state) => {
      state.colors = Array.from({ length: 4 }, () => generateRandomBlock());
      state.single = useHexadecimal();
      state.background = makeBackground(state);
    },
    generateRandom: (state) => {
      state.color = generateRandomBlock();
      state.background = makeBackground(state);
    },
    addColor: (state, action) => {
      state.colors = [action.payload.newColor, ...state.colors]; // Keep only the latest four colors
      state.background = makeBackground(state);
    },
    deleteColor: (state, action) => {
      state.colors = state.colors.filter(
        (each) => each.colorid !== action.payload.deletedId,
      );
      state.background = makeBackground(state);
    },
    updatePositionX: (state, action) => {
      const final = state.colors.map((each) => {
        if (each.colorid === state.selectedItem) {
          return { ...each, positionX: action.payload.valuex };
        }
        return each;
      });
      state.colors = final;
      state.background = makeBackground(state);
    },
  },
});

const meshSelector = (state: stateType) => {
  return state.meshReducer;
};
const meshReducer = meshSlice.reducer;
export default meshReducer;
export const {
  updateFull,
  updatePositionX,
  generateRandom,
  addColor,
  deleteColor,
  selectItem,
} = meshSlice.actions;
export { meshSelector };

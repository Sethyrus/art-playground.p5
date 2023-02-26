import { PayloadAction } from './../../../node_modules/@reduxjs/toolkit/src/createAction';
import { createSlice } from '@reduxjs/toolkit'

export const viewDataSlice = createSlice({
  name: 'view-data',
  initialState: {
    vertexCount: 12,
    vertexClosestVertices: 4,
    vertexOpposingVertices: 2,
  },
  reducers: {
    updateViewData: {
      reducer: (state, action: PayloadAction<ViewDataState>) =>
      {
        console.log("reducer", { 'state.vertexCount': state.vertexCount, 'action.payload': action.payload });
        return { ...state, ...action.payload };
      },
      prepare: (payload) =>
      {
        console.log("prepare", { 'payload': payload });
        return { payload };
      },
    }
    // (state, action: PayloadAction) =>
    // {
    //   console.log("update", { 'state.vertexCount': state.vertexCount, 'newState.payload': action.payload });
    //   state = { ...state, ...action.payload };
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   // state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { updateViewData } = viewDataSlice.actions

export default viewDataSlice.reducer
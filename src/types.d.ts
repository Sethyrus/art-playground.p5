interface RootState
{
  viewData: ViewDataState;
}

interface ViewDataState
{
  vertexCount: number;
  vertexClosestVertices: number;
  vertexOpposingVertices: number;
}

interface ViewDataReducerAction
{
  type: string;
  payload: ViewDataState;
}

interface ViewDataReducerAction
{
  type: string;
  payload: ViewDataState;
}

type ViewDataReducerDispatch = (action: ViewDataReducerAction) => void;
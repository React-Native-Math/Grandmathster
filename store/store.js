import React from "react";
import { createGlobalState } from "react-hooks-global-state";

const initialState = { count: 0 };

export const { useGlobalState } = createGlobalState(initialState);

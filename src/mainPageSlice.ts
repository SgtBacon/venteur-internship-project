import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import { IPolicy } from "./Objects/Policy";
import { IZipCounty } from "./Objects/ZipCounty";

interface ImainPageSlice {
  isLoading: boolean;
  error: string;
  zipCounties?: IZipCounty[];
  policies?: IPolicy;
}
const initialState: ImainPageSlice = {
  isLoading: false,
  error: "",
};
const mainPageSlice = createSlice({
  name: "mainPage",
  initialState,
  reducers: {
    getZipCountiesSuccess(state, action) {
      return (state.zipCounties = action.payload);
    },
    getZipCountiesFailure(state, action) {
      return (state.error = action.payload);
    },
  },
});
export function fetchZipCounties(zipCode: string) {
  const res = axios
    .get("http://tech-screen.venteur.co/ZipCounties/" + zipCode)
    .then((result) => {
      return result.data;
    });
  console.log(res);
  return res;
}

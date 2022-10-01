import { createSlice } from '@reduxjs/toolkit'

export const siteDataSlice = createSlice({
  name: 'siteData',
  initialState: {
    products: [],
    categories: [],
    baseInfo: {},
    lang: "UZ"
  },
  reducers: {
    saveProducts: (state, action) => {
      state.products = action.payload
    },
    saveCategories: (state, action) => {
      state.categories = action.payload
    },
    saveBaseInfo: (state, action) => {
      state.baseInfo = action.payload
    },
    changeLang: (state, action) => {
      state.lang = action.payload
    },
    cleanAll: (state) => {
      state.categories = []
      state.products = []
      state.baseInfo = {}
    }
  },
})

export const { saveProducts, saveCategories, saveBaseInfo, changeLang, cleanAll } = siteDataSlice.actions

export default siteDataSlice.reducer
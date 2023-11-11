/* eslint-disable no-use-before-define */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showLogoutModal: false,
  showDeleteProfileModal: false,
  showResetSellerDataFormModal: false,
  showAuthButtons: false,
  showAuthModal: false,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setShowLogoutModal(state, action) {
      state.showLogoutModal = action.payload;
    },
    setShowDeleteProfileModal(state, action) {
      state.showDeleteProfileModal = action.payload;
    },
    setShowResetSellerDataFormModal(state, action) {
      state.showResetSellerDataFormModal = action.payload;
    },
    setShowAuthButtons(state, action) {
      state.showAuthButtons = action.payload;
    },
    setShowAuthModal(state, action) {
      state.showAuthModal = action.payload;
    },
  },
});

export const {
  setShowLogoutModal,
  setShowDeleteProfileModal,
  setShowResetSellerDataFormModal,
  setShowAuthButtons,
  setShowAuthModal,
} = modalsSlice.actions;
export default modalsSlice.reducer;

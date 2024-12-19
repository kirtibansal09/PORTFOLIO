import {createReducer} from "@reduxjs/toolkit"

const initialState = {
    loading:true
}
export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("GET_USER_REQUEST", (state) => {
            state.loading = true;
        })
        .addCase("GET_USER_SUCCESS", (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase("GET_USER_FAILURE", (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("CLEAR_ERRORS", (state) => {
            state.error = null;
        });
});

export const loginReducer = createReducer({}, (builder) => {
    builder
        .addCase("LOGIN_REQUEST", (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        })
        .addCase("LOGIN_SUCCESS", (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.message = action.payload;
        })
        .addCase("LOGIN_FAILURE", (state, action) => {
            state.isAuthenticated = false;
            state.loading = false;
            state.error = action.payload;
        })

        .addCase("LOGOUT_REQUEST", (state) => {
            state.loading = true;
        })
        .addCase("LOGOUT_SUCCESS", (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.message = action.payload;
        })
        .addCase("LOGOUT_FAILURE", (state, action) => {
            state.isAuthenticated = true;
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("CLEAR_ERRORS", (state) => {
            state.error = null;
        })
        .addCase("CLEAR_MESSAGES", (state) => {
            state.message = null;
        });

});
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cardIsAddedSuccessfully: false,
    isProccessSuccessully: false,
    submitNotIsComplete: true
}

const controlSWPButtonsSlice = createSlice({
    name: 'controlSWPButtons',
    initialState: initialState,
    reducers: {
        cardAddedSuccesfully: state => {
            state.cardIsAddedSuccessfully = true
        },
        cardAddedFailed: state => {
            state.cardIsAddedSuccessfully = false
        },
        cardAddedFinally: state => {
            state.cardIsAddedSuccessfully = false
        },
        cardAddedDeleted: state => {
            state.cardIsAddedSuccessfully = false
        },
        processIsSuccessully: state => {
            state.isProccessSuccessully = true
        },
        processIsFailed: state => {
            state.isProccessSuccessully = false
        },
        submitIsComplete: state => {
            state.submitNotIsComplete = false
        }
    }
})

export const {
    cardAddedSuccesfully,
    cardAddedFailed,
    cardAddedFinally,
    submitIsComplete,
    processIsSuccessully,
    cardAddedDeleted
} = controlSWPButtonsSlice.actions

export default controlSWPButtonsSlice.reducer

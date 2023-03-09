import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cardIsAddedSuccessfully: false,
    isProccessSuccessully: false,
    submitNotIsComplete: true,
    enableAllButtons: true
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
        },
        disableAllButtons: state => {
            state.enableButtons = false
        },
        enableAllButtons: state => {
            state.enableAllButtons = true
        }
    }
})

export const {
    cardAddedSuccesfully,
    cardAddedFailed,
    cardAddedFinally,
    processIsFailed,
    submitIsComplete,
    processIsSuccessully,
    cardAddedDeleted,
    disableAllButtons,
    enableAllButtons
} = controlSWPButtonsSlice.actions

export default controlSWPButtonsSlice.reducer

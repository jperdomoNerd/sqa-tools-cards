import { configureStore } from '@reduxjs/toolkit'

// Reducers
import defaultValuesFormReducer from '../reducers/default-values-form/defaultValuesFormSlice'
import controlSWPButtonsReducer from '../reducers/control-swp-buttons/controlSWPButtonsSlice'

export default configureStore({
    reducer: {
        defaultValuesForm: defaultValuesFormReducer,
        controlSWPButtons: controlSWPButtonsReducer
    }
})

import { configureStore } from '@reduxjs/toolkit'

// Reducers
import defaultValuesFormReducer from '../reducers/default-values-form/defaultValuesFormSlice'

export default configureStore({
    reducer: {
        defaultValuesForm: defaultValuesFormReducer
    }
})

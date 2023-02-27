import { Toast } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { hiddenToast } from "./reducers/default-values-form/defaultValuesFormSlice"

export const FCToast = ({title}) => {
    const { toast } = useSelector(state => state.defaultValuesForm)
    const dispatch = useDispatch()

    const closeToast = () => {
        dispatch(hiddenToast())
        setTimeout(() => {
            dispatch(hiddenToast())
        }, 5000)
    }

    return <>
        <Toast
            show={toast.isShow} 
            onClose={() => closeToast(false)}
        >
            <Toast.Header>
                {title}
            </Toast.Header>
            <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
    </>
}

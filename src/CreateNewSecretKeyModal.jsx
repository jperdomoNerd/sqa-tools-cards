import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addSecretKey, setToast } from "./reducers/default-values-form/defaultValuesFormSlice"
import { SuccessToast } from "./SuccessToast"

export const CreateNewSecretKeyModal = ({ setIsOpenAddSecretKey }) => {
    const { toast } = useSelector(state => state.defaultValuesForm)
    const [secretKey, setSecretKey] = useState('')

    const dispatch = useDispatch()

    const addSecretKeySubmit = e => {
        e.preventDefault()
        dispatch(addSecretKey(secretKey))
        dispatch(setToast({
            title: 'Secret key added succefully!',
            message: 'You can use the new secret key in the next request'
        }))
        const defaultValues = JSON.parse(window.localStorage.getItem('defaultValues'))
        defaultValues.secretKeys.push(secretKey)
        window.localStorage.setItem('defaultValues', JSON.stringify(defaultValues))
        setIsOpenAddSecretKey(false)
    }

    return <>
        {
            toast.isShow &&
            <SuccessToast />
        }
        < div className='forms-modal' >
            <div className="forms-container">
                <form onSubmit={addSecretKeySubmit}>
                    <div className='mb-medium'>
                        <label htmlFor="" className='label mb-small'>Secret Key:</label>
                        <input type="text" name="" id="" className='input' value={secretKey} onChange={e => setSecretKey(e.target.value)} />
                    </div>
                    <div>
                        <button className='button button-primary'>
                            Save
                        </button>
                        <button className='button button-danger' onClick={() => setIsOpenAddSecretKey(false)}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div >
    </>
}

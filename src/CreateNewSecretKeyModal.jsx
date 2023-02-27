import { useState } from "react"
import { useDispatch } from "react-redux"
import { addSecretKey } from "./reducers/default-values-form/defaultValuesFormSlice"

export const CreateNewSecretKeyModal = ({ setIsOpenAddSecretKey, SecretKeyId }) => {
    const [secretKey, setSecreyKey] = useState('')

    const dispatch = useDispatch()

    const addSecretKeySubmit = e => {
        debugger
        e.preventDefault()
        dispatch(addSecretKey(secretKey))
    }

    return (
        <div className='forms-modal'>
            <div className="forms-container">
                <form onSubmit={addSecretKeySubmit}>
                    <div className='mb-medium'>
                        <label htmlFor="" className='label mb-small'>Secret Key:</label>
                        <input type="text" name="" id="" className='input' value={secretKey} onChange={e => setSecreyKey(e.target.value)} />
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
        </div>
    )
}

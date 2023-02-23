import { useState } from "react"
import { useDispatch } from "react-redux"
import { addMerchant } from "./reducers/default-values-form/defaultValuesFormSlice"

export const CreateNewMerchantModal = ({ setIsOpenMerchant }) => {
    const [ merchant, setMerchant ] = useState('')

    const dispatch = useDispatch()

    const addMerchantSubmit = e => {
        e.preventDefault()
        dispatch(addMerchant(merchant))
    }

    return (
        <div className='forms-modal'>
            <div className="forms-container">
                <form onSubmit={addMerchantSubmit}>
                    <div className='mb-medium'>
                        <label htmlFor="" className='label mb-small'>Secret Key:</label>
                        <input type="text" name="" id="" className='input' value={merchant} onChange={e => setMerchant(e.target.value)} />
                    </div>
                    <div>
                        <button className='button button-primary'>
                            Save
                        </button>
                        <button className='button button-danger' onClick={() => setIsOpenMerchant(false)}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

import { useState } from "react"
import { useDispatch } from "react-redux"
import { addMerchant } from "./reducers/default-values-form/defaultValuesFormSlice"
import { SuccessToast } from './SuccessToast'

export const CreateNewMerchantModal = ({ setIsOpenMerchant }) => {
    const [ merchant, setMerchant ] = useState('')
    const [isShowToast, setIsShowToast] = useState(false)
    const [toastTitle, setToastTitle] = useState('')
    const [toastMessage, setToastMessage] = useState('')

    const dispatch = useDispatch()

    const addMerchantSubmit = e => {
        e.preventDefault()
        dispatch(addMerchant(merchant))
        setIsShowToast(true)
        setToastTitle('Merchant add successfully!')
        setToastMessage('A merchant has been successfully added, You can use it now')
    }

    return (
        <div className='forms-modal'>
            <SuccessToast 
                isShowToast={isShowToast} 
                setIsShowToast={setIsShowToast}
                title={toastTitle}
                message={toastMessage}
            />
            <div className="forms-container">
                <form onSubmit={addMerchantSubmit}>
                    <div className='mb-medium'>
                        <label htmlFor="" className='label mb-small'>Merchant:</label>
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

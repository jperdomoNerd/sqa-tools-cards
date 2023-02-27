import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addMerchant, setToast } from "./reducers/default-values-form/defaultValuesFormSlice"
import { SuccessToast } from "./SuccessToast"

export const CreateNewMerchantModal = ({ setIsOpenAddMerchant }) => {
    const { toast } = useSelector(state => state.defaultValuesForm)
    const [merchant, setMerchant] = useState('')

    const dispatch = useDispatch()

    const addMerchantSubmit = e => {
        e.preventDefault()
        dispatch(addMerchant(merchant))
        dispatch(setToast({
            title: 'Merchant added succefully!',
            message: 'You can use the new merchant in the next request'
        }))
        const defaultValues = JSON.parse(window.localStorage.getItem('defaultValues'))
        defaultValues.merchants.push(merchant)
        window.localStorage.setItem('defaultValues', JSON.stringify(defaultValues))
    }

    return <>
        {toast.isShow &&
            <SuccessToast />
        }
        <div className='forms-modal'>
            <div className="forms-container">
                <form onSubmit={addMerchantSubmit}>
                    <div className='mb-medium'>
                        <label htmlFor="" className='label mb-small'>Merchant:</label>
                        <input type="text" name="" id="" className='input' value={merchant} onChange={e => setMerchant(e.target.value)} />
                    </div>
                    <div>
                        <button className='button button-primary' onClick={() => setIsOpenAddMerchant(false)}>
                            Save
                        </button>
                        <button className='button button-danger' onClick={() => setIsOpenAddMerchant(false)}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
}

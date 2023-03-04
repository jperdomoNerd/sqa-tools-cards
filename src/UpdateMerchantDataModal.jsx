import { useSelector } from "react-redux"
import { SuccessToast } from "./SuccessToast"

export const UpdateMerchantDataModal = ({ setIsOpenUpdateMerchantsData, dataMerchants }) => {

    console.log(dataMerchants)

    const { toast } = useSelector(state => state.defaultValuesForm)

    return <>
        {toast.isShow &&
            <SuccessToast />
        }
        <div className='forms-modal'>
            <div className="forms-container">
                <form>
                        <div className='mb-medium'>
                            <label htmlFor="" className='label mb-small'>Merchant:</label>
                            <input type="text" className='input' defaultValue={dataMerchants}
                                onChange={(e) => handleOnChange(e.target.value)} />
                        </div>
                        <div className='mb-medium'>
                            <label htmlFor="" className='label mb-small'>Mechant Code:</label>
                            <input type="text" className='input' defaultValue={dataMerchants}
                                onChange={(e) => handleOnChange(e.target.value)} />
                        </div>
                        <div className='mb-medium'>
                            <label htmlFor="" className='label mb-small'>Secret Key:</label>
                            <input type="text" className='input' defaultValue={dataMerchants}
                                onChange={(e) => handleOnChange(e.target.value)} />
                        </div>
                        <div>
                            <button className='button button-primary'>
                                Save
                            </button>
                            <button className='button button-danger' onClick={() => setIsOpenUpdateMerchantsData(false)}>
                                Close
                            </button>
                        </div>
                </form>
            </div>
        </div>
    </>
}

import { useState } from "react"
import { CreateNewMerchantModal } from "./CreateNewMerchantModal"
import { useSelector, useDispatch } from 'react-redux'
import { deleteMerchant, setToast } from "./reducers/default-values-form/defaultValuesFormSlice"
import { SuccessToast } from "./SuccessToast"

// Bootstrap
import { Table } from "react-bootstrap"

export const TableMerchantModal = ({ setIsOpenMerchant }) => {

    const { toast } = useSelector(state => state.defaultValuesForm)
    const { merchants } = useSelector(state => state.defaultValuesForm)
    const [IsOpenAddMechant, setIsOpenAddMerchant] = useState('')
    const dispatch = useDispatch()

    const deleteMerchantSubmit = _merchant => {
        dispatch(deleteMerchant(_merchant))
        dispatch(setToast({
            title: 'Merchant delete succefully!',
            message: 'You can use the merchant in the next request'
        }))

        const defaultValues = JSON.parse(window.localStorage.getItem('defaultValues'))

        defaultValues.merchants = defaultValues.merchants.filter(merchant_ => merchant_ != _merchant)

        window.localStorage.setItem('defaultValues', JSON.stringify(defaultValues))
    }

    return <>
        {toast.isShow &&
            <SuccessToast />
        }
        <div className='forms-modal'>

            {IsOpenAddMechant &&
                <CreateNewMerchantModal setIsOpenAddMerchant={setIsOpenAddMerchant} />
            }

            <div className="forms-container">
                <div className="forms">
                    <Table striped>
                        <thead>
                            <tr>
                                <th>Merchant</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {merchants.map((_merchant, key) => (
                                <tr key={key}>
                                    <td>{_merchant}</td>
                                    <td>
                                        <button onClick={() => deleteMerchantSubmit(_merchant)}
                                            className="btn btn-danger btn-sm">Eliminar</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>

                    <div style={{ textAlign: "center" }}>
                        <button className='button button-primary' onClick={() => setIsOpenAddMerchant(true)}>
                            Add
                        </button>
                        <button className='button button-danger' onClick={() => setIsOpenMerchant(false)}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

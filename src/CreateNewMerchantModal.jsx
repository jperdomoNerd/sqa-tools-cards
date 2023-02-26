import { useState } from "react"
import { useDispatch } from "react-redux"
import { addMerchant } from "./reducers/default-values-form/defaultValuesFormSlice"

// Bootstrap
import { Table } from "react-bootstrap"

export const CreateNewMerchantModal = ({ setIsOpenMerchant, MechantId }) => {
    const [merchant, setMerchant] = useState('')

    const dispatch = useDispatch()

    const addMerchantSubmit = e => {
        debugger
        e.preventDefault()
        dispatch(addMerchant(merchant))
    }

    return (
        <div className='forms-modal'>
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


                <div className="forms">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Merchan</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>{MechantId}</td>

                                <td>
                                    <button className="btn btn-danger btn-sm">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

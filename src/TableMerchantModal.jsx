import { useState } from "react"

//
import { CreateNewMerchantModal } from "./CreateNewMerchantModal"

// Bootstrap
import { Table } from "react-bootstrap"

export const TableMerchantModal = ({ setIsOpenMerchant }) => {

    const [IsOpenAddMechant, setIsOpenAddMerchant] = useState('')

    return (
        <div className='forms-modal'>

            {IsOpenAddMechant &&
                <CreateNewMerchantModal setIsOpenAddMerchant={setIsOpenAddMerchant} />
            }

            <div className="forms-container">
                <div className="forms">
                    <Table striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Merchant</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Fire merchant</td>
                                <td>
                                    <button className="btn btn-danger btn-sm">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>

                    <div style={{ textAlign: "center" }}>
                        <button className='button button-primary' onClick={() => setIsOpenAddMerchant(true)}>
                            New
                        </button>
                        <button className='button button-danger' onClick={() => setIsOpenMerchant(false)}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

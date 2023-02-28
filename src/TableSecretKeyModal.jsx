import { useState } from "react"
import { useSelector } from 'react-redux'
//
import { CreateNewSecretKeyModal } from "./CreateNewSecretKeyModal"

// Bootstrap
import { Table } from "react-bootstrap"

export const TableSecretKeyModal = ({ setIsOpenSecretKey }) => {

    const { secretKeys } = useSelector(state => state.defaultValuesForm)

    const [isOpenAddSecretKey, setIsOpenAddSecretKey] = useState('')

    return (
        <div className='forms-modal'>

            {isOpenAddSecretKey &&
                <CreateNewSecretKeyModal setIsOpenAddSecretKey={setIsOpenAddSecretKey} />
            }

            <div className="forms-container">
                <div className="forms">
                    <Table responsive="md">
                        <thead>
                            <tr>
                                <th>Secret Key</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {secretKeys.map((secretKey) => (
                                <tr>
                                    <td>{secretKey}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <div style={{ textAlign: "center" }}>
                        <button className='button button-primary' onClick={() => setIsOpenAddSecretKey(true)}>
                            Add
                        </button>
                        <button className='button button-danger' onClick={() => setIsOpenSecretKey(false)}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
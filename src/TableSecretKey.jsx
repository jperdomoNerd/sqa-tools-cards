import { useState } from "react"

//
import { CreateNewSecretKeyModal } from "./CreateNewSecretKeyModal"

// Bootstrap
import { Table } from "react-bootstrap"

export const TableSecretKey = ({ setIsOpenSecretKey, SecretKeyId }) => {

    const [isOpenAddSecretKey, setIsOpenAddSecretKey] = useState('')

    return (
        <div className='forms-modal'>

            {isOpenAddSecretKey &&
                <CreateNewSecretKeyModal setIsOpenAddSecretKey={setIsOpenAddSecretKey} />
            }

            <div className="forms-container">
                <div className="forms">
                    <Table bordered borderColor="primary">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Secret Key</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>{SecretKeyId}</td>

                                <td>
                                    <button className="btn btn-danger btn-sm">Eliminar</button>
                                </td>
                            </tr>
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

import { useState } from "react"
import { useDispatch } from "react-redux"
import { addSecretKey } from "./reducers/default-values-form/defaultValuesFormSlice"

// Bootstrap
import Table from 'react-bootstrap/Table'

export const CreateNewSecretKeyModal = ({ setIsOpenSecretKey, SecretKeyId }) => {
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
                        <button className='button button-danger' onClick={() => setIsOpenSecretKey(false)}>
                            Close
                        </button>
                    </div>
                </form>

                <div className="forms">
                    <Table striped bordered hover>
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
                </div>

            </div>
        </div>
    )
}

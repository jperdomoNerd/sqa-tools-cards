import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { deleteSecretKey, setToast } from "./reducers/default-values-form/defaultValuesFormSlice"
import { SuccessToast } from "./SuccessToast"
//
import { CreateNewSecretKeyModal } from "./CreateNewSecretKeyModal"

// Bootstrap
import { Table } from "react-bootstrap"

export const TableSecretKeyModal = ({ setIsOpenSecretKey }) => {

    const { toast } = useSelector(state => state.defaultValuesForm)
    const { secretKeys } = useSelector(state => state.defaultValuesForm)
    const [isOpenAddSecretKey, setIsOpenAddSecretKey] = useState('')
    const dispatch = useDispatch()


    const deleteSecretKeySubmit = _secretKey => {
        dispatch(deleteSecretKey(_secretKey))
        dispatch(setToast({
            title: 'Secret key delete succefully!',
            message: 'You can use the secret key in the next request'
        }))

        const defaultValues = JSON.parse(window.localStorage.getItem('defaultValues'))

        defaultValues.secretKeys = defaultValues.secretKeys.filter(secretKey_ => secretKey_ != _secretKey)

        window.localStorage.setItem('defaultValues', JSON.stringify(defaultValues))
    }

    return <>
        {toast.isShow &&
            <SuccessToast />
        }
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
                            {secretKeys.map((_secretKey, key) => (
                                <tr key={key}>
                                    <td>{_secretKey}</td>
                                    <td>
                                        <button onClick={() => deleteSecretKeySubmit(_secretKey)}
                                            className="btn btn-danger btn-sm">Eliminar</button>
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
    </>
}

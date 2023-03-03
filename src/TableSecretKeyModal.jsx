import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { deleteSecretKey, setToast } from "./reducers/default-values-form/defaultValuesFormSlice"
import { SuccessToast } from "./SuccessToast"
import { PaginationTable } from "./PaginationTable"

// Model create SecretKey
import { CreateNewSecretKeyModal } from "./CreateNewSecretKeyModal"

// Bootstrap
import { Table } from "react-bootstrap"
import { Pagination } from "react-bootstrap"

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

    // Pagination
    const [page, setPage] = useState(1)
    const [secretKeysLimits, setSecretKeysLimits] = useState(1)

    useEffect(() => {
        const getData = (_data, _page, _limit) => {
            const startIn = _limit * (_page - 1)
            return _data.slice(startIn, startIn + _limit)
        }
        setSecretKeysLimits(getData(secretKeys, page, 5))
    }, [page, secretKeysLimits]);


    const handleChangePage = (page) => {
        setPage(page)
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
                    <Table striped bordered hover responsive="md">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Secret Key</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {secretKeysLimits.length > 0 && secretKeysLimits.map((_secretKey, key) => (
                                <tr key={key}>
                                    <td>{(page - 1) * 5 + (key + 1)}</td>
                                    <td>{_secretKey}</td>
                                    <td>
                                        <button onClick={() => deleteSecretKeySubmit(_secretKey)}
                                            className="btn btn-danger btn-sm">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <div className="container d-flex justify-content-center">
                        {
                            <PaginationTable
                                total={Math.ceil(secretKeys.length / 5)}
                                current={page}
                                onChangePage={handleChangePage}>
                            </PaginationTable>
                        }
                    </div>


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
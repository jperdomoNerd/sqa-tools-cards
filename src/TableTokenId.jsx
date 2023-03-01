import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { deleteTokenId, setToast } from "./reducers/default-values-form/defaultValuesFormSlice"
import { SuccessToast } from "./SuccessToast"

// Bootstrap
import { Table } from "react-bootstrap"

export const TableTokenId = ({ setIsOpenTableTokenId }) => {

    const { toast } = useSelector(state => state.defaultValuesForm)
    const { tokensId } = useSelector(state => state.defaultValuesForm)
    const dispatch = useDispatch()

    const deleteTokenIdSubmit = _tokenId => {
        dispatch(deleteTokenId(_tokenId))
        dispatch(setToast({
            title: 'Token id delete succefully!',
            message: 'You can use the token id in the next request'
        }))

        const defaultValues = JSON.parse(window.localStorage.getItem('defaultValues'))

        defaultValues.tokensId = defaultValues.tokensId.filter(tokenId_ => tokenId_ != _tokenId)

        window.localStorage.setItem('defaultValues', JSON.stringify(defaultValues))
    }

    return <>
        {toast.isShow &&
            <SuccessToast />
        }
        <div className='forms-modal'>

            <div className="forms-container">
                <div className="forms">
                    <Table small responsive="md">
                        <thead>
                            <tr>
                                <th>Token Id</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tokensId.map((_tokenId, key) => (
                                <tr key={key}>
                                    <td>{_tokenId}</td>
                                    <td>
                                        <button onClick={() => deleteTokenIdSubmit(_tokenId)}
                                            className="btn btn-danger btn-sm">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <div style={{ textAlign: "center" }}>
                        <button className='button button-danger' onClick={() => setIsOpenTableTokenId(false)}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>        
    </>    
}

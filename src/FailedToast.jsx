import { FCToast } from './FCToast'
import { useSelector } from 'react-redux'

export const FailedToast = () => {
    const { toast } = useSelector(state => state.defaultValuesForm)

    const successFontColor = '#f32013'
    const spanTitle = <span style={{color: successFontColor}}>{toast.title}</span>
    return <>
        <FCToast
            title={spanTitle}
        />
    </>
}

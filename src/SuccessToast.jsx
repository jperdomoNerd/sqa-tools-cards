import { FCToast } from './FCToast'
import { useSelector } from 'react-redux'

export const SuccessToast = () => {
    const { toast } = useSelector(state => state.defaultValuesForm)

    const dangerFontColor = '#1db954'
    const spanTitle = <span style={{color: dangerFontColor}}>{toast.title}</span>
    return <>
        <FCToast
            title={spanTitle}
        />
    </>
}

import { FCToast } from './FCToast'

export const SuccessToast = ({isShowToast, setIsShowToast, title, message}) => {
    const dangerFontColor = '#1db954'
    const spanTitle = <span style={{color: dangerFontColor}}>{title}</span>
    return <>
        <FCToast
            isShow={isShowToast}
            setIsShow={setIsShowToast}
            title={spanTitle}
            message={message}
        />
    </>
}

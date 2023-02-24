import { FCToast } from './FCToast'

export const FailedToast = ({isShowToast, setIsShowToast, title, message}) => {
    const successFontColor = '#f32013'
    const spanTitle = <span style={{color: successFontColor}}>{title}</span>
    return <>
        <FCToast
            isShow={isShowToast}
            setIsShow={setIsShowToast}
            title={spanTitle}
            message={message}
        />
    </>
}

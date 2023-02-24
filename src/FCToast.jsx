import { Toast } from 'react-bootstrap'

export const FCToast = ({ isShow, setIsShow, message, title }) => {
    return <>
        <Toast 
            show={isShow} 
            onClose={() => setIsShow(false)}
        >
            <Toast.Header>
                {title}
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    </>
}

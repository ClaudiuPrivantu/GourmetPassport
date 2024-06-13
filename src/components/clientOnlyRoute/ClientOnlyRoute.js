import { useSelector } from 'react-redux'
import { selectEmail } from '../../redux/slice/authSlice'

const ClientOnlyRoute = ({clientChildren, adminChildren}) => {
    const userEmail = useSelector(selectEmail);
    
    if(userEmail === process.env.REACT_APP_ADMIN_USER){
        return adminChildren;
    }
    return (
        <>
            {clientChildren}
        </>
    );
};

export const ClientOnlyLink = ({clientChildren, adminChildren}) => {
    const userEmail = useSelector(selectEmail);
    
    if(userEmail === "admin@gmail.com"){
        return adminChildren;
    }
    return clientChildren;
};

export default ClientOnlyRoute
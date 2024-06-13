import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { selectEmail } from '../../redux/slice/authSlice'

const AdminOnlyRoute = ({children}) => {
    const userEmail = useSelector(selectEmail);
    
    if(userEmail === process.env.REACT_APP_ADMIN_USER){
        return children;
    }
    return (
        <section style={{height: "80vh"}}>
            <div className="container">
                <h2>Permission Denied.</h2>
                <p>This page can only be view by an Admin user.</p>
                <br />
                <Link to="/">
                <button className="--btn">
                    &larr; Back To Home
                </button>
                </Link>
            </div>
        </section>
    );
};

export default AdminOnlyRoute
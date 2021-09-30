import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/actions/userActions";

export default function User() {
    const dispatch = useDispatch();
    const user = useSelector((state) => {
        return state.user;
    });

    if (user.user === undefined) {
        dispatch(getUser(user.userId));
        return <p>Loading</p>;
    }

    return (
        <div className="user-container">
            <>
                <h1>hello {user.user.first_name}</h1>
                <a href="/">
                    <button>LOGOUT</button>
                </a>
            </>
        </div>
    );
}

import { Login } from "../features/login/Login"

export default function HeaderUI (){
    return (
        <div className="header">
            <Login />
        </div>
    )
}

//<p>{login ? 'Connected': 'Disconeted'}</p>
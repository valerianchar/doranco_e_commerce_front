import NavigationBar from "../../router";
import {useState} from "react";
import {Login} from "../../api/auth";

const LoginScreen = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleEmailChange = (e) => setEmail(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)
    const handleSubmit = (e) => {
        e.preventDefault()
        let body = {
            email: email,
            password: password,
        }
        Login(body)
    }

    return (
        <div className="flex flex-row justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input type="text" value={email} onChange={handleEmailChange} className="border-b-2" />
                <input type="password" value={password} onChange={handlePasswordChange} className="border-b-2" />
                <button type="submit">Connexion</button>
            </form>
        </div>
    )

}

export default LoginScreen
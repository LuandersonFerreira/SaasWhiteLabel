import { FaUser, FaLock } from "react-icons/fa";
import{ useState } from "react";
import "./Login.css";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState ("");

    const handleSubmit = (event) => {
        event.preventDefault();

        alert("Enviando os dados:" + username + " - " + password);
    };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Crie seu evento</h1>
        <div className="input-field">
            <input type="email" placeholder="Insira seu e-mail" 
            onChange={(e) => setUsername(e.target.value)}/>
            <FaUser className="icon" />
        </div>
        <div className="input-field">
            <input type="password" placeholder="insira sua senha" 
            onChange={(e) => setPassword(e.target.value)}/>
            <FaLock className="icon" />
        </div>

        <div className="recall-forget">
            <label>
                <input type="checkbox" />
                Lembre de mim
            </label>
            <a href="#">Esqueceu a senha ?</a>
        </div>

        <button>Enviar código de verificação</button>

        <div className="signup-link">
            <p><a href="#">Criar conta</a></p>
        </div>
      </form>
    </div>
  );
};

export default Login

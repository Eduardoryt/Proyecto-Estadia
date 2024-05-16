import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  console.log(isAuthenticated, user);

  //para cerrar sesion xD
  function recargarPagina() {
    window.location.reload();
  }

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <h1 className="text-2xl font-bold">
        <Link to={isAuthenticated ? "/soli" : "/"}>Solicitudes INEGO</Link>
      </h1>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li className="text-xl font-bold mr-4 ">
              Bienvenido: {user.username}
            </li>

            <li className="text-xl font-bold mr-4">
              <ButtonLink to="/soliPager">Solicitudes</ButtonLink>
            </li>
            <li className="text-xl font-bold mr-4">
              <ButtonLink to="/soli">Registrar Solicitud</ButtonLink>
            </li>
            <li>
              <Link
                to="/"
                onClick={recargarPagina}
                className="text-xl  font-bold"
              >
                Cerrar Sesión
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="text-2xl font-bold mr-4">
              <ButtonLink to="/login">Iniciar Sesión</ButtonLink>
            </li>
            <li className="text-xl font-bold mr-4">
              <ButtonLink to="/register">Registrarse</ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authService } from "../services/authService";
import type { ApiErrorResponse } from "../types/auth";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);

    setLoading(true);
    try {
      await authService.register({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError<ApiErrorResponse>(err)) {
        if (err.response?.data?.code === "EMAIL_EXISTS") {
          setServerError("El correo ya está registrado.");
        } else {
          setServerError(err.response?.data?.message ?? "No se pudo completar el registro.");
        }
      } else {
        setServerError("Error de conexión con el servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section>
        <h1>Crear cuenta</h1>
        <p>
          Regístrate para reservar salas de estudio en la biblioteca.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="name">
              Nombre completo
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              placeholder="Ana García"
            />
          </div>

          <div>
            <label htmlFor="email">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ana@example.test"
            />
          </div>

          <div>
            <label htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
            />
          </div>

          {serverError && (
            <p role="alert">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p>
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login">
            Inicia sesión
          </Link>
        </p>
      </section>
    </main>
  );
}

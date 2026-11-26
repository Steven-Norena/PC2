import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authService } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import type { ApiErrorResponse } from "../types/auth";

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Ingresa tu correo y contraseña.");
      return;
    }

    setLoading(true);
    try {
      const response = await authService.login({
        email: email.trim(),
        password,
      });
      login(response.token);
      navigate("/location", { replace: true });
    } catch (err) {
      if (axios.isAxiosError<ApiErrorResponse>(err)) {
        if (err.response?.status === 401) {
          setError("Credenciales incorrectas. Verifica tu correo y contraseña.");
        } else {
          setError(err.response?.data?.message ?? "No se pudo iniciar sesión.");
        }
      } else {
        setError("Error de conexión con el servidor.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section>
        <h1>Iniciar sesión</h1>
        <p>
          Accede para consultar.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="email">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="estudiante@example.test"
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
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p>
          ¿No tienes cuenta?{" "}
          <Link to="/register">
            Regístrate aquí
          </Link>
        </p>
      </section>
    </main>
  );
}

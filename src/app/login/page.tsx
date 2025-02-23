import Image from "next/image";

export default function LoginPage() {
  return (
    <>
      <div className="w-full flex flex-row">
        <div className="flex items-center justify-center h-screen bg-base-100 w-1/2">
          <div className="w-full max-w-md p-6 bg-neutral rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-4">
              Iniciar Sesión
            </h1>
            <form className="mt-4">
              {/* Correo Electrónico */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Correo Electrónico</span>
                </label>
                <input
                  type="email"
                  placeholder="Ingresa tu correo"
                  className="input input-bordered input-primary w-full bg-white"
                />
              </div>

              {/* Contraseña */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Contraseña</span>
                </label>
                <input
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  className="input input-bordered input-primary w-full bg-white"
                />
              </div>

              {/* Recordar y ¿Olvidaste tu contraseña? */}
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text">Recordar</span>
                </label>
                <a href="#" className="text-sm hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Botón Iniciar Sesión */}
              <button className="btn btn-primary w-full">Iniciar Sesión</button>
            </form>
          </div>
        </div>
        <div className="relative flex items-center justify-center h-screen bg-base-100 w-1/2">
          <Image
            className="object-cover"
            src="/backImage.jpg"
            fill
            alt="backgrounImage"
          />
        </div>
      </div>
    </>
  );
}

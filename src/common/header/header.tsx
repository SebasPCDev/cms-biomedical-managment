export default function HeaderComponent() {
  return (
    <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="text-2xl font-bold">Gestión de Equipos</div>
      <div>
        <button className="bg-blue-600 py-2 px-4 rounded-md">Perfil</button>
      </div>
    </div>
  );
}

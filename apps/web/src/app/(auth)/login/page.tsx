function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center">
        <img src="VillaizanLogo2png.png" className="w-[200px]"/>
        <p>Ingresa tus credenciales para acceder en el sistema</p>
        <input placeholder="Correo electrónico"/>
        <input placeholder="Contraseña"/>
        <button>Ingresar</button>

    </div>
  )
}
export default LoginPage
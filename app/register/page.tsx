export default function register() {
    return (
    <div >
        <div>
       <h1>Registro de Usuario</h1>
        </div>
        <form>

          <label htmlFor="username">Nombre de Usuario:</label>
          <input type="text" id="username" name="username"  placeholder="Username"  /><br />

          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" name="name" placeholder="Name" /><br />

          <label htmlFor="lastName">Apellido:</label>
          <input type="text" id="lastName" name="lastName" placeholder="Last Name"  /><br />

          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" /><br />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="Enter your email"  /><br />

          <label htmlFor="phoneNumber">Número de Teléfono:</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="Enter your phone"  /><br />

          <label htmlFor="isWizard">¿Es un mago?</label>
          <input type="checkbox" id="isWizard" name="isWizard" placeholder="isWizard" /><br />

          <input type="submit" value="Registrarse"></input>
       </form>
    </div>
    
    )
}
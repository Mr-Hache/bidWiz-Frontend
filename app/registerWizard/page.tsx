export default function registerWizard () {
    return(
        <div>
            <div>
                <h1>Wizard Register</h1>
            </div>
            <form>
            <label htmlFor="languages">Idiomas:</label>
            <select id="languages" name="languages" >
               <option value="english">Inglés</option>
               <option value="spanish">Español</option>
               <option value="portuguese">Portugués</option>
            </select><br />

            <label htmlFor="subjects">Materias:</label>
            <select id="subjects" name="subjects" >
                <option value="Psychology">Psicología</option>
                <option value="Sociology">Sociología</option>
                <option value="Psychology">Matematicas</option>
                <option value="Sociology">Fisica</option>
                <option value="Sociology">Quimica</option>
            </select><br />
          
            <label htmlFor="origin">Es originario de:</label>
            <input type="text" id="origin" placeholder="Wizard origin"/>

            <label htmlFor="experienceTitle">Título de Experiencia:</label>
            <input type="text" id="experienceTitle" placeholder="Add qualifications and experience"/>

            <label htmlFor="image">Imagen:</label>
            <input type="file" id="image" name="image" accept="image/jpeg, image/png" /><br></br>

            <input type="submit" value="Registrarse"></input>

            </form>
        </div>
    )
}
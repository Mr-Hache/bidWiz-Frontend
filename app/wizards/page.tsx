import style from "./wizards.module.css"

const cargarDatos = () => {
  return fetch('https://randomuser.me/api/?results=8', {cache: 'no-store'})
  .then(res => res.json())
  .then(datos => datos.results)
}

export default async function wizards() {
  const datos = await cargarDatos()

    return (
    <div className={style.content}>
      <div className={style.contentSec}>
        <span>Filter by:</span>
          <select>
            <option value="default">Subject</option>
            <option value="Programacion">Programación</option>
            <option value="Matematicas">Matemáticas</option>
            <option value="Marketing">Marketing</option>
            <option value="Algebra">Algebra</option>
          </select>

          <span>Filter by:</span>
          <select>
            <option value="default">Language</option>
            <option value="Español">Español</option>
            <option value="Ingles">Inglés</option>
            <option value="Portugues">Portugues</option>            
          </select>

          <span>Order by:</span>
          <select>
            <option value="default">Raiting</option>
            <option value="Mayor raiting">Mayor raiting</option>
            <option value="Menor raiting">Menor raiting</option>                        
          </select>

          <span>Order by:</span>
          <select>
            <option value="default">Unit price</option>
            <option value="Mayor precio">Mayor precio</option>
            <option value="Menor precio">Menor precio</option>                        
          </select>                 
      </div>     

      <div className={style.personas}>
      {datos.map((valor, indice) =>
        <div key={indice} className={style.persona}>                    
          <img src={valor.picture.large} alt="" />
          <p>{valor.name.first} {valor.name.last}</p>
        </div>
        )}
      </div>         
      
        
    </div>
    
    )
}



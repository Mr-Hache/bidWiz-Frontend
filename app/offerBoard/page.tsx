
import style from "./wizards.module.css"

const cargarDatos = async () => {
  const res = await fetch('https://randomuser.me/api/?results=8', { cache: 'no-store' })
  const datos = await res.json()
  return datos.results
}

export default async function offerBoard() {
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

      <div className={style.formMultiple}>
        <select name="" id="" multiple>
          <option value="">HTML</option>
          <option value="">CSS</option>
          <option value="">JavaScript</option>   
          <option value="">PHP</option>
          <option value="">Python</option>
          <option value="">React</option>
          <option value="">PHP</option>
          <option value="">SQL</option>
          <option value="">Mongo</option>       
        </select>
      </div>      

      <div className={style.personas}>
      {datos.map((valor, indice) =>
        <div key={indice} className={style.persona}>                    
          <img src={valor.picture.large} alt="" />
          <p>{valor.name.first} {valor.name.last}</p>
          <p>⭐⭐⭐⭐⭐</p>
        </div>
        )}
      </div>    

    </div>       
    )
}


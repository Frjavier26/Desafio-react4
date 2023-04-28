import { useState, useEffect } from "react";
import '../components/Api.css'


const Pokemon = () => {

    const [resultado, setResultado] = useState([])
    const [busqueda, setBusqueda] = useState([])
    const [sort, setSort] = useState("ASC")

    useEffect(() => {
        consultarInformacion();
    }, []);

    const consultarInformacion = async () => {
        const url = "https://pokeapi.co/api/v2/pokemon/"
        const response = await fetch(url)
        const data = await response.json()
        setResultado(data.results)
        setBusqueda(data.results)

    }

    //Filtro de busqueda    
    const inputBuscar = (e) => {
        e.preventDefault()
        if (e.target.value === "") {
            setResultado(busqueda)
        } else {
            let buscarPokemon = busqueda.filter(s => s.name.toLowerCase().includes(e.target.value))
            setResultado(buscarPokemon)
        }
    }

    // Boton para ordenar
    const ordenar = (e) => {

        if (sort === "ASC") {
            const orden = [...resultado].sort((a, b) => (a[e] > b[e] ? 1 : -1));
            setResultado(orden)
            setSort("DSC")
        } if (sort === "DSC") {
            const orden = [...resultado].sort((a, b) => (a[e] < b[e] ? 1 : -1))
            setResultado(orden)
            setSort("ASC")
        }
    }



    return (
        <div className="container">
            <h2>Buscar Pokemon</h2>
            <div className="search">

                <input className="buscador" onChange={(e) => { inputBuscar(e) }} type="text" />
                <button className="btn" id="boton" onClick={(e) => { ordenar(e) }} >Ordenar pokemon</button>
            </div>

            <div className="principal">
                <ul>
                    {resultado.map((pokemon, i) =>

                        <div className="card" key={i} >
                            <div className="name">
                               <li>{pokemon.name} </li> 
                            </div>

                            <div className="url">
                               <a target="blank" href={pokemon.url}>{pokemon.url}</a>
                            </div>

                        </div>
                    )}
                </ul>

            </div>

        </div>
    )
}

export default Pokemon
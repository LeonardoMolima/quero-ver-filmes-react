import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import './favoritos.css';

import { Link } from 'react-router-dom';


function Favoritos(){

    const [filmes, setFilmes] = useState([]);

    useEffect(() => {

        const minhaLista = localStorage.getItem("@queroVerFilmes");
        setFilmes(JSON.parse(minhaLista) || []);

    }, []);

    function excluirFilme(id){
        let filtroFilmes = filmes.filter( (filme) => {
            return(filme.id !== id)
        }) 

        setFilmes(filtroFilmes);
        localStorage.setItem("@queroVerFilmes", JSON.stringify(filtroFilmes));
        toast('✔️ Filme removido com sucesso!');
    }

    return (
        <div className='meus-filmes'>
            <h1>Minha Lista</h1>

            {filmes.length === 0 && <span>Nenhum filme salvo.</span>}

            <ul>
                {filmes.map((filme)=> {
                    return(
                        <li key={filme.id}>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
                            <span>{filme.title}</span>
                            <div>
                                <Link to={`/filme/${filme.id}`}>Ver Detalhes</Link>
                                <button onClick={() => excluirFilme(filme.id)}>Remover</button>
                            </div>
                        </li>
                        
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;
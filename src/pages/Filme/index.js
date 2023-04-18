import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

import './filme.css';

import api from '../../services/api';

function Filme (){

    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params: {
                    api_key:process.env.REACT_APP_API_KEY,
                    language: 'pt-BR',
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                navigate("/", {replace:true});
                return
            });
        }

        loadFilme();

        return () => {
            console.log('COMPONENTE DESMONTADO');
        }
    },[navigate, id]);

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@queroVerFilmes");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilmes = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id);

        if(hasFilmes){
            toast('Esse filme já está na sua lista!');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@queroVerFilmes", JSON.stringify(filmesSalvos));
        toast('✔️ Filme salvo com sucesso!');
    }

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando Detalhes...</h1>
            </div>
        )
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average.toFixed(1)} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target='blank' rel='external' href={`https://www.youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    )
}

export default Filme;
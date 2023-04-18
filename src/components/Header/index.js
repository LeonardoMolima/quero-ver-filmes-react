import './header.css'
import { Link } from 'react-router-dom';


function Header(){
    return(
        <div>
        <header>
            <Link className='logo' to="/">
            <span>Quero Ver</span>
                <br/> 
            <span className='logoFilmes'>Filmes</span>
            </Link>
            <Link className='favoritos' to='/favoritos'>Minha Lista</Link>
        </header>
        </div>
    )
}

export default Header;
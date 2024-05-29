import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const Home = () => {
    return ( <div>
        <Link to="/login">
            <Button variant="info" type="button" className="w-100">Zaloguj się</Button>
        </Link>
    </div> );
}
 
export default Home;
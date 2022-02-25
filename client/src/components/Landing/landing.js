import styles from './landing.module.css';
import { Link } from 'react-router-dom';



// TODO arreglar problema de escalado de la pagina
export default function LandingPage() {
    return (
        <div className={styles.mainDiv}>
            {/* <img src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/WVUERN2UUZDXHPHOX6LCBCGAPQ.jpg" alt="404 NOT FOUND" /> */}
            <Link to='/home'>
                <button className={styles.buttonLanding} > Go to main page </button>
            </Link>

        </div>
    )
}
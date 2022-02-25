import styles from './recipe.module.css'
import altImg from './fast-food-meal-icon-drawn-in-chalk-vector-6064737.jpg'


let id = 0;

export default function RecipeCard(props) {
    return (

        <div className={styles.recipeCard}>
            <h4 className={styles.recipeName}>{props.name}</h4>
            {
                props.image ?
                    <img src={props.image} alt='404 Not Found' />
                    : <img src={altImg} alt='404 Not Found'/>

            }
            <div className={styles.typeOfDietContainer}> Type of Diet:
                <ul className={styles.dietList}>
                    {props.diets.map(diet => <li key={id++}>{diet} </li>)}
                </ul>
            </div>
            <span className={styles.calficationSpan}>Calification: {props.calification}</span>
            <span className={styles.healthySpan}>Healthy Score: {props.healthy}</span>
        </div>
    )
}
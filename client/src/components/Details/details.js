import { useEffect } from "react"
import { useParams } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import { getDetails, cleanDetails } from "../../store/actions"
import { Link } from "react-router-dom"
import styles from './details.module.css'
import altImg from './fast-food-meal-icon-drawn-in-chalk-vector-6064737.jpg'

export default function Details(props) {
    const dispatch = useDispatch()
    const id = useParams()
    let recipeDetails = useSelector(state => state.details)
    if (Array.isArray(recipeDetails)) recipeDetails = recipeDetails[0]


    useEffect(() => {
        dispatch(getDetails(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        return () => {
            dispatch(cleanDetails())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const createMarkup = () => {
        return { __html: recipeDetails.description }
    }



    return (
        <div className={styles.detailsMainDiv}>
            <Link to='/home'>
                <span className={styles.returnArrow} />
            </Link>
            <div className={styles.detailsContainer}>
                {recipeDetails.name ?
                    <><div className={styles.detailsRecipeName}>  {recipeDetails.name} </div>
                        {
                            recipeDetails.image ? 
                            <img className={styles.detailsImage} src={recipeDetails.image} alt="Not found"/>
                            : <img src={altImg} alt='404 Not Found'/>
                        }
                        <div className={styles.detailsDescription} dangerouslySetInnerHTML={createMarkup()} /><div>
                            <div className={styles.detailsScoresContainer}>
                                <span className={styles.detailsCalificationSpan}> Calification: {recipeDetails.calification} </span>
                                <span className={styles.detailsHealthySpan}> Healthy Score: {recipeDetails.healthy}</span>
                            </div>
                        </div>
                        <div className={styles.dietAndDishContainer}>
                            <div className={styles.dishTypeContainer}>
                                Dishtypes:
                                <ul className={styles.dishTypeList}>
                                    {recipeDetails.dishType && recipeDetails.dishType.map(el => {
                                        return <li key={el}>  {el}</li>
                                    })}
                                </ul>
                            </div>
                            <div className={styles.detailsDietsContainer}>
                                <span className={styles.dietsSpan}>Diets:</span>
                                {recipeDetails.diets && recipeDetails.diets.map(el => {
                                    return <li key={el}> {el} </li>
                                })}
                            </div>
                        </div>
                        <div className={styles.stepsToStepContainer}>
                            Step To Step:
                            <ol>
                                {recipeDetails.stepToStep ? recipeDetails.stepToStep.map(el => {
                                    return <li key={el.number}> {el.step} </li>
                                }) : <div> This recipe don't have steps </div>}
                            </ol>
                        </div></>
                    : <div> Loading... </div>}
            </div>
        </div>
    )
}
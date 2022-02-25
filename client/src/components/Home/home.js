import styles from './home.module.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchRecipe, filterByname, filterByDiet, filterByCA } from '../../store/actions';
import RecipeCard from '../RecipeCard/recipe';
import Pagination from '../Pagination/pagination';
import { Link } from 'react-router-dom';




export default function HomePage() {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.foods);

    // Estados de la busqueda
    const [search, setSearch] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        dispatch(searchRecipe())
        setIsLoading(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Estados de los filtros
    const [ByDiet, setByDiet] = useState("none");
    const [ByAlphaOrCal, setByAlphaOrCal] = useState("byCalification");
    const [ByOrder, setByOrder] = useState("Asc");

    // Estados del paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [foodPerPage] = useState(9);
    const indexLastFood = currentPage * foodPerPage; // 9
    const indexFirstFood = indexLastFood - foodPerPage; // 0
    const currentFoods = recipes.slice(indexFirstFood, indexLastFood);

    const pagination = (page) => {
        setCurrentPage(page);
    }

    // Handlers
    const handleSubmitSearch = async (e) => {
        e.preventDefault();
        dispatch(filterByname(search))
        setError("Recipe Don't Found")
        setSearch("")
        setIsLoading(false)
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleChangeDietFilter = (e) => {
        setByDiet(e.target.value)
    }

    const handleChangeAlphaOrCal = (e) => {
        setByAlphaOrCal(e.target.value)
    }

    const handleChangeOrderFilter = (e) => {
        setByOrder(e.target.value)
    }

    const onClickFilter = (e) => {
        dispatch(filterByDiet(ByDiet))
        dispatch(filterByCA(ByOrder, ByAlphaOrCal))
    }

    

    


    return (
        <div className={styles.mainDivHome} >
            <nav className={styles.navBarHome}>
                <div classname={styles.searchBar}>
                    {/* Formulario Busqueda */}
                    <form onSubmit={handleSubmitSearch}>
                        <input type='text' value={search} onChange={handleChangeSearch} className={styles.searchInput} placeholder='Recipe...' />
                        <button className={styles.searchButton} >Search</button>
                    </form>
                </div>


                {/* Filtro Por Dieta */}
                <div>
                    <select onChange={handleChangeDietFilter} className={styles.filterSelectors}>
                        <option value="none"> --Select Diet-- </option>
                        <option value="gluten free"> Gluten Free </option>
                        <option value="dairy free"> Dairy Free </option>
                        <option value="ketogenic"> Ketogenic </option>
                        <option value="vegetarian"> Vegetarian </option>
                        <option value="lacto ovo vegetarian"> Lacto-Vegetarian </option>
                        <option value="lacto ovo vegetarian"> Ovo-Vegetarian </option>
                        <option value="vegan"> Vegan </option>
                        <option value="pescatarian"> Pescatarian </option>
                        <option value="paleolithic"> Paleolithic </option>
                        <option value="primal"> Primal </option>
                        <option value="fodmap friendly"> Low FODMAP </option>
                        <option value="whole 30"> Whole30 </option>
                    </select>

                    {/* Filtro Por Calificacion O Alfabeticamente */}
                    <select onChange={handleChangeAlphaOrCal} value={ByAlphaOrCal} className={styles.filterSelectors}>
                        <option value="byCalification"> By Calification </option>
                        <option value="byAlpha"> Alphabetical </option>
                    </select>

                    {/* Filtro Por Orden*/}
                    <div>
                        <label className={styles.labelsFilters}> <input
                            type="radio"
                            name='orderFilter'
                            value="Asc"
                            onChange={handleChangeOrderFilter}
                        />  Upward  </label>

                        <label className={styles.labelsFilters}> <input
                            type="radio"
                            name='orderFilter'
                            value="Desc"
                            onChange={handleChangeOrderFilter}
                        />  Downward </label>
                    </div>

                    <button className={styles.filterButton} onClick={() => onClickFilter()}> Filter </button>
                    {/* Boton Filtrar */}
                </div>


                <Link to='/create' className={styles.createRecipe}>
                    <div>Create Recipe</div>
                </Link>

            </nav>
            {/* // TODO darle estilos al boton de paginado */}
            {/* Pagination Numbers y RecipeCards */}
            {recipes.length ?
                <><Pagination
                    recipes={recipes.length}
                    pagination={pagination}
                    foodPerPage={foodPerPage}
                />
                    <div className={styles.cardContainer}>
                        {currentFoods.length > 0 ? currentFoods.map(r => {
                            return <Link className={styles.anchorRecipeCard} key={r.id} to={`/recipe/${r.id}`}>
                                <RecipeCard
                                    id={r.id}
                                    name={r.name}
                                    image={r.image}
                                    diets={r.diets}
                                    calification={r.calification}
                                    healthy={r.healthy} />
                            </Link>;
                        })
                            : <h2> {error} </h2>}
                    </div></>
                : isLoading ? <div> Loading... </div> : <div> Recipe Don't Found </div> }
        </div>
    )
}


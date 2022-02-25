
import styles from './pagination.module.css'

// recipes, pagination, foodPerPage

export default function pagination(props) {
	const pagesNum = [];
	
	for (let i = 0; i < Math.ceil(props.recipes / props.foodPerPage); i++) {
		pagesNum.push(i + 1)
	}

	const onClick = (number) => {
		props.pagination(number)
	}


	return (
		<nav className={styles.paginationContainer}>
			<ul>
				{
					pagesNum.length && pagesNum.map(number => {
						return <li key={number}>
							{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
							<button className={styles.paginationButton} onClick={() => onClick(number)}> {number} </button>
						</li>
					})
				}
			</ul>
		</nav>
	)
}
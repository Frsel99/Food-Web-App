import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createRecipe } from "../../store/actions";
import styles from './create.module.css'
import altImage from './fast-food-meal-icon-drawn-in-chalk-vector-6064737.jpg'


export default function CreateRecipe(props) {
	const dispatch = useDispatch();

	const [newRecipe, setNewRecipe] = useState({
		name: "",
		description: "",
		calification: undefined,
		healthy: undefined,
		stepToStep: [],
		diets: [],
		image: "",
	});

	useEffect(() => {
		setErrors(validation({
			...newRecipe, name: newRecipe.name
		}))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])



	const [dietInput, setDietInput] = useState("gluten free");
	const [stepNum, setStepNum] = useState(1)
	const [step, setStep] = useState({
		number: 1,
		step: "asd",
	})

	const [errors, setErrors] = useState({})

	function validation(newRecipe) {
		let errors = {};

		if (!newRecipe.name) errors.name = "Required";
		else if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(newRecipe.name)) errors.name = "Can't contain special characters"

		if (!newRecipe.description) errors.description = "Required";
		else if (newRecipe.description.includes('@') || newRecipe.description.includes('<') || newRecipe.description.includes('>')) errors.description = "Formatt is invalid"

		if (!newRecipe.calification) errors.calification = "Required";
		if (newRecipe.calification && newRecipe.calification > 100) errors.calification = "The max calification is 100"

		if (!newRecipe.healthy) errors.healthy = "Required";
		if (newRecipe.healthy && newRecipe.healthy > 100) errors.healthy = "The max calification is 100"

		return errors;
	}

	const handleChangeRecipe = (e) => {
		setNewRecipe({
			...newRecipe, [e.target.name]: e.target.value
		})
		setErrors(validation({
			...newRecipe,
			[e.target.name]: e.target.value
		}));

	}

	const handleChangeDietInput = (e) => {
		setDietInput(e.target.value);
	}

	const onClickDiets = (e) => {
		e.preventDefault();
		if (!newRecipe.diets.includes(dietInput)) {
			setNewRecipe({
				...newRecipe, diets: [...newRecipe.diets, dietInput]
			})
		}
	}

	const handleFocusSteps = (e) => {
		e.preventDefault()
		const number = parseInt(e.target.name)
		setStep({
			number,
			step: e.target.value
		})
	}
	const handleChangeSteps = (e) => {
		setStep({
			number: step.number,
			step: e.target.value
		})
	}

	const onBlurSteps = (e) => {
		e.target.value = e.target.value.replace(/[\r\n\v]+/g, '')
	}

	const onClickSteps = (e) => {
		e.preventDefault()
		if (e.target.value === '-' && stepNum === 0) return;
		if (e.target.value === "+" && stepNum < 20) setStepNum(stepNum + 1)
		if (e.target.value === '-' && stepNum > 0) setStepNum(stepNum - 1)
	}

	const onClickUpdateSteps = (e) => {
		e.preventDefault(e);
		// if (!stepsCopy[step.number - 1]) stepsCopy.push(step)
		if (!newRecipe.stepToStep[step.number - 1]) {
			setNewRecipe({
				...newRecipe, stepToStep: [...newRecipe.stepToStep, step]
			});
		}
		else if (newRecipe.stepToStep[step.number - 1].number === step.number) {
			let allSteps = [...newRecipe.stepToStep]
			let specificStep = [...allSteps][step.number - 1]
			specificStep.step = step.step
			allSteps[step.number - 1] = specificStep;
			setNewRecipe({
				...newRecipe, stepToStep: allSteps
			})
		}

	}

	const onClickCreateRecipe = (e) => {
		dispatch(createRecipe(newRecipe))
	}

	const steps = [];
	for (let i = 0; i < stepNum; i++) {
		steps.push(<div key={i}> Step {i + 1}
			<textarea
				name={i + 1}
				onFocus={handleFocusSteps}
				onChange={handleChangeSteps}
				onBlur={onBlurSteps}

			/>
		</div>)
	}




	return (
		<div className={styles.createRecipeContainer}>
			<Link className={styles.returnArrowCreate} to='/home'>

			</Link>
			<form className={styles.formCreate}>
				<div>
					<label> Name*: </label>
					<input
						type="text"
						value={newRecipe.name}
						name="name"
						onChange={handleChangeRecipe}
						autocomplete="off"
					/>
					{errors.name && <span>{errors.name}</span>}
				</div>
				<div>
					<label> Description*: </label>
					<textarea
						type="text"
						value={newRecipe.description}
						name="description"
						onChange={handleChangeRecipe}
						autocomplete="off"
					/>
					{errors.description && <span>{errors.description}</span>}
				</div>
				<div>
					<label> Calification*: </label>
					<input
						type="number"
						value={newRecipe.calification}
						name="calification"
						onChange={handleChangeRecipe}
						autocomplete="off"
					/>
					{errors.calification && <span>{errors.calification}</span>}
				</div>
				<div>
					<label> Healthy Score*: </label>
					<input
						type="number"
						value={newRecipe.healthy}
						name="healthy"
						onChange={handleChangeRecipe}
						autocomplete="off"
					/>
					{errors.healthy && <span>{errors.healthy}</span>}
				</div>
				<div> Step To Step:
					<div>
						<button onClick={onClickSteps} value="-"> - </button>
						<button onClick={onClickSteps} value="+"> + </button>
					</div>
					{steps}
					<div>
						<button onClick={onClickUpdateSteps}> Update Steps </button>
					</div>
				</div>

				<div>
					<label> Diets:
						<select name="diets" onChange={handleChangeDietInput}>
							<option value="Gluten Free"> Gluten Free </option>
							<option value="Dairy Free"> Dairy Free </option>
							<option value="Ketogenic"> Ketogenic </option>
							<option value="Vegetarian"> Vegetarian </option>
							<option value="Lacto-Vegetarian"> Lacto-Vegetarian </option>
							<option value="Ovo-Vegetarian"> Ovo-Vegetarian </option>
							<option value="Vegan"> Vegan </option>
							<option value="Pescatarian"> Pescatarian </option>
							<option value="Paleolithic"> Paleolithic </option>
							<option value="Primal"> Primal </option>
							<option value="Low FODMAP"> Low FODMAP </option>
							<option value="Whole30"> Whole30 </option>
						</select>
						<button onClick={onClickDiets}> + </button>
					</label>
				</div>
				<div>
					<label> Image URL:  </label>
					<input
						type="text"
						value={newRecipe.image}
						name="image"
						onChange={handleChangeRecipe}
						autocomplete="off"
					/>
					{errors.image && <span>{errors.image}</span>}
				</div>
			</form>

			<br />

			<div className={styles.recipePreview}>
				Recipe Preview:
				<div className={styles.previewName}>{newRecipe.name ? newRecipe.name : "--------"}</div>
				{
					newRecipe.image ?
						<img className={styles.previewImage} src={newRecipe.image} alt='404 Not Found' />
						: <img className={styles.previewImage} src={altImage} alt='404 Not Found' />

				}
				<div className={styles.previewDescription}>{newRecipe.description ? newRecipe.description : "--------"}</div>
				<span className={styles.previewScores}> Calification: {newRecipe.calification ? newRecipe.calification : "--------  "}</span>
				<span> Healthy Score: {newRecipe.healthy ? newRecipe.healthy : "  --------"}</span>
				<div className={styles.previewDiets}>
					Diets:
					<ul>
						{newRecipe.diets.length ? newRecipe.diets.map(el => {
							return <li key={el}> {el} </li>
						})
							: "--------"}
					</ul>
				</div>
				<div className={styles.previewSteps}>
					Step To Step:
					<ul>
						{newRecipe.stepToStep.length && newRecipe.stepToStep[0].step ? newRecipe.stepToStep.map(el => {
							return <li key={el.number}> Step {el.number}. {el.step} </li>
						})
							: "-------"
						}
					</ul>
				</div>
				<br />
				{errors.name || errors.description || errors.calification || errors.healthy ? "One or more essential camps are wrong or empty"
					: <Link to='/home'><button onClick={onClickCreateRecipe}> Add Recipe </button></Link>
				}

			</div>
		</div>
	)
}
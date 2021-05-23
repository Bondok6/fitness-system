import React, { useEffect, useState } from 'react';
import axios from 'axios';
import s from './Profile/Profile/Profile.module.css';
import AddIcon from '@material-ui/icons/Add';
import Spinner from '../UI/Spinner/Spinner';

function FoodPopup(props) {
	const [ loading, setLoading ] = useState(false);

	const [ alCalories, setAlCalories ] = useState(0);
	let allCalories = 0;
	// console.log(props.param)
	// console.log(props.outer)

	useEffect(
		() => {
			setCalPg(0);
			setMyIngredients([]);
			setAlCalories(0);
			setSearch('');
		},
		[ props.food ]
	);

	useEffect(
		() => {
			props.food.f.map((f) => {
				allCalories += parseFloat(f.food.cal) / parseFloat(f.food.gram) * parseFloat(f.grams);
			});
			setAlCalories(allCalories);
		},
		[ props.food ]
	);

	const [ search, setSearch ] = useState();
	const [ response, setResponse ] = useState();

	useEffect(
		() => {
			axios
				.get(`search-additions?food=${search}`)
				.then((res) => {
					setResponse(res.data.docs);
				})
				.catch((err) => {
					console.error(err);
				});
		},
		[ search ]
	);

	const [ calPg, setCalPg ] = useState(0);

	const [ myIngredients, setMyIngredients ] = useState([]);

	const clickIngredient = (ing) => {
		if ([ ing, ...myIngredients ].length === new Set([ ing, ...myIngredients ]).size) {
			let calPerGrams = 0;
			ing.userGrams = 1;
			calPerGrams = parseFloat(ing.cal).toPrecision(5) / parseFloat(ing.gram).toPrecision(5);
			var res = calPg + calPerGrams;

			res = parseFloat(res);

			setMyIngredients([ ...new Set([ ing, ...myIngredients ]) ]);

			setCalPg(res);
		}
	};
	const removeIngredient = (ing) => {
		let calPerGrams = 0;
		calPerGrams = parseFloat(ing.cal).toPrecision(5) / parseFloat(ing.gram).toPrecision(5);

		calPerGrams = calPerGrams * ing.userGrams;

		if (parseFloat(calPg - calPerGrams) < 0.001) {
			setCalPg(0);
			setMyIngredients([]);
		} else {
			setCalPg(parseFloat(calPg - calPerGrams));

			setMyIngredients(myIngredients.filter((i) => i._id !== ing._id));
		}
	};

	const updateHandler = () => {
		console.log(alCalories , calPg);
		if (alCalories >= calPg) {
			setLoading(true);
			let arr = [];
			myIngredients.map((i) => {
				arr.push({
					food: i._id,
					grams: i.userGrams
				});
			});
			axios
				.put(`updateAdd`, {
					outerSystem: props.outer,
					innerSystem: props.inner,
					foodId: props.food._id,
					food: arr
				})
				.then((res) => {
					//   setResponse(res.data.docs);
					setCalPg(0);
					setMyIngredients([]);
					setAlCalories(0);
					setLoading(false);
					setSearch('');
				})
				.catch((err) => {
					console.error(err);
					setLoading(false);
					setSearch();
					setCalPg(0);
					setMyIngredients([]);
					setAlCalories(0);
				});
		}
	};

	let table = (
		<div style={{ color: '#fff' }}>
			<input
				style={{ margin: ' 0 auto', display: 'block', color: '#fff' }}
				type="search"
				placeholder="Search For Food .. "
				onChange={(e) => {
					return setSearch(e.target.value);
				}}
			/>
			<div className={s.Images__btns}>
				<div className={s.additions}>
					{response ? (
						response.map((r) => {
							return (
								<button style={{ position: 'relative', cursor: 'auto' }}>
									{r.food}
									<div
										style={{
											position: 'absolute',
											top: '1px',
											right: '1px',
											cursor: 'pointer'
										}}
										onClick={() => clickIngredient(r)}
									>
										{' '}
										<AddIcon />
									</div>
								</button>
							);
						})
					) : (
						''
					)}
				</div>
			</div>
			<div className={s.myFood}>
				<div className={s.myfood__name}>Current Food</div>
				<div className={s.myfood__cal}>Current Calories</div>
			</div>
			<div className={s.myFood}>
				<div>
					{props.food.f.map((f,i) => {
						return <button key={i}>{f.food.food}</button>;
					})}
				</div>
				<div className={s.cal_num}>{alCalories}</div>
				{/* <div>{calPg}</div> */}
			</div>
			<hr />
			<div className={s.newFood}>
				<div className={s.newFood__name}> New Food </div>
				<div style={{ display: 'flex' }}>
					{' '}
					{myIngredients.map((m,i) => (
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center'
							}}
							key={i}
						>
							<button
								onClick={() => removeIngredient(m)}
								style={{
									border: '1px solid',
									background: 'black',
									color: '#d9a404',
									marginRight: '5px',
									marginBottom: '5px'
								}}
							>
								{' '}
								{m.food}{' '}
							</button>

							<div style={{ display: 'flex' }}>
								{' '}
								<span style={{ margin: '0 5px' }}>{m.userGrams}</span>{' '}
								<input
									style={{ width: '70px', height: '30px' }}
									type="number"
									defaultValue="1"
									//   value={m.userGrams}
									onChange={(e) => {
										var indexOfStevie = myIngredients.findIndex((i) => i._id === m._id);
										// console.log(indexOfStevie)
										let ings = myIngredients;
										let calo =
											calPg -
											ings[indexOfStevie].userGrams *
												(parseFloat(m.cal).toPrecision(5) / parseFloat(m.gram).toPrecision(5));
										ings[indexOfStevie].userGrams = e.target.value;
										ings[indexOfStevie].userGrams = e.target.value;
										setMyIngredients(ings);
										setCalPg(
											calo +
												ings[indexOfStevie].userGrams *
													(parseFloat(m.cal).toPrecision(5) /
														parseFloat(m.gram).toPrecision(5))
										);
									}}
								/>
							</div>
						</div>
					))}{' '}
				</div>
			</div>
			<div className={s.newFood}>
				<div className={s.newFood__cal}> New Calories</div>
				<div className={s.newFood_cal_num}>{parseFloat(calPg).toPrecision(5)}</div>
			</div>
			{props.param ? (
				''
			) : (
				<button
					style={{
						border: '1px solid',
						background: 'black',
						color: '#d9a404',
						marginRight: '5px',
						marginBottom: '5px',
						paddingRight: '15px',
						paddingLeft: '15px',
						display: 'block',
						margin: 'auto'
					}}
					onClick={() => updateHandler()}
				>
					{' '}
					Update Item{' '}
				</button>
			)}
		</div>
	);

	if (loading) table = <Spinner />;

	return table;
}

export default FoodPopup;

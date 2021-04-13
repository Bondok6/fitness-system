import React, { useEffect, useState, useRef } from 'react';
import s from './Profile.module.css';
import add from '../../images/add.png';
// import profile from "../../images/profile.jpg";
import line from '../../images/svg/line.svg';
import axios from 'axios';
import moment from 'moment';
import Alert from '@material-ui/lab/Alert';
import Spinner from '../../UI/Spinner/Spinner';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import LineChart from '../../Components/chartjs';
import Star from '../../images/svg/star.svg';
import User from '../../images/profile.jpg';

function generateRanges(startDate, endDate) {
	let current = moment(startDate, 'DD/MM/YYYY');
	const end = moment(endDate, 'DD/MM/YYYY');
	let weeks = [];
	while (current < end) {
		let l = current.add(7, 'days');
		weeks = [ ...weeks, l.format('YYYY-MM-DD') ];
	}
	return weeks;
}

function Profile(props) {
	const [ profile, setProfile ] = useState();
	const imga = useRef();
	const labe = useRef();
	const alert = useRef();

	const [ loading, setLoading ] = useState(false);
	const [ loading2, setLoading2 ] = useState(false);
	const [ loading3, setLoading3 ] = useState(false);

	const [ update, setUpdate ] = useState();
	const [ system, setSystem ] = useState();
	const [ dates, setDates ] = useState([]);

	const [ current, setCurrent ] = useState('');

	const [ h, setH ] = useState();
	const [ w, setW ] = useState();

	const height = useRef();
	const weight = useRef();

	const [ weeks, setWeeks ] = useState([]);
	const [ weekIndex, setWeekIndex ] = useState(0);

	const [ currentWeekWeight, setCurrentWeekWeight ] = useState([]);
	const [ currentWeekPerfectPath, setCurrentWeekPerfectPath ] = useState([]);

	const [ trainers, setTrainers ] = useState([]);

	useEffect(
		() => {
			axios
				.get('fetch-profile')
				.then((res) => {
					setProfile(res.data.user);
					setSystem(res.data.system);
					let newWeeks = generateRanges(
						moment(res.data.system.perfectPathes[0].date).format('DD/MM/YYYY'),
						moment(res.data.system.perfectPathes[res.data.system.perfectPathes.length - 1].date).format(
							'DD/MM/YYYY'
						)
					);
					setWeeks(newWeeks);
					if (weekIndex === 0) {
						if (weekIndex + 1 !== newWeeks.length) {
							let ws = [];
							let pws = [];
							res.data.user.weights.map((w) => {
								if (
									moment(w.date).isBetween(
										moment(newWeeks[weekIndex]),
										moment(newWeeks[weekIndex + 1])
									)
								) {
									ws.push(w.weight);
								}
							});
							setCurrentWeekWeight(ws);
							res.data.system.perfectPathes.map((w) => {
								if (
									moment(w.date).isBetween(
										moment(newWeeks[weekIndex]),
										moment(newWeeks[weekIndex + 1])
									)
								)
									pws.push(w.weight);
							});
							setCurrentWeekPerfectPath(pws);
						}
					}
				})
				.catch((err) => {
					console.error(err);
				});

			axios
				.get('getDates')
				.then((res) => {
					setDates(res.data.syst);
					setCurrent(res.data.syst[0].date);
				})
				.catch((err) => {
					console.error(err);
				});
		},
		[ loading, loading2, loading3, props.open2 ]
	);

	useEffect(() => {
		axios.get('/fetch-gyms?limit=3').then((res) => {
			setTrainers(res.data.docs);
		});
	}, []);

	const leftToggle = () => {
		var indexOfStevie = dates.findIndex((i) => i.date === current);
		if (indexOfStevie !== 0) {
			setCurrent(dates[indexOfStevie - 1].date);
			axios
				.get(`getSystemByDate?date=${current}`)
				.then((res) => {
					setSystem(res.data);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};

	const rightToggle = () => {
		var indexOfStevie = dates.findIndex((i) => i.date === current);
		if (indexOfStevie !== dates.length - 1) {
			setCurrent(dates[indexOfStevie + 1].date);
			axios
				.get(`getSystemByDate?date=${current}`)
				.then((res) => {
					setSystem(res.data);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};

	const leftToggleChart = () => {
		if (weekIndex - 1 !== -1) {
			let ws = [];
			let pws = [];
			profile.weights.map((w) => {
				if (moment(w.date).isBetween(moment(weeks[weekIndex - 1]), moment(weeks[weekIndex]))) ws.push(w.weight);
			});
			setCurrentWeekWeight(ws);
			system.perfectPathes.map((w) => {
				if (moment(w.date).isBetween(moment(weeks[weekIndex - 1]), moment(weeks[weekIndex])))
					pws.push(w.weight);
			});
			setCurrentWeekPerfectPath(pws);
			let nextWeek = weekIndex - 1;

			setWeekIndex(nextWeek);
		}
	};

	const rightToggleChart = () => {
		if (weekIndex + 1 !== weeks.length) {
			let ws = [];
			let pws = [];
			profile.weights.map((w) => {
				if (moment(w.date).isBetween(moment(weeks[weekIndex + 1]), moment(weeks[weekIndex + 2])))
					ws.push(w.weight);
			});
			setCurrentWeekWeight(ws);
			system.perfectPathes.map((w) => {
				if (moment(w.date).isBetween(moment(weeks[weekIndex + 1]), moment(weeks[weekIndex + 2])))
					pws.push(w.weight);
			});
			setCurrentWeekPerfectPath(pws);
			let nextWeek = weekIndex + 1;
			setWeekIndex(nextWeek);
		}
	};

	const addWeight = () => {
		if (w) {
			setLoading2(true);
			axios
				.post(`weight`, { weight: w })
				.then((res) => {
					weight.current.style.display = 'none';
					alert.current.style.visibility = 'visible';
					alert.current.style.opacity = '1';
					setLoading2(false);
				})
				.catch((err) => {
					console.error(err);
					setLoading2(false);
				});
		}
	};
	const addHeight = () => {
		if (h) {
			setLoading3(true);
			axios
				.post(`height`, { height: h })
				.then((res) => {
					height.current.style.display = 'none';
					alert.current.style.visibility = 'visible';
					alert.current.style.opacity = '1';
					setLoading3(false);
				})
				.catch((err) => {
					console.error(err);
					setLoading3(false);
				});
		}
	};

	let updateButton = (
		<label
			style={{
				background: 'black',
				color: '#d9a404',
				width: '100px',
				marginRight: '10px',
				marginBottom: '10px',
				textAlign: 'center',
				cursor: 'pointer'
			}}
			className={s.Images__update}
			htmlFor="update"
		>
			update
		</label>
	);
	if (loading === true) {
		updateButton = <Spinner />;
	}

	let weightComponent = (
		<div>
			<img
				src={add}
				alt="add"
				style={{ cursor: 'pointer' }}
				onClick={() => (weight.current.style.display = 'block')}
			/>{' '}
			<span>Weight: </span>
			{profile ? profile.weights ? profile.weights[0] ? (
				profile.weights[profile.weights.length - 1].weight
			) : (
				''
			) : (
				''
			) : (
				''
			)}
			kg
			<div style={{ display: 'none' }} ref={weight}>
				<input
					type="number"
					onChange={(e) => setW(e.target.value)}
					style={{ height: '30px', padding: 'auto', width: 'auto' }}
				/>
				<button
					style={{
						width: '100px',
						backgroundColor: '#181303',
						color: '#d9a404',
						border: 'none',
						marginLeft: '1px'
					}}
					onClick={() => addWeight()}
				>
					Add Weight
				</button>
			</div>
		</div>
	);

	if (loading3) weightComponent = <Spinner />;

	let heightComponent = (
		<div>
			<img
				src={add}
				alt="add"
				style={{ cursor: 'pointer' }}
				onClick={() => (height.current.style.display = 'block')}
			/>
			<span>height: </span>
			{profile ? profile.heights ? profile.heights[0] ? (
				profile.heights[profile.heights.length - 1].height
			) : (
				''
			) : (
				''
			) : (
				''
			)}
			cm
			<div style={{ display: 'none' }} ref={height}>
				<input
					type="number"
					onChange={(e) => setH(e.target.value)}
					style={{ height: '30px', padding: 'auto', width: 'auto' }}
				/>
				<button
					style={{
						width: '100px',
						backgroundColor: '#181303',
						color: '#d9a404',
						border: 'none',
						marginLeft: '1px'
					}}
					onClick={() => addHeight()}
				>
					Add Height
				</button>
			</div>
		</div>
	);

	if (loading2) heightComponent = <Spinner />;

	return (
		<section className={s.profile}>
			<div className="container">
				<div>
					<img className={s.line} src={line} alt="line" />
					<div className={s.circle}>
						<img
							className={s.profile_img}
							src={
								profile ? profile.photo ? (
									profile.photo
								) : (
									'https://picsum.photos/220/220'
								) : (
									'https://picsum.photos/220/220'
								)
							}
							alt="profile"
							ref={imga}
						/>
						<img className={s.add_img} src={add} alt="add" style={{ cursor: 'pointer' }} />
						<label htmlFor="img" className={s.add_img} ref={labe}>
							<input
								type="file"
								style={{ opacity: 0 }}
								id="img"
								onChange={(event) => {
									if (event.target.files[0]) {
										const form = new FormData();
										form.append('photo', event.target.files[0]);
										axios.patch('profile', form).then((res) => {}).catch((err) => {
											console.error(err);
										});

										var selectedFile = event.target.files[0];
										var reader = new FileReader();

										imga.current.title = selectedFile.name;
										reader.onload = function(event) {
											imga.current.src = event.target.result;
										};
										reader.readAsDataURL(selectedFile);
									}
								}}
							/>
						</label>
					</div>
					<div className={s.info}>
						<h4>{profile ? profile.username ? profile.username : '' : ''} </h4>
						<div className={s.details}>
							{weightComponent}
							{heightComponent}
							<div>
								<span>Diet Plan: </span>Intermittent Fasting
							</div>
						</div>
					</div>
				</div>
				{/* images section */}
				<hr />
				<div className={s.Images}>
					<h2 className={s.Images__heading}> A comparison indicating your changes every month </h2>
					<div className={s.Images__info}>
						<div className={s.Images__photo}>
							<img
								src={
									update ? (
										update
									) : (
										'https://res.cloudinary.com/derossy-backup/image/upload/v1555206304/deross-samples/placeholder-profile-male.jpg'
									)
								}
								alt="profile pic"
							/>
						</div>
						<div className={s.Images__btns}>
							<div className={s.Images__btns_monthes}>
								{profile ? profile.images ? profile.images.length > 0 ? (
									profile.images.map((i, l) => {
										return (
											<button
												key={l}
												onClick={() => {
													return setUpdate(i.image);
												}}
											>
												{' '}
												month {moment(i.date).locale('en').format('YYYY/MM/DD')}{' '}
											</button>
										);
									})
								) : (
									''
								) : (
									''
								) : (
									''
								)}
							</div>
							<input
								style={{ opacity: 0 }}
								type="file"
								id="update"
								onChange={(event) => {
									setLoading(true);
									if (event.target.files[0]) {
										const form = new FormData();
										form.append('image', event.target.files[0]);
										axios
											.post('image', form)
											.then((res) => {
												setLoading(false);
												alert.current.style.visibility = 'visible';
												alert.current.style.opacity = '1';
											})
											.catch((err) => {
												console.error(err);
												setLoading(false);
											});
									}
								}}
							/>
							<Alert
								ref={alert}
								className={s.Alert}
								severity="success"
								onClick={() => {
									alert.current.style.visibility = 'hidden';
									alert.current.style.opacity = '0';
								}}
							>
								This is a success alert — check it out!
							</Alert>

							{updateButton}
						</div>
					</div>
				</div>
				<hr />
				{/* {system ? system.syst[0].system.map(s=>{
          return ( */}
				<div
					style={{
						textAlign: 'center',
						margin: '10px 0px',
						display: 'flex',
						justifyContent: 'center'
					}}
				>
					<div style={{ cursor: 'pointer' }} onClick={() => leftToggle()}>
						{' '}
						<ArrowBackIosIcon />
					</div>
					<span> {moment(current).format('YYYY MM DD')} </span>
					<div style={{ cursor: 'pointer' }} onClick={() => rightToggle()}>
						{' '}
						<ArrowForwardIosIcon />
					</div>
				</div>
				<table className={s.table}>
					<thead>
						<th />
						<th>saturday</th>
						<th>sunday</th>
						<th>monday</th>
						<th>tuesday</th>
						<th>wednesday</th>
						<th>thursday</th>
						<th>friday</th>
					</thead>
					<tbody>
						<tr>
							<td>8 Am</td>
							<td
								data-label="Sat"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[0].sys[0],
											system.syst[0]._id,
											system.syst[0].system[0]._id
										);
								}}
							>
								{system ? system.syst[0].system[0].sys[0].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="sun"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[1].sys[0],
											system.syst[0]._id,
											system.syst[0].system[1]._id
										);

									// props.openHandler2p"/food",rops.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[1].sys[0].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="tuesday"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[2].sys[0],
											system.syst[0]._id,
											system.syst[0].system[2]._id
										);
									// props.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[2].sys[0].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="wednesday"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[3].sys[0],
											system.syst[0]._id,
											system.syst[0].system[3]._id
										);
									// props.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[3].sys[0].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="friday"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[4].sys[0],
											system.syst[0]._id,
											system.syst[0].system[4]._id
										);
									// props.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[4].sys[0].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="friday"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[5].sys[0],
											system.syst[0]._id,
											system.syst[0].system[5]._id
										);
									// props.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[5].sys[0].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="friday"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[6].sys[0],
											system.syst[0]._id,
											system.syst[0].system[6]._id
										);
									// props.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[6].sys[0].f.map((f) => f.food.food + ', ') : ''}
							</td>
						</tr>

						<tr>
							<td>11 Am</td>
							<td
								data-label="Sat"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[0].sys[1],
											system.syst[0]._id,
											system.syst[0].system[0]._id
										);

									// props.openHandler2p"/food",rops.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[0].sys[1].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="sun"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[1].sys[1],
											system.syst[0]._id,
											system.syst[0].system[1]._id
										);

									// props.openHandler2p"/food",rops.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[1].sys[1].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="tuesday"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[2].sys[1],
											system.syst[0]._id,
											system.syst[0].system[2]._id
										);
									// props.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[2].sys[1].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="wednesday"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[3].sys[1],
											system.syst[0]._id,
											system.syst[0].system[3]._id
										);
									// props.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[3].sys[1].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="friday"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[4].sys[1],
											system.syst[0].system[4]._id
										);
									// props.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[4].sys[1].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="friday"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[5].sys[1],
											system.syst[0]._id,
											system.syst[0].system[5]._id
										);
									// props.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[5].sys[1].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="friday"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[6].sys[1],
											system.syst[0]._id,
											system.syst[0].system[6]._id
										);
									// props.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[6].sys[1].f.map((f) => f.food.food + ', ') : ''}
							</td>
						</tr>

						<tr>
							<td>3 Pm</td>
							<td
								data-label="Sat"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[0].sys[2],
											system.syst[0]._id,
											system.syst[0].system[0]._id
										);

									// props.openHandler2p"/food",rops.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[0].sys[2].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="sun"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[1].sys[2],
											system.syst[0]._id,
											system.syst[0].system[1]._id
										);

									// props.openHandler2p"/food",rops.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[1].sys[2].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="tuesday"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[2].sys[2],
											system.syst[0]._id,
											system.syst[0].system[2]._id
										);
									// props.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[2].sys[2].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="wednesday"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[3].sys[2],
											system.syst[0]._id,
											system.syst[0].system[3]._id
										);
									// props.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[3].sys[2].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="friday"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[4].sys[2],
											system.syst[0]._id,
											system.syst[0].system[4]._id
										);
									// props.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[4].sys[2].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="friday"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[5].sys[2],
											system.syst[0]._id,
											system.syst[0].system[5]._id
										);
									// props.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[5].sys[2].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="friday"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[6].sys[2],
											system.syst[0]._id,
											system.syst[0].system[6]._id
										);
									// props.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[6].sys[2].f.map((f) => f.food.food + ', ') : ''}
							</td>
						</tr>

						<tr>
							<td>5 Pm</td>
							<td
								data-label="Sat"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[0].sys[3],
											system.syst[0]._id,
											system.syst[0].system[0]._id
										);

									// props.openHandler2p"/food",rops.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[0].sys[3].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="sun"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[1].sys[3],
											system.syst[0]._id,
											system.syst[0].system[1]._id
										);
								}}
							>
								{system ? system.syst[0].system[1].sys[3].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="tuesday"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[2].sys[3],
											system.syst[0]._id,
											system.syst[0].system[2]._id
										);
									// props.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[2].sys[3].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="wednesday"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[3].sys[3],
											system.syst[0]._id,
											system.syst[0].system[3]._id
										);
									// props.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[3].sys[3].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="friday"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[4].sys[3],
											system.syst[0]._id,
											system.syst[0].system[4]._id
										);
									// props.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[4].sys[3].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="friday"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[5].sys[3],
											system.syst[0]._id,
											system.syst[0].system[5]._id
										);
									// props.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[5].sys[3].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="friday"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[6].sys[3],
											system.syst[0]._id,
											system.syst[0].system[6]._id
										);
									// props.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[6].sys[3].f.map((f) => f.food.food + ', ') : ''}
							</td>
						</tr>

						<tr>
							<td>7 Pm</td>
							<td
								data-label="Sat"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[0].sys[4],
											system.syst[0]._id,
											system.syst[0].system[0]._id
										);

									// props.openHandler2p"/food",rops.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[0].sys[4].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="sun"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[1].sys[4],
											system.syst[0]._id,
											system.syst[0].system[1]._id
										);

									// props.openHandler2p"/food",rops.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[1].sys[4].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="tuesday"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[2].sys[4],
											system.syst[0]._id,
											system.syst[0].system[2]._id
										);
									// props.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[2].sys[4].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="wednesday"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[3].sys[4],
											system.syst[0]._id,
											system.syst[0].system[3]._id
										);
									// props.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[3].sys[4].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="friday"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[4].sys[4],
											system.syst[0]._id,
											system.syst[0].system[4]._id
										);
									// props.openHandler2("/food", food);,
								}}
							>
								{system ? system.syst[0].system[4].sys[4].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="friday"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[5].sys[4],
											system.syst[0]._id,
											system.syst[0].system[5]._id
										);
									// props.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[5].sys[4].f.map((f) => f.food.food + ', ') : ''}
							</td>
							<td
								data-label="friday"
								onClick={(e) => {
									if (system)
										props.openHandler2(
											'/food',
											system.syst[0].system[6].sys[4],
											system.syst[0]._id,
											system.syst[0].system[6]._id
										);
									// props.openHandler2("/food", food);
								}}
							>
								{system ? system.syst[0].system[6].sys[4].f.map((f) => f.food.food + ', ') : ''}
							</td>
						</tr>
					</tbody>
				</table>
				){/* }) (
        ) : (
          ""
        )} */}
				<hr />
				<div className={s.charts}>
					<h3 style={{ marginLeft: '30px' }}>Motivation Charts</h3>
					<div id="calendar_basic" className={s.chart_content} />
					<div
						style={{
							textAlign: 'center',
							margin: '10px 0px',
							display: 'flex',
							justifyContent: 'center'
						}}
					>
						<div style={{ cursor: 'pointer' }} onClick={() => leftToggleChart()}>
							{' '}
							<ArrowBackIosIcon />
						</div>
						<span>
							{' '}
							{weeks ? weeks[weekIndex] ? moment(weeks[weekIndex]).format('YYYY/MM/DD') : '' : ''}{' '}
						</span>
						<div style={{ cursor: 'pointer' }} onClick={() => rightToggleChart()}>
							{' '}
							<ArrowForwardIosIcon />
						</div>
					</div>
					<LineChart
						currentWeekPerfectPath={currentWeekPerfectPath}
						currentWeekWeight={currentWeekWeight}
						currentWeek={weeks[weekIndex]}
					/>
				</div>
				<hr />
				<div className={s.cards}>
					{trainers.length > 0 ? (
						trainers.map((t) => {
							return (
								<div className={s.card_container}>
									<div className={s.upper_container}>
										<div className={s.image_container}>
											<img src={profile} />
										</div>
									</div>

									<div className={s.lower_container}>
										<div>
											<h3>Alaina Wick</h3>
											<h4>Front-end Developer</h4>
										</div>
										<div>
											<p>
												sodales accumsan ligula. Aenean sed diam tristique, fermentum mi nec,
												ornare arcu.
											</p>
										</div>
										<div>
											<a href="#" className={s.btn}>
												View profile
											</a>
										</div>
									</div>
								</div>
							);
						})
					) : (
						''
					)}

					<div className={s.card_container}>
						<div className={s.upper_container}>
							<div className={s.image_container}>
								<img src={User} />
							</div>
						</div>

						<div className={s.lower_container}>
							<div>
								<h3>Alaina Wick</h3>
								<div className={s.weight}>
									<h4>
										Before: <span> 80 </span> kg{' '}
									</h4>
									<h4>
										After: <span> 55 </span> kg{' '}
									</h4>
								</div>
							</div>
							<div className={s.points}>
								🏆 Points: <span>50</span>
							</div>
							<div>
								<a href="#" className={s.btn}>
									View profile
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Profile;

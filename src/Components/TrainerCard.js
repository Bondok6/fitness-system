import React, { useContext, useState } from 'react';
import s from './Profile/Profile/Profile.module.css';
import Star from '../images/Path 2171@2x.png';
import Spinner from '../UI/Spinner/Spinner';
import axios from 'axios';
import authContext from '../context/auth-context';
// axios;
function TraineeCard(props) {
	const [ loadind, setLoading ] = useState(false);
	const auth = useContext(authContext);

	let button = (
		<div>
			<a
				href="#"
				className={s.btn}
				onClick={() => {
					if (props.requested && auth.auth.role !== 'gym') {
						if (!props.requested.includes(auth.auth.id)) {
							setLoading(true);
							axios
								.post(`request?gym=${props.id}`)
								.then((res) => {
									props.load(loadind);
									setLoading(false);
									console.log(res);
								})
								.catch((err) => {
									setLoading(false);
									console.log(err);
								});
						}
					}
				}}
			>
				{props.requested && auth.auth.role !== 'gym' ? props.requested.includes(auth.auth.id) ? (
					'requested'
				) : (
					'Add Request'
				) : (
					''
				)}
			</a>
		</div>
	);
	if (loadind) button = <Spinner btn={true} />;

	return (
		<div className={s.card_container}>
			<div className={s.upper_container}>
				<div className={s.image_container}>
					<img src={props.photo} />
				</div>
			</div>

			<div className={s.lower_container}>
				<div>
					<h3 style={{ lineHeight: 'initial' }}>{props.username}</h3>
				</div>
				<div className={s.points}>
					<img style={{ height: '20px' }} src={Star} /> Rating: <span>5</span>
				</div>
				{button}
			</div>
		</div>
	);
}

export default TraineeCard;

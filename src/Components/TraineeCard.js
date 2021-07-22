import React from 'react';
import s from '../Pages/Profile/Profile.module.css';

function TraineeCard(props) {
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
					<div className={s.weight}>
						<h4>
							Before: <span> {props.weights[0] ? props.weights[0].weight : 'begainer'} </span> kg{' '}
						</h4>
						<h4>
							After:{' '}
							<span>
								{' '}
								{props.weights[props.weights.length - 1] ? (
									props.weights[props.weights.length - 1].weight
								) : (
									'begainer'
								)}{' '}
							</span>{' '}
							kg{' '}
						</h4>
					</div>
				</div>
				<div className={s.points}>
					🏆 Points: <span>50</span>
				</div>
				<div>
					{!props.trainer ? (
						<a href={`/profile/${props.id}`} className={s.btn}>
							View profile
						</a>
					) : (
						<a href={`/addDite/${props.id}`} className={s.btn}>
							Add Diet
						</a>
					)}
				</div>
			</div>
		</div>
	);
}

export default TraineeCard;

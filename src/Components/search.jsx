import React, { Component } from 'react';
import style from '../assets/css/search.module.css';
import userImage from '../images/profile.jpg';
import Star from '../images/svg/star.svg';
// import search from '../images/online/search.png';

export class Contact extends Component {
	render() {
		return (
			<React.Fragment>
				<section className={style.rating}>
					<div className="container">
						<div className={style.search}>
							<input type="text" placeholder="Search ..." />
							{/* <img src={search} alt="search-icon" className={style.search__icon} /> */}
						</div>
						<div className={style.cards}>
							<div class={style.card}>
								<img src={userImage} alt="user-img" className={style.card__img} />
								<h3 className={style.card__name}>Kyrillos Hany</h3>
								<span className={style.card__rate}>
									<img src={Star} alt="star" />
									<img src={Star} alt="star" />
									<img src={Star} alt="star" />
									<img src={Star} alt="star" />
								</span>
								<button className={style.card__btn}>view profile</button>
							</div>
							<div class={style.card}>
								<img src={userImage} alt="user-img" className={style.card__img} />
								<h3 className={style.card__name}>Kyrillos Hany</h3>
								<span className={style.card__rate}>
									<img src={Star} alt="star" />
									<img src={Star} alt="star" />
									<img src={Star} alt="star" />
									<img src={Star} alt="star" />
								</span>
								<button className={style.card__btn}>view profile</button>
							</div>
							<div class={style.card}>
								<img src={userImage} alt="user-img" className={style.card__img} />
								<h3 className={style.card__name}>Kyrillos Hany</h3>
								<span className={style.card__rate}>
									<img src={Star} alt="star" />
									<img src={Star} alt="star" />
									<img src={Star} alt="star" />
									<img src={Star} alt="star" />
								</span>
								<button className={style.card__btn}>view profile</button>
							</div>

							<div class={style.card}>
								<img src={userImage} alt="user-img" className={style.card__img} />
								<h3 className={style.card__name}>Kyrillos Hany</h3>
								<span className={style.card__rate}>
									<img src={Star} alt="star" />
									<img src={Star} alt="star" />
									<img src={Star} alt="star" />
									<img src={Star} alt="star" />
								</span>
								<button className={style.card__btn}>view profile</button>
							</div>
							<div class={style.card}>
								<img src={userImage} alt="user-img" className={style.card__img} />
								<h3 className={style.card__name}>Kyrillos Hany</h3>
								<span className={style.card__rate}>
									<img src={Star} alt="star" />
									<img src={Star} alt="star" />
									<img src={Star} alt="star" />
									<img src={Star} alt="star" />
								</span>
								<button className={style.card__btn}>view profile</button>
							</div>
							<div class={style.card}>
								<img src={userImage} alt="user-img" className={style.card__img} />
								<h3 className={style.card__name}>Kyrillos Hany</h3>
								<span className={style.card__rate}>
									<img src={Star} alt="star" />
									<img src={Star} alt="star" />
									<img src={Star} alt="star" />
									<img src={Star} alt="star" />
								</span>
								<button className={style.card__btn}>view profile</button>
							</div>
						</div>
					</div>
				</section>
			</React.Fragment>
		);
	}
}

export default Contact;

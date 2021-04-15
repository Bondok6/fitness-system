import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/Logo/icon.png';
import style from '../assets/css/navbar.module.css';
import TocIcon from '@material-ui/icons/Toc';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import FaceIcon from '@material-ui/icons/Face';
import userImage from '../images/profile.jpg';

export const Nav = (props) => {
	return (
		<React.Fragment>
			<header>
				<nav className={style.navbar}>
					<div className={style.toggler} onClick={() => props.openHandler()}>
						<TocIcon />
					</div>
					<div className={`${style.brandlogo} mx-4`}>
						{' '}
						<img src={logo} alt="logo" />
					</div>
					<div className={style.navbarlinks}>
						<ul>
							<li>
								<Link to="/">home</Link>
							</li>
							<li>
								<Link to="/videoCategories">categories</Link>
							</li>
							<li>
								<Link to="/profile">profile</Link>
							</li>
							{/* <li>
                <Link to="#">community</Link>
              </li> */}
							<li>
								<Link to="/contact">contact us</Link>
							</li>
							<li>
								<Link to="/about">about</Link>
							</li>
						</ul>
					</div>
					{localStorage.getItem('token') ? (
						<div className={style.register}>
							<span className={style.signup}>
								<Link className={style.icons}>
									<FaceIcon />
								</Link>
								<Link className={style.icons}>
									<NotificationsNoneIcon />
								</Link>
								{/* remove hidden class ${style.hidden} */}
								<div className={`${style.menu} ${style.hidden}`}>
									<div className={style.user}>
										<img src={userImage} className={style.user__image} />
										<div>
											<div className={style.user__name}>kyrillos bondok</div>
											<button className={style.accept}>Accept</button>
											<button className={style.decline}>Decline</button>
										</div>
									</div>
									<div className={style.user}>
										<img src={userImage} className={style.user__image} />
										<div>
											<div className={style.user__name}>kyrillos bondok</div>
											<button className={style.accept}>Accept</button>
											<button className={style.decline}>Decline</button>
										</div>
									</div>
								</div>

								<Link
									className={style.icons}
									onClick={() => {
										localStorage.removeItem('token');
										return (window.location.href = '/');
									}}
								>
									<ExitToAppIcon />
								</Link>
							</span>
						</div>
					) : (
						<div className={style.register}>
							<span className={style.login}>
								<Link
									onClick={() => {
										props.openHandler2('/login');
									}}
								>
									login
								</Link>
							</span>
							<span className={style.line}>&#124;</span>
							<span className={style.signup}>
								<Link
									onClick={() => {
										props.openHandler2('/chooseWay');
									}}
								>
									sign up
								</Link>
							</span>
						</div>
					)}
				</nav>
			</header>
		</React.Fragment>
	);
};

export default Nav;

import React, { Component } from 'react';

import style from '../../assets/css/authentication/login.module.css';
import '../../assets/scss/chooseWay.css';
import logo from '../../images/Logo/pinkLogo.png';
import phone from '../../images/svg/phone.svg';
import EmailIcon from '@material-ui/icons/Email';

export class Login extends Component {
	state = {
		radio: ''
	};

	//   submitHandler = (e) => {
	//     e.preventDefault();
	np;
	//     const data = {
	//       phone: this.phone,
	//       password: this.password
	//     }

	//     axios({
	//       url: 'login-phone',
	//       method: 'POST',
	//       data: data
	//     })
	//       .then(res => {
	//         localStorage.setItem('token', res.data.token);
	//       }).catch(err => {
	//         console.log(err);
	//       })

	//   }

	render() {
		return (
			<React.Fragment>
				Wayy
				<div className={style.login}>
					<form>
						<div>
							<img src={logo} alt="logo-icon" className={style.logo} />
						</div>

						<h2 className="Auth"> Authorization Type </h2>
						<hr />
						<h2 className="Auth2"> What do you want to use to authenticate with </h2>
						<div className="Authes">
							<div className="AuthType">
								<input
									type="radio"
									value="phone"
									name="phone"
									onClick={(e) => this.setState({ radio: e.target.value })}
								/>
								<img src={phone} alt="phone img" />
								<div>
									<h4>Send code via SMS</h4>
									<h5>+***********28</h5>
								</div>
							</div>
							<div className="AuthType">
								<input
									type="radio"
									value="email"
									name="phone"
									onClick={(e) => this.setState({ radio: e.target.value })}
								/>
								<EmailIcon />
								<div>
									<h4>Send code via E-mail</h4>
									<h5>***********.com</h5>
								</div>
							</div>
						</div>

						<hr />
						<button
							type="submit"
							className={style.btn}
							onClick={(e) => {
								e.preventDefault();
								return this.state.radio !== ''
									? this.props.openHandler2('/signup', this.state.radio)
									: '';
							}}
						>
							Choose
						</button>

						{/* <div className={style.anchor}>
             <Link  onClick={()=>this.props.openHandler2("/signup")}> forget password</Link>
            </div> */}
						<hr />
					</form>
				</div>
			</React.Fragment>
		);
	}
}

export default Login;

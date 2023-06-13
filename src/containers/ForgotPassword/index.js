import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Keyboard, TouchableOpacity, Image, Dimensions } from 'react-native';
import styles from './styles';
import Navigator from '../../common/Navigator';
import PlieTextInput from '../../components/PlieTextInput';
import PlieTextInputForm from "../../components/PlieTextInputForm";
import AuthRootView from '../../components/AuthRootView';
import PlieButton from '../../components/PlieButton';
import { validateEmail } from '../../common/Validation';
import AppNavKeys from '../../common/AppNavKeys';
import { useDispatch, useSelector } from 'react-redux';
import { FORGOT_PASSWORD } from '../../common/StoreActionTypes';

import { Assets } from '../../assets/Icons';

import { FetchForgotPasswordAction } from '../../store/actions/LoginAction';
import { normalize } from '../../common/Normalize';
import Header from '../../components/Header';

export default function ForgotPassword() {
	const dispatch = useDispatch();

	const ref1 = useRef();
	const ref2 = useRef();

	const [ isCodeSent, setCodeSent ] = useState(false);
	const [ isApiCalling, setApiCalling ] = useState(false);
	const [ isPasswordDone, setPasswordDone ] = useState(false);

	const ScreenWidth = Dimensions.get('window').width;
	const ScreenHeight = Dimensions.get('window').height;
	const [ TopOffset, SetTopOffset ] = useState(0);

	const [ values, setValues ] = useState({
		email: ''
	});

	const [ emErr, setEMErr ] = useState(false);
	const [ emIVErr, setEMIVErr ] = useState(false);

	const { CommonReducer, LoginReducer } = useSelector((state) => ({
		CommonReducer: state.CommonReducer,
		LoginReducer: state.LoginReducer
	}));

	useEffect(
		() => {
			if (CommonReducer.api_type) {
				getResponse();
			}
		},
		[ CommonReducer, LoginReducer ]
	);

	function getResponse() {
		switch (CommonReducer.api_type) {
			case FORGOT_PASSWORD: {
				setApiCalling(false);
				if (LoginReducer.resData != null) {
					setCodeSent(true);
					if (LoginReducer.resData.success) {
						Navigator.navigate(AppNavKeys.ResetPassword, {
							email: values.email
						});
					}
				}
				break;
			}
		}
	}

	useEffect(
		() => {
			if (isApiCalling) Keyboard.dismiss();
		},
		[ isApiCalling ]
	);

	const onChangeValue = (name, value) => {
		setValues({ ...values, [name]: value });
		onRemoveError(name);
	};

	const onRemoveError = (name) => {
		if (name == 'email') {
			setEMErr(false);
			setEMIVErr(false);
		}
	};

	const doSendCode = () => {
		if (!values.email) {
			setEMErr(true);
			return;
		} else if (!validateEmail(values.email)) {
			setEMErr(true);
			setEMIVErr(true);
			return;
		} else {
			setEMErr(false);
			setEMIVErr(false);
		}

		let body = {
			email: values.email.toLowerCase()
		};
		setApiCalling(true);

		dispatch(FetchForgotPasswordAction(body));
	};

	return (
		// <AuthRootView
		// isWithScroll={false}
		// onPress={() => Navigator.goBack()}
		// >
		<View
			style={{
				flex: 1,
			}}
		>
			<Header />
			
			<TouchableOpacity style={styles.sty17} onPress={() => Navigator.goBack()}>
				<Image style={styles.sty18} source={Assets.back} />
			</TouchableOpacity>
			<View style={{paddingHorizontal: normalize(20), flex: 1}}>
			<Text style={styles.sty12}>Forgot Password</Text>
			{!isPasswordDone ? (
				<View style={{ flex: 1 }}>
					<Text style={styles.sty13}>Enter the email linked to your Pliē Account</Text>

					<PlieTextInputForm
						refs={ref1}
						isError={emErr}
						isValidError={emIVErr}
						placeholder={'Email'}
						autoCapitalize="none"
						keyboardType="email-address"
						onChangeText={(text) => onChangeValue('email', text)}
					/>

					<PlieButton
						text={'Reset'}
						onPress={() => {
							doSendCode();
						}}
					/>
					<View style={styles.sty11}>
						<TouchableOpacity style={styles.sty2} onPress={() => Navigator.navigate(AppNavKeys.Register)}>
							<Text style={styles.sty3}>Not a member?</Text>
							<Text style={styles.sty4}>Sign Up Here</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.sty2} onPress={() => Navigator.goBack()}>
							<Text style={styles.sty3}>Already reset?</Text>
							<Text style={styles.sty4}>Login</Text>
						</TouchableOpacity>
					</View>

					<Text
						style={[ styles.sty1, { position: 'absolute' } ]}
						onPress={() =>
							Navigator.navigate(AppNavKeys.Home, {
								from: 'Guest'
							})}
					>
						Enter as Guest
					</Text>
				</View>
			) : (
				<View style={styles.sty14}>
					<Image style={styles.sty15} source={Assets.done} />

					<Text style={styles.sty12}>Done!</Text>
					<Text style={styles.sty13}>Please check your email. A reset link has been sent</Text>

					<View style={styles.sty16}>
						<Text style={styles.sty3} onPress={() => Navigator.goBack()}>
							Already reset?
						</Text>
						<Text style={styles.sty4} onPress={() => Navigator.goBack()}>
							Login
						</Text>
					</View>
					</View>
			)}
		</View>
		</View>
		// </AuthRootView>
	);
}

import React, { Component } from 'react';
import { TextInput, Text, View } from 'react-native';
import VMasker from 'vanilla-masker';
import styles from './styles';
import { colors } from '../../styles';

class Input extends Component {
	constructor(props) {
		super(props);
		this.input = null;
	}

	componentDidMount() {
		if (this.props.onRef != null) {
			this.props.onRef(this);
		}
	}

	focus = () => {
		if (this.input) this.input.focus();
	};

	clear = () => {
		if (this.input) this.input.clear();
	};

	_defaultSwapMask = (_value, defaultMask) => {
		return defaultMask;
	};

	getBorderStyle = borderStyle => {
		switch (borderStyle) {
			case 'bordaRedonda':
				return styles.bordaRedonda;
			case 'bordaInferior':
				return styles.bordaInferior;
			case 'semBorda':
				return { borderWidth: 0 };
			default:
				return styles.bordaPadrao;
		}
	};

	render() {
		const {
			style,
			error,
			showError = true,
			errorStyle,
			borderStyle = 'padrao',
			...props
		} = this.props;
		let estiloNotEditable = {};
		if (this.props.editable === false) {
			estiloNotEditable = {
				color: colors.texto,
				backgroundColor: colors.inputDisabled,
				elevation: 0,
			};
		}
		return (
			<View>
				<TextInput
					{...props}
					value={(() => {
						let { value } = this.props;
						if (this.props.mask) {
							const { swapMask = this._defaultSwapMask } =
								this.props;
							const mask = swapMask(value, this.props.mask);
							value = VMasker.toPattern(value, mask);
						}
						return value;
					})()}
					onChangeText={value => {
						if (this.props.mask) {
							const { swapMask = this._defaultSwapMask } =
								this.props;
							const mask = swapMask(value, this.props.mask);
							value = VMasker.toPattern(value, mask);
						}
						this.props.onChangeText(value);
					}}
					style={[
						styles.formControl,
						{ ...estiloNotEditable },
						{ ...style },
						this.getBorderStyle(borderStyle),
					]}
					ref={input => {
						this.input = input;
					}}
				/>
				{showError && error ? (
					<Text style={[styles.labelError, errorStyle]}>{error}</Text>
				) : null}
			</View>
		);
	}
}

export default Input;

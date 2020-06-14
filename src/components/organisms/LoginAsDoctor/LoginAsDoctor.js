import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import DmzText from '../../atoms/DmzText/DmzText';
import AnimInput from '../../molecules/AnimInput/AnimInput';
import GradientButton from '../../molecules/GradientButton/GradientButton';
function LoginAsDoctor({style, onPressLogin}) {
  return (
    <Animated.View style={[Styles.CardContainer, style ? style : null]}>
      <DmzText
        text="Login as doctor"
        type={5}
        center
        style={Styles.HeaderText}
      />
      <AnimInput
        placeholder="Emai or phone"
        style={{Container: Styles.AnimInput}}
      />
      <AnimInput placeholder="Password" style={{Container: Styles.AnimInput}} />
      <DmzText
        text="Forgot Password?"
        lite
        type={2}
        style={Styles.ForgotPasswordText}
      />
      <GradientButton text="Login" onPress={onPressLogin} />
    </Animated.View>
  );
}

const Styles = StyleSheet.create({
  CardContainer: {
    width: '100%',
    height: 400,
    padding: 20,
    flexDirection: 'column',
  },
  HeaderText: {marginLeft: 'auto', marginRight: 'auto'},
  AnimInput: {marginBottom: 20, marginTop: 20, width: '90%'},
  ForgotPasswordText: {marginLeft: 'auto', marginRight: 'auto', color: '#555'},
});
export default LoginAsDoctor;

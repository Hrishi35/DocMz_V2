import React, {createRef, useState} from 'react';
import {View, StyleSheet, PermissionsAndroid, Alert} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import SignupSplash from './SignupSplash';
import SignUpStep1Screen from './SignUpStep1Screen';
import SignUpStep2Screen from './SignUpStep2Screen';
import SignUpStep3Screen from './SignUpStep3Screen';
import ImagePicker from 'react-native-image-picker';
import {signupDoctor, signupPatient} from '../../../redux/action/auth';
import Toast from 'react-native-root-toast';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {UploadProfilePic} from '../../../redux/action/doctoreAction';
// import Svg from 'react-native-svg';

function DmzSignupV2(props) {
  const pagerRef = createRef();
  const nextpage = (page) => {
    pagerRef.current.setPage(page);
  };
  const dispatch = useDispatch();
  const {isLoading, data} = useSelector((state) => state.AuthReducer);
  const [signupAs, setSignupAs] = useState('patient');
  const [imageData, setImageData] = useState('');
  const [credential, setCredential] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    registration_number: '',
    specialty: '',
    phone: '',
    city: '',
    country: '',
    basic: JSON.stringify({}),
    state: '',
  });
  const handleSubmit = () => {
    signupAs === 'doctor' ? _handleDoctorSignup() : _handlePatientSignup();
  };
  const _handleDoctorSignup = () => {
    console.log(credential);
    dispatch(signupDoctor(credential, successCallback, errorCallback));
  };
  const _handlePatientSignup = () => {
    dispatch(signupPatient(credential, successCallback, errorCallback));
  };

  const successCallback = () => {
    showTost('account created successfully');
    AsyncStorage.getItem('userData').then((res) => {
      const data = JSON.parse(res);
      console.log(data.id);
      console.log(imageData);
      signupAs === 'doctor' && dispatch(UploadProfilePic(data.id, imageData));
      props.navigation.navigate('PatientHomePage');
    });
    //   : props.navigation.goBack(null);
    // props.navigation.goBack(null);
  };
  const errorCallback = (e) => {
    Alert.alert('something went wrong');
    // showTost('error occured: ' + e);
  };
  const showTost = (msg = 'nothing') => {
    return Toast.show(msg, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
      onShow: () => {
        // calls on toast\`s appear animation start
      },
      onShown: () => {
        // calls on toast\`s appear animation end.
      },
      onHide: () => {
        // calls on toast\`s hide animation start.
      },
      onHidden: () => {
        // calls on toast\`s hide animation end.
      },
    });
  };
  const onChoosePicture = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    console.log(granted);
    if (granted) {
      PickImage();
    } else {
      askPermission();
    }
  };
  const askPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'DocMz needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        PickImage();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const PickImage = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // const source = {uri: response.uri};
        // console.log(source);
        // const path = response.uri;
        // setData({...data, imagePath: path});
        // console.log(path);
        setImageData(response);
      }
    });
  };

  return (
    <ViewPager
      ref={pagerRef}
      style={styles.viewPager}
      initialPage={0}
      scrollEnabled={false}>
      <View key="0">
        <SignupSplash
          credential={credential}
          setCredential={setCredential}
          signupAs={signupAs}
          setSignupAs={setSignupAs}
          onPress={() => nextpage(1)}
        />
      </View>
      <View key="1">
        <SignUpStep1Screen
          credential={credential}
          setCredential={setCredential}
          isLoading={isLoading}
          signupAs={signupAs}
          navigation={props.navigation}
          onPress={signupAs === 'doctor' ? () => nextpage(2) : handleSubmit}
        />
      </View>
      <View key="2">
        <SignUpStep2Screen
          credential={credential}
          setCredential={setCredential}
          onChoosePicture={onChoosePicture}
          onPress={() => nextpage(3)}
        />
      </View>
      <View key="3">
        <SignUpStep3Screen
          credential={credential}
          setCredential={setCredential}
          isLoading={isLoading}
          onPress={handleSubmit}
          onChoosePicture={onChoosePicture}
        />
      </View>
    </ViewPager>
  );
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
});

export default DmzSignupV2;

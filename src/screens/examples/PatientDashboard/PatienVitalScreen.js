/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Modal} from 'react-native';
import PatientHistoryCardSmall from '../../../components/molecules/PatientVitalCards/PatientHistoryCardSmall';
import PatientHistoryCardLarge from '../../../components/molecules/PatientVitalCards/PatientHistoryCardLarge';
import {PRIMARY_COLOR} from '../../../styles/colors';
import PatientEditScreen from './PatientEditScreen';

export default function PatienVitalScreen(props) {
  const [editCard, setEditCard] = useState();
  const [modalVisible, setModal] = useState(false);

  const modalVisibility = (item) => {
    setModal(!modalVisible);
    setEditCard(item);
  };

  const data1 = [
    {
      headerOne: 'Weight',
      headerTwo: '22 May 2020',
      infoOne: '63.25',
      infoTwo: 'KGs',
      infoThree: 'BMI 26.0',
    },
    {
      headerOne: 'Height',
      headerTwo: '22 May 2020',
      infoOne: '5ft,4in',
      infoTwo: '',
      infoThree: '',
    },
  ];
  const data2 = [
    {
      headerOne: 'Blood Pressure',
      headerTwo: '22 May 2020',
      infoOne: '80/50',
      infoTwo: 'Optimal',
      infoThree: '',
      data: [
        50,
        10,
        40,
        95,
        -4,
        -24,
        35,
        53,
        -53,
        24,
        50,
        -20,
        -80,
        44,
        65,
        35,
        14,
        23,
      ],
    },
    {
      headerOne: 'Heart Rate',
      headerTwo: '22 May 2020',
      infoOne: '65 ',
      infoTwo: 'Normal',
      infoThree: 'bpm',
      data: [
        {
          data: [
            50,
            10,
            40,
            95,
            -4,
            -24,
            85,
            91,
            35,
            53,
            -53,
            24,
            50,
            -20,
            -80,
          ],
          svg: {stroke: PRIMARY_COLOR},
        },
        {
          data: [
            -87,
            66,
            -69,
            92,
            -40,
            -61,
            16,
            62,
            20,
            -93,
            -54,
            47,
            -89,
            -44,
            18,
          ],
          svg: {stroke: '#E7E3FE'},
        },
      ],
    },
  ];
  const data3 = [
    {
      headerOne: 'Temprature',
      headerTwo: '22 May 2020',
      infoOne: '101.5',
      infoTwo: 'C',
      infoThree: 'Fever',
    },
    {
      headerOne: 'Glucose',
      headerTwo: '22 May 2020',
      infoOne: '65',
      infoTwo: 'BPM',
      infoThree: 'High',
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flexDirection: 'row',
          marginRight: 10,
          justifyContent: 'center',
          marginBottom: 20,
        }}>
        {data1.map((u, i) => {
          console.log(u);
          return (
            <PatientHistoryCardSmall
              onPress={() => {
                modalVisibility(u);
              }}
              data={data1}
              style={{
                Card: {
                  marginLeft: 20,
                  elevation: 3,
                  backgroundColor: '#fff',
                },
              }}
              headerOne={u.headerOne}
              headerTwo={u.headerTwo}
              infoOne={u.infoOne}
              infoTwo={u.infoTwo}
              infoThree={u.infoThree}
            />
          );
        })}
      </View>
      <View
        style={{
          marginTop: 20,
          alignItems: 'center',
        }}>
        {data2.map((u, i) => {
          console.log(u);
          return (
            <PatientHistoryCardLarge
              onPress={() => {
                modalVisibility(u);
              }}
              headerOne={u.headerOne}
              headerTwo={u.headerTwo}
              infoOne={u.infoOne}
              infoTwo={u.infoTwo}
              infoThree={u.infoThree}
              data={u.data}
            />
          );
        })}
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginRight: 10,
          justifyContent: 'center',
          marginBottom: 20,
        }}>
        {data3.map((u, i) => {
          console.log(u);
          return (
            <PatientHistoryCardSmall
              onPress={() => {
                modalVisibility(u);
              }}
              style={{
                Card: {
                  marginLeft: 20,
                  elevation: 3,
                  backgroundColor: '#fff',
                },
              }}
              headerOne={u.headerOne}
              headerTwo={u.headerTwo}
              infoOne={u.infoOne}
              infoTwo={u.infoTwo}
              infoThree={u.infoThree}
            />
          );
        })}
      </View>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setModal(!modalVisible);
        }}>
        <PatientEditScreen data={editCard} />
      </Modal>
    </View>
  );
}

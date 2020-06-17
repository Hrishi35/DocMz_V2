import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import RatingStars from '../../atoms/ratingStars/RatingStarts';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
function AvailDoctorContentV2({
  Profile,
  DoctorName,
  rating,
  Specialization,
  onPress,
  schedule,
  navigation,
  data,
  toggle,
}) {
  return (
    <>
      <View
        style={{
          alignItems: 'flex-end',
          alignSelf: 'stretch',
        }}>
        <RatingStars
          size={14}
          filled
          activeColor={'#027E97'}
          passiveColor={'#9D9D9D'}
          rating={rating}
        />
      </View>
      <TouchableOpacity
        style={CardContentStyles.AvailableDoctorsCardContent}
        onPress={() => {}}>
        {Profile}
        <View style={CardContentStyles.AvailableDoctorsDetails}>
          <Text style={CardContentStyles.AvailableDoctorsName}>
            {DoctorName}
          </Text>
          <Text style={CardContentStyles.AvailableDoctorsSpecialization}>
            {Specialization}
          </Text>
          {/* can be made as molecule and touchable if needed */}
          <View style={CardContentStyles.AvailableDoctorsAvailableTimes}>
            {schedule &&
              schedule
                .filter(
                  (item) =>
                    item.bookedFor.slice(11, 16) >
                    new Date().toISOString().slice(11, 16),
                )
                .slice(0, 3)
                .map((item) => (
                  <Text
                    style={[
                      CardContentStyles.AvailableDoctorsAvailableTime,
                      CardContentStyles.AvailableDoctorsAvailableTimeActive,
                    ]}>
                    {item.bookedFor.slice(11, 16)}
                  </Text>
                ))}
            <Text
              style={[
                CardContentStyles.AvailableDoctorsAvailableTime,
                CardContentStyles.AvailableDoctorsAvailableTimeActive,
              ]}>
              {'11:00'}
            </Text>

            <Text style={[CardContentStyles.AvailableDoctorsAvailableTime]}>
              {'16:00'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={CardContentStyles.AvailableDoctorsContinueButton}>
        <TouchableOpacity onPress={onPress} style={{zIndex: 2000}}>
          <FontAwesomeIcon name="angle-right" size={22} color="#fafafa" />
        </TouchableOpacity>
      </View>
    </>
  );
}
const CardContentStyles = StyleSheet.create({
  AvailableDoctorsCardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
  },
  AvailableDoctorsDetails: {
    marginLeft: 15,
    alignSelf: 'stretch',
  },
  AvailableDoctorsName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#027E97',
  },
  AvailableDoctorsSpecialization: {
    color: '#666',
    fontSize: 13,
    lineHeight: 18,
  },
  AvailableDoctorsAvailableTimes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  AvailableDoctorsAvailableTime: {
    paddingHorizontal: 4,
    borderRadius: 8,
    color: '#777',
    marginRight: 10,
  },
  AvailableDoctorsAvailableTimeActive: {
    backgroundColor: '#027E97',
    color: '#fafafa',
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  AvailableDoctorsContinueButton: {
    backgroundColor: '#FF7A59',
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 5,
    paddingHorizontal: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1000,
  },
});

export default AvailDoctorContentV2;

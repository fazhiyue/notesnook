import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  Platform,
  DeviceEventEmitter,
} from 'react-native';
import NavigationService from '../../services/NavigationService';
import {
  COLOR_SCHEME,
  SIZE,
  br,
  ph,
  pv,
  opacity,
  FONT,
  WEIGHT,
} from '../../common/common';
import Icon from 'react-native-vector-icons/Ionicons';
import {Reminder} from '../../components/Reminder';
import {ListItem} from '../../components/ListItem';
import {getElevation} from '../../utils/utils';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {NavigationEvents} from 'react-navigation';

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;

export const Login = ({navigation}) => {
  const [colors, setColors] = useState(COLOR_SCHEME);

  useEffect(() => {
    DeviceEventEmitter.emit('hide');
    return () => {
      DeviceEventEmitter.emit('show');
    };
  });

  return (
    <SafeAreaView>
      <NavigationEvents
        onWillFocus={() => {
          DeviceEventEmitter.emit('hide');
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingHorizontal: '5%',
          marginTop: Platform.OS == 'ios' ? h * 0.02 : h * 0.04,
          marginBottom: h * 0.04,
        }}>
        <TouchableOpacity
          style={{
            paddingRight: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="ios-arrow-back" size={SIZE.xl} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: SIZE.xxl,
            color: colors.pri,
            fontFamily: WEIGHT.bold,
          }}>
          Login
        </Text>
      </View>

      <View
        style={{
          justifyContent: 'space-between',
          height: '80%',
        }}>
        <View>
          <TextInput
            style={{
              padding: pv,
              backgroundColor: colors.navbg,
              marginHorizontal: '5%',
              borderRadius: 5,
              fontSize: SIZE.md,
              fontFamily: WEIGHT.regular,
              marginBottom: 20,
            }}
            placeholder="Email"
            placeholderTextColor={colors.icon}
          />
          <TextInput
            style={{
              padding: pv,
              backgroundColor: colors.navbg,
              marginHorizontal: '5%',
              borderRadius: 5,
              fontSize: SIZE.md,
              fontFamily: WEIGHT.regular,
              marginBottom: 20,
            }}
            placeholder="Password"
            placeholderTextColor={colors.icon}
          />

          <TouchableOpacity
            activeOpacity={opacity}
            style={{
              padding: pv,
              backgroundColor: colors.accent,
              borderRadius: 5,
              marginHorizontal: '5%',
              marginBottom: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: SIZE.md,
                fontFamily: WEIGHT.medium,
                color: 'white',
              }}>
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate('ForgotPassword');
            }}
            activeOpacity={opacity}
            style={{
              alignItems: 'flex-end',
              marginHorizontal: '5%',
            }}>
            <Text
              style={{
                fontSize: SIZE.sm,
                fontFamily: WEIGHT.regular,
                color: colors.accent,
              }}>
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: '100%',
          }}>
          <TouchableOpacity
            activeOpacity={opacity}
            style={{
              alignItems: 'center',
              width: '100%',
              marginBottom: 20,
            }}>
            <Text
              style={{
                fontSize: SIZE.md,
                fontFamily: WEIGHT.regular,
                color: colors.accent,
              }}>
              Login with G
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate('Signup');
            }}
            activeOpacity={opacity}
            style={{
              alignItems: 'center',
              width: '100%',
            }}>
            <Text
              style={{
                fontSize: SIZE.sm,
                fontFamily: WEIGHT.bold,
                color: colors.accent,
              }}>
              Create a New Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

Login.navigationOptions = {
  header: null,
};

export default Login;

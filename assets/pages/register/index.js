import React, { useState } from 'react';
import { AsyncStorage, View, Dimensions, ImageBackground, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import footer from '../../image/footerlogin.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { setFromRegister, setStatusCorrect, asd} from '../../redux';
import { Btn, Konfirmasi } from '../../atom';
import {database} from '../../config';

export default function Regis({ navigation }) {
  const register = useSelector((state) => state.register);
  const dispatch = useDispatch();

  const onInputChange = (value, input) => {
    dispatch(setFromRegister(input, value));
  };

  const addUser = () => {
    AsyncStorage.getItem('user', (error, result) => {
      if (result) {
          let resultParsed = JSON.parse(result)
          database.ref('users/' + resultParsed.uid).set({
            email: resultParsed.email,
            token: resultParsed.token
          });
          console.log('hasil akhir ',resultParsed);
      }
    });
  };

  const Btn1 = async (email, pass) => {
    email = register.form.email;
    pass = register.form.accpass;
    if(register.form.password === register.form.accpass){
      dispatch(setStatusCorrect(false));
      const res = await dispatch(asd(email, pass)).catch(err => err);
      if(res){
        console.log('dari register',res);
        navigation.navigate('Dashboard')
        AsyncStorage.mergeItem('user', JSON.stringify(res));
        addUser();
      }else{
        alert('Gagal Coba lagi Atau Hubungi Admin')
      }
    }else{
      dispatch(setStatusCorrect(true));
    }
  }
  
  return (
    <ImageBackground source={footer} style={styles.footer}>    
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.header}>MyAquarium</Text>
          <Text style={styles.text1}>Registrasi</Text>
          <TextInput 
            placeholder="Email" 
            placeholderTextColor="#fff" 
            style={styles.textInput}
            onChangeText={value => onInputChange(value, 'email')}
          />

          <TextInput 
            placeholder="Kata sandi" 
            placeholderTextColor="#fff" 
            style={styles.textInput}
            onChangeText={value => onInputChange(value, 'password')}
          />

          <Konfirmasi
            onChangeText={value => onInputChange(value, 'accpass')}
            uncorrect={register.onCorrect}
          />

          <Btn onPress={Btn1} judul='Daftar' Loading={register.isLoading}/>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text1: {
    fontSize: 23,
    color:'#fff',
    fontFamily: 'Aaargh',
    alignSelf: 'center',
    marginBottom: 15,
  },
  text2: {
    color:'#fff',
    fontFamily: 'Aaargh',
    alignSelf: 'center',
  }, 
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    marginBottom:10,
  },
  header: {
    fontSize: 60,
    color:'#fff',
    marginBottom: 30,
    fontFamily: 'better',
    alignSelf: 'center',
  },
  footer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  textInput: {
    height: 40,
    paddingHorizontal: 10,
    color:'#fff',
    paddingLeft: 40,
    marginBottom:12,
    borderRadius: 7,
    borderColor:'#fff',
    borderBottomWidth:1,
  },
  textInputToken: {
    height: 40,
    paddingHorizontal: 10,
    color:'#fff',
    width:'50%',
    alignSelf:'center',
    marginBottom:12,
    borderRadius: 7,
    borderColor:'#fff',
    borderBottomWidth:1,
  },
  btnContainer: {
    backgroundColor: "white",
    height:40,
    padding:10,
    borderRadius:7,
    marginTop: 12
  },
  btntxt: {
    fontSize:15,
    color:'#095179',
    alignSelf:"center",
  }
});
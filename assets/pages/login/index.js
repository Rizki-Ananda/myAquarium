import React from 'react';
import { View, Dimensions, AsyncStorage, ImageBackground, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Keyboard, TouchableHighlight  } from 'react-native';
import footer from '../../image/footerlogin.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { setFromRegister, setStatusCorrect, Logiinn} from '../../redux';
import {Btn, Konfirmasi} from '../../atom';
import {database} from '../../config';

export default function Login({ navigation }) {
  const register = useSelector((state) => state.register);
  const dispatch = useDispatch();

  const onInputChange = (value, input) => {
    dispatch(setFromRegister(input, value));
  };

  const bangsat = () => {
    AsyncStorage.getItem('user', (error, result) => {
      if (result) {
          let resultParsed = JSON.parse(result)
          var kambing = database.ref('users/' + resultParsed.uid);
          kambing.on('value', function(snapshot) {
            console.log(snapshot.val().token);
            let dataToken = {
              token: snapshot.val().token,
            }
            try {
              // Mengahpus data kdari local storage
               AsyncStorage.mergeItem('user', JSON.stringify(dataToken));
               navigation.navigate('Dashboard')
            }
            catch(exception) {
              console.log(exception)
               alert('gagal ' + exception)
            }
          });
      }
    });
  }

  const macan = async () => {
    try {
      // Mengahpus data kdari local storage
       await AsyncStorage.removeItem('user');
       alert('Berhasil Menghapus Data')
    }
    catch(exception) {
      console.log(exception)
       alert('Gagal Menghapus Data')
    }
  }

  const kambing = () => {
    AsyncStorage.getItem('user', (error, result) => {
      if (result) {
        let resultParsed = JSON.parse(result)
        console.log("hasil akhir => ", resultParsed);
      }
    });
  }

  const Btn1 = async (email, pass) => {
    email = register.form.email;
    pass = register.form.accpass;
    if(register.form.accpass!==null){
      dispatch(setStatusCorrect(false));
      const res = await dispatch(Logiinn(email, pass)).catch(err => err);
      if(res){
        console.log('dari kamu',res);
        //navigation.navigate('Setup')
        AsyncStorage.mergeItem('user', JSON.stringify(res));
        bangsat();
        kambing();
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
          <Text style={styles.text1}>Masuk untuk melanjutkan</Text>
          <TextInput placeholder="Email" 
            placeholderTextColor="#fff" 
            style={styles.textInput} 
            onChangeText={value => onInputChange(value, 'email')}
          />
          <Konfirmasi
            onChangeText={value => onInputChange(value, 'accpass')}
            uncorrect={register.onCorrect}
          />

          <Text style={styles.text2}>Lupa sandi?</Text>
          
          <Btn onPress={Btn1} judul='Masuk' Loading={register.isLoading}/>

          <Text style={styles.text3}>Atau</Text>
          <TouchableHighlight onPress={() => navigation.navigate('Setup')} underlayColor="">
          <Text style={styles.text1}>Daftar</Text>
          </TouchableHighlight>
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
    fontSize: 20,
    color:'#fff',
    fontFamily: 'Aaargh',
    alignSelf: 'center',
    marginBottom: 15,
  },
  text2: {
    color:'#fff',
    fontFamily: 'Aaargh',
    alignSelf: 'flex-end',
  }, 
  text3: {
    color:'#fff',
    fontFamily: 'Aaargh',
    alignSelf: 'center',
    marginBottom: 15,
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
  btnContainer: {
    backgroundColor: "white",
    height:40,
    padding:10,
    borderRadius:7,
    marginTop: 12,
    marginBottom: 15
  },
  btntxt: {
    fontSize:15,
    color:'#095179',
    alignSelf:"center",
  }
});
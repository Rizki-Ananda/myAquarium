import React, { useState } from 'react';
import { AsyncStorage, View, Dimensions, ImageBackground, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Keyboard, TouchableHighlight  } from 'react-native';
import footer from '../../image/footerlogin.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { setStatusCorrect } from '../../redux';
import { Btn } from '../../atom';
import {database} from '../../config';

export default function Regis({ navigation }) {
  const register = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const [token, setToken] = useState('');

  const onInputChange1 = (value) => {
    setToken(value)
  };

  const bangsat = () => {
    AsyncStorage.getItem('user', (error, result) => {
      if (result) {
          let resultParsed = JSON.parse(result)
          console.log(resultParsed);
      }
    });
  }

  const Btn1 = () => {
    let asw = token; 
    let dataToken = {
      token: asw,
    }

    console.log(token.length);
    if(token.length<1){
      alert('Silahkan Isi Token');
    }else{
      dispatch(setStatusCorrect(true));
      const asw = database.ref('token/' + token);
      asw.once('value', function(snapshot) {
      if(snapshot.exists()){
        if(snapshot.val().status){
          alert("Token Sudah Digunakan");
          dispatch(setStatusCorrect(false));
        }else{
          database.ref('token/' + token).update({
            status: true,
          }).then(error =>{
            if(error){
              alert(error);
              dispatch(setStatusCorrect(false));
            }else{
              console.log("berhasil");
              AsyncStorage.setItem('user', JSON.stringify(dataToken));
              navigation.navigate('Register');
              bangsat();
              dispatch(setStatusCorrect(false));
            }
          });
        }
      }else{
        alert('Silahkan Periksa Token');
        dispatch(setStatusCorrect(false));
        bangsat();
      }
    });
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
          <Text style={styles.text1}>Register</Text>
          
          <TextInput
            placeholder="Token"
            placeholderTextColor="#fff"
            style={styles.textInputToken} 
            onChangeText={value => onInputChange1(value)}
          />

          <TouchableHighlight onPress={() => alert("Silahkan Hubungi Admin")} underlayColor="">
            <Text style={styles.text2}>Dari mana saya mendapatkan Token?</Text>
          </TouchableHighlight>

          <Btn onPress={Btn1} judul='Next' Loading={register.isLoading}/>

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

/*import React, { Component } from 'react';
import { AsyncStorage, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default class tutorialAsyncStorage extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            hobby: '',
            textName: '',
            textHobby: ''
        };

        AsyncStorage.getItem('user', (error, result) => {
            if (result) {
                let resultParsed = JSON.parse(result)
                this.setState({
                    name: resultParsed.name,
                    hobby: resultParsed.hobby
                });
            }
        });
    }

    saveData() {
        let asw = this.state.textName;
        let asd = this.state.textHobby;
        let data = {
            name: asw,
            hobby: asd
        }

        AsyncStorage.setItem('user', JSON.stringify(data));

        this.setState({
            name: asw,
            hobby: asd
        });

        alert('Data tersimpan');
    }

    async removeItemValue() {
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

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Halo! Kenalan yuk!
                </Text>
                <Text style={styles.instructions}>
                    Nama: {this.state.name}{'\n'}
                    Hobi: {this.state.hobby}
                </Text>
                <TextInput style={styles.textInput}
                    onChangeText={(textName) => this.setState({textName})}
                    placeholder='Nama'
                />
                <TextInput style={styles.textInput}
                    onChangeText={(textHobby) => this.setState({textHobby})}
                    placeholder='Hobi'
                />
                <Button
                    title='Simpan'
                    onPress={this.saveData.bind(this)}
                />

                <Button
                    title='Hapus'
                    onPress={this.removeItemValue}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 16,
    paddingTop: 32
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  textInput: {
    height: 35,
    backgroundColor: 'white',
    marginTop: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 8
  }
});*/
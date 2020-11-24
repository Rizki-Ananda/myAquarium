import React, { useState, useEffect } from "react";
import { StyleSheet, AsyncStorage, Switch, Text, View, Image, StatusBar, TouchableHighlight, SafeAreaView, FlatList} from 'react-native';
import head from '../../image/header.jpg';
import iclampon from '../../image/lampon.png';
import iclampoff from '../../image/lampoff.png';
import power from '../../image/power.png';
import {database} from '../../config';
import { BtnPower } from "../../atom";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DATA = [];

const Items = ({ title }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
  <View style={styles.lsitem1}>
    <Text style={styles.lstitle1}>{title}</Text>
    <Switch
        trackColor={{ false: "#767577", true: "#71c2e2" }}
        thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
        style={{ transform:[{ scaleX: 1.4 }, { scaleY: 1.4 }], position:'absolute', alignSelf:'center', right:2 }}
        onValueChange={toggleSwitch}
        value={isEnabled}
    />
  </View>
  );
}

export default function PageOne({navigation}) {
  const renderItem = ({item}) => (
    <Items title={item.title} />
  );

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const kucing = () => {
    const bujang = database.ref('feeder/' + Token);
    bujang.on('value', function(snapshot){
      console.log(snapshot.val());
      /*Object.keys(snapshot.val()).map(key => {
        DATA.push({
          id: key,
          title: snapshot.val()[key]
        })
      })*/
      console.log(DATA);
    })
  };

  const suhuku = () => {
    AsyncStorage.getItem('user', (error, result) => {
      let resultParsed = JSON.parse(result);
      const bujang = database.ref('suhu/' + resultParsed.token);
      bujang.on('value', function(snapshot){
        setSuhu(snapshot.val().suhu)
      })
    })
  };

  const handleConfirm = (time) => {
    let jam = time.getHours();
    let menit = time.getMinutes();

    let f = menit;

    while (f >= 1) {
      f /= 10;
    }
    try {
      AsyncStorage.getItem('user', (error, result) => {
        if(result){
          let resultParsed = JSON.parse(result);
          database.ref('feeder/' + resultParsed.token).push({
            status: true,
            jam: f += jam
          });
        }
      });
      hideDatePicker();
      kucing();
    } catch (error) {
      console.log(error);
    }
  };

  const [text, setText] = useState();
  const [lampu, setLampu] = useState();
  const [suhu, setSuhu] = useState();
  const [Iclampu, setIcLampu] = useState();
  const [Token, setToken] = useState();

  AsyncStorage.getItem('user', (error, result) => {
    if (result) {
        let resultParsed = JSON.parse(result)
        setText(resultParsed.lampuStatus);
        setIcLampu(resultParsed.lampuGambar);
        setLampu(resultParsed.lampu);
        setToken(resultParsed.token);
    }
  });

  useEffect(() => {
    if(Token === null){
      navigation.navigate('Login');
    }else{
      suhuku();
    }
  });

  const BtnOn = () => {
    let asw = false; 
    let teks = 'Off'; 
    let gambar = iclampoff;
    let dataBaru = {
      lampu: asw,
      lampuStatus: teks,
      lampuGambar: gambar,
    }
    //alert('On')
    AsyncStorage.getItem('user', (error, result) => {
      if (result) {
          let resultParsed = JSON.parse(result)
          database.ref('lampu/' + resultParsed.token ).update({
            lampu: false,
          }).then(error =>{
            if(error){
              console.log(error);
            }else{
              setLampu(false);
              setText('Off');
              setIcLampu(iclampoff);
              AsyncStorage.mergeItem('user', JSON.stringify(dataBaru));
            }
          });
      }
    });
  }
  const BtnOff = () => {
    //alert('Off')
    let asw = true; 
    let teks = 'On'; 
    let gambar = iclampon;
    let dataBaru = {
      lampu: asw,
      lampuStatus: teks,
      lampuGambar: gambar,
    }
    AsyncStorage.getItem('user', (error, result) => {
      if (result) {
          let resultParsed = JSON.parse(result)
          database.ref('lampu/' + resultParsed.token ).update({
            lampu: true,
          }).then(error =>{
            if(error){
              console.log(error);
            }else{
              setLampu(true);
              setText('On');
              setIcLampu(iclampon);
              AsyncStorage.mergeItem('user', JSON.stringify(dataBaru));
            }
          });
      }
    });
  }

  return (
    <View>
      
      <View style={styles.container}>
        <Image source={head} style={styles.header}/>
      </View>

      <Text style={styles.title}>MyAquarium</Text>

      <View style={styles.main}>
        <View style={styles.content}>
          
          <View style={styles.lamp}>
            <Text style={styles.titlecontent}>Lampu</Text>
            <Image source={Iclampu} style={styles.iclamp}/>
            <Text style={styles.lampStatus}>{text}</Text>
            
            <BtnPower off={BtnOff} on={BtnOn} Loading={lampu} source={power}/>
            
            {/*<View style={styles.borderPower}>
            <TouchableHighlight onPress={Btn1} underlayColor="">
            <Image source={power} style={styles.power}/>
            </TouchableHighlight>
            </View>*/}
            
          </View>

          <View style={styles.temp}>
          <Text style={styles.titlecontent}>Suhu</Text>
          <Text style={styles.tempContent}>{suhu}°C</Text>
          </View>
        </View>
        
        <View style={styles.fishfeed}>
        <Text style={styles.titlecontent}>Pakan Automatis</Text>

          <SafeAreaView style={styles.lscontainer1}>
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>

        <TouchableHighlight style={styles.borderPower} onPress={showDatePicker}>
          <Text style={styles.plus}>+</Text>
        </TouchableHighlight>
        
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          is24Hour={true}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        </View>
        
      </View>
      <StatusBar backgroundColor="#71c2e2" />
    </View>
  );
}

const styles = StyleSheet.create({
  lscontainer1: {
    flex: 1,
  },
  lsitem1: {   
    padding: 5,
    marginVertical:3,
    flexDirection:'row',
  },
  lstitle1: {
    fontSize: 32,
    fontFamily:'Morn',
    color:'#2e2e2e',
  },
  container: {
    width: '100%',
    height: 200,
  },
  header:{
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
  },
  title:{
    fontSize: 60,
    color:'#ffffff',
    position:'absolute',
    top:35,
    fontFamily:'better',
    alignSelf:'center',
  },
  main:{
    borderTopStartRadius:20,
    borderTopEndRadius:20,
    marginTop:-19,
    height:500,
    backgroundColor:'#ffffff',
    padding:15,
  },
  content:{
    flex: 1,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  lamp:{
    width:'48%',
    height:170,
    padding:10,
    backgroundColor:'#f2f5f9',
    borderRadius: 20,
  },
  temp:{
    width:'48%',
    height:170,
    padding:10,
    backgroundColor:'#f2f5f9',
    borderRadius: 20,
  },
  fishfeed:{
    bottom:65,
    height:225,
    padding:10,
    backgroundColor:'#f2f5f9',
    borderRadius: 20,
  },
  titlecontent:{
    fontSize:18,
    marginBottom:2,
    fontFamily:'Aaargh',
    color:'#2e2e2e',
  },
  iclamp:{
    top:15,
    alignSelf:'center',
  },
  lampStatus:{
    position:'absolute',
    bottom:15,
    left:15,
    fontSize:18,
    fontFamily:'Aaargh',
    color:'#2e2e2e',
  },
  borderPower:{
    width:35,
    height:35,
    backgroundColor:'#71c2e2',
    borderRadius:17.5,
    padding:10,
    position:'absolute',
    bottom:15,
    right:15,
  },
  power:{
    width:15,
    height:15,
  },
  tempContent:{
    fontSize:60,
    fontFamily:'Morn',
    color:'#444444',
    textAlign:'center',
    top:15,
  },
  plus:{
    fontSize:30,
    color:'#ffffff',
    bottom:15,
    textAlign:'center',
  },
  lscontainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  lsitem: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  lstitle: {
    fontSize: 32,
  },
});
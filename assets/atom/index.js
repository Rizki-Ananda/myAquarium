import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, TextInput, Image } from 'react-native';

export const Konfirmasi = ({uncorrect, onChangeText}) => {
    if(uncorrect){
        return(
            <TextInput 
            placeholder="Konfirmasi kata sandi"
            placeholderTextColor='#fff'
            style={styles.textInputwrong} 
            onChangeText={onChangeText}
            />
        )    
    }
    return(
        <TextInput 
        placeholder="Konfirmasi kata sandi"
        placeholderTextColor='#fff'
        style={styles.textInput} 
        onChangeText={onChangeText}
        />
    )
}

export const Btn = ({onPress, Loading, judul}) => {
    if(Loading){
        return(
        <TouchableHighlight underlayColor="">
            <View style={styles.btnContainer}>
                <Text style={styles.btntxtLoad}>Loading</Text>
            </View>
        </TouchableHighlight>        
        )    
    }
    return(
    <TouchableHighlight onPress={onPress} underlayColor="">
        <View style={styles.btnContainer}>
            <Text style={styles.btntxt}>{judul}</Text>
        </View>
    </TouchableHighlight>
    )
}

export const BtnPower = ({ off, on, Loading, source }) => {
    if(!Loading){
        return(
            <TouchableHighlight style={styles.borderPowerOff} onPress={off} underlayColor="">
            <Image source={source} style={styles.power}/>
            </TouchableHighlight>
        )
    }
    return(
        <TouchableHighlight style={styles.borderPowerOn} onPress={on} underlayColor="">
        <Image source={source} style={styles.power}/>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    borderPowerOn:{
        width:35,
        height:35,
        backgroundColor:'#71c2e2',
        borderRadius:17.5,
        padding:10,
        position:'absolute',
        bottom:15,
        right:15,
      },
      borderPowerOff:{
        width:35,
        height:35,
        backgroundColor:'#767577',
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
    },
    btntxtLoad: {
        fontSize:15,
        color:'#095179',
        alignSelf:"center",
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
    textInputwrong: {
        height: 40,
        paddingHorizontal: 10,
        color:'#fff',
        paddingLeft: 40,
        marginBottom:12,
        borderRadius: 7,
        borderColor:'red',
        borderBottomWidth:1,
      },
})
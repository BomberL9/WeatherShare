import React, { Component } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, Image, ImageBackground, Alert, TouchableOpacity } from "react-native";
import firebase from "firebase";
import { firestore, auth } from '../config';


const loginBackground = require("../assets/loginBackground.png");
const loginLogo = require("../assets/loginLogo.png");

export default class Login extends Component{
    constructor(props){
        super(props);
        //variáveis de estado
        this.state = {
            name: "",
            email: "",
            password: ""
        }
    }

    handleLogin = (email, password) => {
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(()=>{
            this.props.navigation.navigate("System");
        })
        .catch(error => {
            Alert.alert(error.message);
        })
    }

    render(){
        const { email, password } = this.state;
        return(
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <ImageBackground source={loginBackground} resizeMode="cover" style={styles.background}>
                    <View style={styles.upperContainer}>
                        <Image source={loginLogo} style={styles.image}/>
                        <Text style={styles.title} on>WeatherShare</Text>
                    </View>
                    <View style={styles.lowerContainer}>
                        <TextInput
                        style={styles.textInput}
                        onChangeText={text => this.setState({email: text})}
                        placeholder="Insira seu email"
                        inputMode="email"
                        autoFocus/>
                        
                        <TextInput
                        style={styles.textInput}
                        onChangeText={text => this.setState({password: text})}
                        placeholder="Insira sua senha"
                        secureTextEntry/>

                        <View style={styles.signUpBlock}>
                            <Text style={styles.signUpText}>Não tem uma conta? </Text>
                            <TouchableOpacity>
                                <Text style={{textDecorationLine: 'underline', ...styles.signUpText}}>Registrar</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={{backgroundColor: '#93CAED', ...styles.signInButton}}
                        onPress={()=>this.handleLogin(email, password)}>
                            <Text style={styles.signInText}>Entrar</Text>
                        </TouchableOpacity>
                        {/* botão provisório de logar sem conta */}
                        <TouchableOpacity style={{backgroundColor: '#D3D3D3', ...styles.signInButton}}
                        onPress={()=>this.props.navigation.navigate("System")}>
                            <Text style={styles.signInText}>Entrar sem conta</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#0396FF'
    },
    background:{
        flex: 1,
        justifyContent: 'center'
    },
    upperContainer:{
        flex: 0.5,
        alignItems: 'center'
    },
    image:{
        width: '60%',
        height: '80%'
    },
    title:{
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'Montserrat_500Medium',
        color: '#FFEA00'
    },
    lowerContainer:{
        flex: 0.5,
        marginTop: 20
    },
    textInput:{
        fontSize: 20,
        fontFamily: 'Montserrat_500Medium',
        textAlign: 'center',
        borderWidth: 3,
        padding: 10,
        borderRadius: 30,
        borderColor: '#93CAED',
        marginBottom: 10
    },
    signUpBlock:{
        flexDirection: 'row',
        justifyContent: 'center'
    },
    signUpText:{
        color: '#D3D3D3',
        fontSize: 15,
        fontFamily: 'Montserrat_500Medium'
    },
    signInButton:{
        borderRadius: 20,
        marginTop: 30,
        padding: 30,
        alignSelf: 'center',
        opacity: 0.8
    },
    signInText:{
        fontFamily: 'Montserrat_500Medium',
        fontSize: 20,
        textAlign: 'center'
    }
})
import React, { useEffect, useState } from "react";
import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    Alert, 
    SafeAreaView, 
    ActivityIndicator, 
    ScrollView, 
    RefreshControl, 
    ImageBackground,
    StatusBar,
    Platform } from "react-native";
import * as Location from "expo-location";

const openWeatherKey = "e38f5fa27e782d388a8076a568bacafd";

const sunBackground = require('../assets/sunBackground.png');
const moonBackground = require('../assets/moonBackground.png');
const thermalSensitive = require('../assets/thermal_sensitive.png');
const humidity = require('../assets/humidity.png');
const windSpeed = require('../assets/wind_speed.png');
const atmosphericPressure = require('../assets/atmospheric_pressure.png');

const Weather = () => {
    const [forecast, setForecast] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const loadForecast = async() => {
        setRefreshing(true);
        //permissão para acessar a localização
        const {status} = await Location.getForegroundPermissionsAsync();
        if(status !== 'granted'){
            Alert.alert("A permissão para acessar a localização foi negada"); //alerta de erro de acesso negado
        }

        //pega a localização atual
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});

        //busca os dados do clima na api openweathermap
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${openWeatherKey}&units=metric&lang=${'pt_br'}`);

        const data = await response.json(); //converte a resposta pra json

        if(!response.ok){
            Alert.alert("Erro", "Não foi possível encontrar os dados climáticos"); //alerta de erro em buscar a resposta
        }else{
            setForecast(data); //define os dados para o estado
        }
        setRefreshing(false);
    }

    const getCurrentTime = () => {
        let hour = new Date().getHours();
        if (hour < 18 && hour > 5) {
            return "day";
        }
    }
    //useEffect == componentDidMount
    useEffect(() => {
        loadForecast();
    },[]);

    if(!forecast){ //exibe um loading caso a previsão do tempo não tenha carregado
        return(
            <SafeAreaView style={styles.loading}>
                <ActivityIndicator 
                size="large" 
                style={{marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 10}}/>
            </SafeAreaView>
        );
    }

    const current = forecast.weather[0];
    const dayTime = getCurrentTime();

    return(
        <SafeAreaView style={styles.container}>
            <ImageBackground style={styles.imageBackground} 
            source={dayTime === "day" ? sunBackground : moonBackground}>
                <ScrollView
                    refreshControl={
                        <RefreshControl 
                            refreshing={refreshing} 
                            onRefresh={() => loadForecast()}
                        />
                    }
                    style={{marginTop: 50}}
                >
                    <Text style={styles.title}>Clima atual</Text>
                    <Text style={styles.locationText}>Sua localização</Text>
                    <View style={styles.current}>
                        <Image
                            style={styles.largeIcon}
                            source={{
                                uri: `http://openweathermap.org/img/wn/${current.icon}@4x.png`
                            }}
                        />
                        <Text style={styles.currentTempText}>
                            {Math.round(forecast.main.temp)}°C
                        </Text>
                    </View>
                    <View style={styles.current}>
                        <Text style={styles.descriptionText}>{current.description}</Text>
                        <View style={styles.minmax}>
                            <Text style={[styles.minmaxText, {color: 'blue'}]}>
                                Mín: {Math.round(forecast.main.temp_min)}°C
                            </Text>
                            <Text style={[styles.minmaxText, {color: 'red'}]}>
                                Máx: {Math.round(forecast.main.temp_max)}°C
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.current, {left: 15}]}>
                        <View style={styles.smallBox}>
                            <Text style={styles.smallText}>Sens. térmica</Text>
                            <Image source={thermalSensitive} style={styles.smallIcon}/>
                            <Text style={styles.smallText}>{Math.round(forecast.main.feels_like)}°C</Text>
                        </View>
                        <View style={styles.smallBox}>
                            <Text style={styles.smallText}>Umidade</Text>
                            <Image source={humidity} style={styles.smallIcon}/>
                            <Text style={styles.smallText}>{forecast.main.humidity}%</Text>
                        </View>
                        <View style={styles.smallBox}>
                            <Text style={styles.smallText}>Vel. do vento</Text>
                            <Image source={windSpeed} style={styles.smallIcon}/>
                            <Text style={styles.smallText}>{forecast.wind.speed} m/s</Text>
                        </View>
                        <View style={styles.smallBox}>
                            <Text style={styles.smallText}>Press. atmos.</Text>
                            <Image source={atmosphericPressure} style={styles.smallIcon}/>
                            <Text style={styles.smallText}>{forecast.main.pressure} hPa</Text>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#0396FF'
    },
    imageBackground:{
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'cover'
    },
    title:{
        textAlign: 'center',
        fontSize: 36,
        fontFamily: 'Montserrat_500Medium',
        color: '#F0F8FF'
    },
    locationText:{
        alignItems: 'center',
        textAlign: 'center',
        fontFamily: 'Montserrat_500Medium',
        color: '#fff'
    },
    current:{
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center'
    },
    largeIcon:{
        width: '70%',
        height: 250
    },
    currentTempText:{
        fontSize: 40,
        fontFamily: 'Montserrat_500Medium',
        textAlign: 'center',
        color: '#F0F8FF',
        right: 20,
        elevation: 10
    },
    descriptionText:{
        fontSize: 25,
        fontFamily: 'Montserrat_500Medium',
        color: '#F0F8FF',
        textTransform: 'capitalize',
        alignSelf: 'flex-start',
        backgroundColor: '#93CAED',
        paddingHorizontal: 15,
        borderRadius: 10,
        opacity: 0.83,
        bottom: 20,
        elevation: 10,
    },
    minmax:{
        backgroundColor: '#93CAED',
        bottom: 50,
        left: 50,
        padding: 20,
        elevation: 10,
        borderRadius: 20,
        opacity: 0.7
    },
    minmaxText:{
        fontFamily: 'Montserrat_500Medium',
        fontSize: 18,
        textAlign: 'center'
    },
    smallBox:{
        flexDirection: 'column',
        backgroundColor: '#93CAED',
        borderRadius: 10,
        padding: 12,
        alignItems: 'center',
        marginRight: 20,
        opacity: 0.7,
        elevation: 10
    },
    smallText:{
        fontFamily: 'Montserrat_500Medium',
        fontSize: 7,
        textAlign: 'center'
    },
    smallIcon:{
        width: 50,
        height: 50
    }
})

export default Weather;
import { StatusBar } from 'expo-status-bar';
import { Alert } from "react-native";
import React from 'react';
import Loading from './Loading.js';
import * as Location from "expo-location";
import axios from "axios";
import Weather from './Weather.js';

const API_KEY = "b4ce4e48327574c40eee38f1b9c342eb";

export default class extends React.Component {
  state = {
    isLoading: true
  };

  getWeather = async (latitude, longitude) => {
    const {
      data: {
        main: { temp },
        weather } } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`)

    //console.log(data);
    this.setState({ isLoading: false, temp, condition: weather[0].main });
  }

  getLocation = async () => {
    try {
      const {
        coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();
      console.log(latitude, longitude);
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't find ur location", "So Sad :(");
    }
  }
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? <Loading /> : <Weather temp={temp} condition={condition} />;
  }
}
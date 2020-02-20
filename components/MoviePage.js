import React, { Component } from 'react'
import {View, Text, FlatList, SafeAreaView, StyleSheet, Image, TouchableWithoutFeedback} from 'react-native'

class MoviePage extends Component {
    render() {
            return (
                <View style={{ width: 200, height: 100 , flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image source={{uri: src}} style={{width: 50, height: 50}}/>
                    <Text>{title}</Text>
                    <Text>Rating: NA</Text>
                    <Text>Year: {year}</Text>
                </View>
            )
    }
}


export default MoviePage;
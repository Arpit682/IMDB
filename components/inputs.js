import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'


class Inputs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieName: '',
            pageNum: 1
        }
    }

    updatePage = () => {
        this.setState({
            pageNum: this.state.pageNum++
        })
    }
    handleMovieName = (text) => {
        this.setState({ movieName: text })
    }
    search = (movieName) => {
        fetch('http://www.omdbapi.com/?apikey=ccef0e&page='+this.state.pageNum+'&s=' + movieName)
            .then(response => response.json())
            .then(responseJson => {
                this.props.navigation.navigate('MovieList', {movies: responseJson.Search,
                    movieName: movieName,
                    updatePage: this.updatePage,
                    pageNum: this.state.pageNum
                });
            })
            .catch(error => {
                console.error(error);
            });
    }
    render() {
        return (
            <View style = {styles.container}>
                <TextInput style = {styles.input}
                           underlineColorAndroid = "transparent"
                           placeholder = "Search"
                           placeholderTextColor = "#9a73ef"
                           autoCapitalize = "none"
                           onChangeText = {this.handleMovieName}/>

                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = {
                        () => this.search(this.state.movieName)
                    }>
                    <Text style = {styles.submitButtonText}> Search </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
export default Inputs;

const styles = StyleSheet.create({
    container: {
        paddingTop: 23
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText:{
        color: 'white'
    }
})
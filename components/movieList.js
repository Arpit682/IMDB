import React, { Component } from 'react'
import { View, Text, FlatList, SafeAreaView, StyleSheet, Image } from 'react-native'

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: props.route.params.pageNum
        }
    }

    handleLoadMore = () => {
        console.log(this.props.route.params)
        this.props.route.params.updatePage();
        fetch('http://www.omdbapi.com/?apikey=ccef0e&page='+ this. props.route.params.pageNum +'&s=' + this.props.route.params.movieName)
            .then(response => response.json())
            .then(responseJson => {
                this.props.navigation.navigate('MovieList', {movies: responseJson.Search});
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        const data = this.props.route.params.movies;
        console.log(this.props)
        console.log(data);
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={({item}) => <Item title={item.Title} src={item.Poster} year={item.Year} />}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.5}
                    keyExtractor={item => item.imdbID}
                />
            </SafeAreaView>
        )
    }
}

function Item({ title, src, year }) {
    return (
            <View style={{ width: 200, height: 100 , flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image source={{uri: src}} style={{width: 50, height: 50}}/>
                <Text>{title}</Text>
                <Text>Rating: NA</Text>
                <Text>Year: {year}</Text>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});
export default MovieList;
import React, { Component } from 'react'
import {View, Text, FlatList, SafeAreaView, StyleSheet, Image, TouchableWithoutFeedback} from 'react-native'

class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            pageNum: props.route.params.pageNum,
            movies: []
        }
    }

    componentDidMount() {
        this.fetchData(1);
    }

    fetchData = (page) => {
        fetch('http://www.omdbapi.com/?apikey=ccef0e&page='+ page +'&s=' + this.props.route.params.movieName)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    loading: false,
                    movies: responseJson.Search
                })
            })
            .catch(error => {
                console.error(error);
            });
    }

    handleLoadMore = () => {
        this.props.route.params.updatePage(this.props.route.params.pageNum++)
        this.fetchData(this.props.route.params.pageNum)
    }

    render() {
        if (this.state.loading) {
            return <Text>Loading..</Text>;
        }
        const data = this.state.movies;
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={({item}) => <Item title={item.Title} src={item.Poster} year={item.Year} item={item}/>}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={2}
                    keyExtractor={item => item.imdbID}
                />
            </SafeAreaView>
        )
    }
}

 const Item = ({ title, src, year, item }) => {
    return (
        <TouchableWithoutFeedback onPress={ () =>         this.props.route.params.navigation.navigate('MoviePage', {
            item: item
        })
        }>
            <View style={{ width: 200, height: 100 , flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Image source={{uri: src}} style={{width: 50, height: 50}}/>
                <Text>{title}</Text>
                <Text>Rating: NA</Text>
                <Text>Year: {year}</Text>
            </View>
        </TouchableWithoutFeedback>
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
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, StatusBar, FlatList} from 'react-native';

//Axios
import axios from 'axios';

//Components
import Card from '../components/Card';

//Constants
import {BASE_URL, API_KEY} from '../config/Constans';

const Movies = () => {
	const [movies, setMovies] = useState([]);
	const [pages, setPages] = useState(1);
	const [loading, setLoading] = useState(false);

	const numColumns = 2;

	useEffect(() => {
		getMovies(pages);
	}, [pages]);

	const handlePages = () => {
		setPages(pages + 1);
	};

	const getMovies = async () => {
		const response = await axios.get(`${BASE_URL}now_playing?api_key=${API_KEY}&language=en-US&page=${pages}`);
		setMovies([...movies, ...response.data.results]);
	};

	const loadList = () => {
		setPages(1);
		setMovies([]);
		getMovies(1);
	};

	return (
		<View style={styles.container}>
			<StatusBar barStyle='dark-content' />
			{movies !== [] && (
				<FlatList
					data={movies}
					renderItem={item => <Card {...item} />}
					keyExtractor={item => item.id}
					numColumns={numColumns}
					onEndReached={handlePages}
					onEndReachedThreshold={0.1}
					refreshing={loading}
					onRefresh={() => loadList()}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
	},
});

export default Movies;

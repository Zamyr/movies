import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Header, Icon} from 'react-native-elements';
import {format} from 'date-fns';
import {ScrollView} from 'react-native-gesture-handler';

//Navigation
import {useNavigation} from '@react-navigation/native';

//Constants
import {BASE_URL, API_KEY, IMAGE_URL} from '../config/Constans';

const initialState = {
	image: '',
	title: '',
	runtime: '',
	release_date: '',
	genres: '',
	overview: '',
	vote_average: '',
};

const Details = props => {
	const navigation = useNavigation();
	const {id} = props.route.params;
	const [movie, setMovie] = useState(initialState);

	useEffect(() => {
		getDetails();
	}, []);

	const getDetails = async () => {
		const response = await axios.get(`${BASE_URL}${id}?api_key=${API_KEY}&language=en-US`);
		const genres = response.data.genres.map(x => x.name).join(', ');
		setMovie({
			image: response.data.backdrop_path,
			title: response.data.title,
			runtime: response.data.runtime,
			release_date: format(new Date(response.data.release_date), 'dd LLLL yyyy'),
			genres: genres,
			overview: response.data.overview,
			vote_average: response.data.vote_average,
		});
	};

	const openMovies = () => navigation.navigate('Movies');

	return (
		<ScrollView style={styles.container}>
			<Header
				placement='left'
				leftComponent={<Icon name='arrow-left' type='material-community' color='#000' onPress={() => openMovies()} />}
				centerComponent={{text: 'Movies', style: {color: '#000', fontSize: 16, paddingTop: 3}}}
				backgroundColor='#fff'
			/>
			<Image source={{uri: `${IMAGE_URL}${movie.image}`}} style={styles.image} />
			<Text style={styles.text}>{movie.title}</Text>
			<View style={styles.content}>
				<View style={styles.subtitleBox}>
					<Text style={styles.subtitle}>Runtime</Text>
					<Text style={styles.subtitles2}>{movie.runtime} min</Text>
				</View>
				<View style={styles.subtitleBox}>
					<Text style={styles.subtitle}>Release Date</Text>
					<Text style={styles.subtitles2}>{movie.release_date}</Text>
				</View>
				<View style={styles.subtitleBox}>
					<Text style={styles.subtitle}>Averge</Text>
					<Text style={styles.subtitles2}>{movie.vote_average}</Text>
				</View>
			</View>
			<View style={{paddingHorizontal: 10}}>
				<View style={{paddingVertical: 10}}>
					<Text style={styles.subtitle}>Genres</Text>
					<Text style={styles.subtitles2}>{movie.genres}</Text>
				</View>
				<View style={{paddingVertical: 10}}>
					<Text style={styles.subtitle}>Description</Text>
					<Text style={styles.subtitles2}>{movie.overview}</Text>
				</View>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	content: {flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginTop: 10},
	image: {
		width: '100%',
		height: 300,
	},
	text: {
		fontSize: 42,
		fontWeight: 'bold',
		textAlign: 'left',
		paddingLeft: 10,
	},
	subtitleBox: {
		alignItems: 'center',
	},
	subtitle: {
		fontSize: 18,
		fontWeight: '500',
		marginBottom: 5,
	},
	subtitle2: {
		fontSize: 16,
		fontWeight: '500',
		textAlign: 'center',
	},
});

export default Details;

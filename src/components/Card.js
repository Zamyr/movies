import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {format} from 'date-fns';

//Navigation
import {useNavigation} from '@react-navigation/native';

//Constants
import {IMAGE_URL} from '../config/Constans';

const Card = props => {
	const navigation = useNavigation();
	const openDetailsMovies = () => navigation.navigate('Detail', {id: props.item.id});

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => openDetailsMovies()}>
				<View style={styles.content}>
					<Image source={{uri: `${IMAGE_URL}${props.item.backdrop_path}`}} style={styles.imageContainer} />
					<View style={styles.infoBox}>
						<Text style={styles.title}>{props.item.title}</Text>
						<View style={styles.info}>
							<Text style={styles.release}>{format(new Date(props.item.release_date), 'dd LLL yyyy')}</Text>
							<View style={styles.vote}>
								<Icon name='star-outline' type='material-community' color='yellow' size={18} iconStyle={{paddingTop: 3, marginRight: -2}} />
								<Text style={styles.text}>{props.item.vote_average}</Text>
							</View>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default Card;

const styles = StyleSheet.create({
	container: {
		width: '50%',
		height: 350,
		paddingHorizontal: 5,
		marginTop: 5,
	},
	imageContainer: {
		width: '100%',
		height: 350,
		borderRadius: 6,
		resizeMode: 'cover',
	},
	content: {
		position: 'relative',
	},
	infoBox: {
		borderBottomRightRadius: 6,
		borderBottomLeftRadius: 6,
		width: '100%',
		height: 80,
		backgroundColor: 'rgba(0, 0, 0, .5)',
		position: 'absolute',
		bottom: 0,
		justifyContent: 'space-around',
	},
	title: {
		color: '#cecece',
		fontSize: 16,
		fontWeight: 'bold',
		paddingTop: 5,
		paddingLeft: 5,
	},
	info: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	vote: {
		flexDirection: 'row',
	},
	text: {
		color: '#cecece',
		fontSize: 12,
		fontWeight: '500',
		paddingTop: 5,
		paddingHorizontal: 5,
	},
	release: {
		color: '#cecece',
		fontSize: 12,
		fontWeight: '500',
		paddingTop: 5,
		paddingHorizontal: 5,
	},
});

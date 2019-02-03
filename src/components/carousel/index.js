import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CarouselCard from './card';
import { SCREEN_HEIGHT } from '../../utilities/utils';

const IMAGE_HEIGHT = SCREEN_HEIGHT / 2;

class Carousel extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                >
                    {this.props.photos.map((image) => (
                        <CarouselCard key={image.UID} image={image} />
                    ))}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: ((IMAGE_HEIGHT / 4) * 3) + 20,
        height: IMAGE_HEIGHT + (IMAGE_HEIGHT / 5),
    }
});

export default Carousel;
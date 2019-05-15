import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import CarouselCard from './card';
import { SCREEN_HEIGHT, SCREEN_WIDTH, getPhotoIndicies } from '../../utilities';
import { tips } from '../../data/tips';

const IMAGE_HEIGHT = SCREEN_HEIGHT / 2;

const Carousel = (props) => {
    let indicies = getPhotoIndicies();
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
            >
                {props.photos.map((image, index) => (
                    <CarouselCard key={image.UID} image={image} tip={tips[indicies[index]]} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: IMAGE_HEIGHT + (IMAGE_HEIGHT / 5),
    }
});

export default Carousel;
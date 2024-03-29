import React, { FC } from 'react';
import { StyleSheet, View, Platform, Dimensions } from 'react-native';
import { default as SnapCarousel } from 'react-native-snap-carousel';
import * as Animatable from 'react-native-animatable';
import { LegoMinifig } from '../../interfaces/Api';

interface CarouselProps {
  list: LegoMinifig[];
  carouselItem: ({ item, index }: { item: LegoMinifig; index: number }) => React.JSX.Element;
  activeIndex: number | undefined;
}

const Carousel: FC<CarouselProps> = ({ list, carouselItem, activeIndex }) => {
  const renderItem = ({ item, index }: { item: LegoMinifig; index: number }) => {
    const isActive = index === activeIndex;
    const CarouselItem = carouselItem;

    return (
      <Animatable.View
        animation={isActive ? 'tada' : undefined}
        duration={500}
        style={carouselElementStyles(isActive).itemContainer}
      >
        <CarouselItem item={item} index={index} />
      </Animatable.View>
    );
  };

  return (
    <View style={styles.container}>
      <SnapCarousel
        layout={'default'}
        data={list as FlatArray<any, any>}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={260}
        removeClippedSubviews={false}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 500,
  },
});

const carouselElementStyles = (isActive: boolean) =>
  StyleSheet.create({
    itemContainer: {
      minHeight: 330,
      backgroundColor: '#fff',
      borderRadius: 20,
      paddingTop: 20,
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 40,
      marginTop: 50,
      marginLeft: 10,
      marginRight: 10,
      display: 'flex',
      flexBasis: 1,
      ...(isActive
        ? Platform.select({
            ios: {
              shadowColor: '#FF8B2C',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.8,
              shadowRadius: 18,
            },
            android: {
              shadowColor: '#FF8B2C',
              elevation: 20, // changed to a greater value
            },
          })
        : {}),
    },
  });

export default Carousel;

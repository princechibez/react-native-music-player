import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  Animated,
} from 'react-native';
import TrackPlayer, {
  Capability,
  Event,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import React, {useEffect, useState, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import songs from '../../model/data';

const {width, height} = Dimensions.get('window');

const setUpPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(songs);
  } catch (err) {
    console.log(err);
  }
};

const tooglePlayBack = async playbackState => {
  const currentTract = await TrackPlayer.getCurrentTrack();
  if (currentTract !== null) {
    if (playbackState == State.Paused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  }
};

const musicPlayer = () => {
  const playbackState = usePlaybackState();
  const [songIndex, setSongIndex] = useState(0);
  const scrollx = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setUpPlayer();
    scrollx.addListener(({value}) => {
      const index = Math.round(value / width);
      setSongIndex(index);
      console.log(songIndex);
    });
  }, [songIndex]);

  const renderSongs = ({item, index}) => {
    return (
      <Animated.View style={styles.mainImageWrapper}>
        <View style={[styles.imageWrapper, styles.elevation]}>
          <Image style={styles.musicImage} source={item.artwork} />
        </View>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        {/* Image */}
        <Animated.FlatList
          data={songs}
          renderItem={renderSongs}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onscroll={Animated.event(
            [
              {
                nativeEvent: {x: scrollx},
              },
            ],
            {useNativeDriver: true},
          )}
        />
        {/* <View style={styles.mainImageWrapper}>
          <View style={[styles.imageWrapper, styles.elevation]}>
            <Image style={styles.musicImage} source={require('../../assets/img/img2.jpg')} />
          </View>
        </View> */}

        {/* Song Content */}
        <View style={styles.lowerContainer}>
          <View>
            <Text style={[styles.songTitle, styles.songContent]}>
              {songs[songIndex].title}
            </Text>
            <Text style={[styles.songArtist, styles.songContent]}>
              {songs[songIndex].artist}
            </Text>
          </View>

          {/* slider */}
          <View>
            <Slider
              style={styles.progressBar}
              value={10}
              minimumValue={0}
              maximumValue={100}
              thumbTintColor="#FFD369"
              minimumTrackTintColor="#FFD369"
              maximumTrackTintColor="#fff"
              onSlidingComplete={() => {}}
            />
            {/* music progress durations */}
            <View style={styles.progressLevelDuration}>
              <Text style={styles.progressLabelText}>00:00</Text>
              <Text style={styles.progressLabelText}>00:00</Text>
            </View>
          </View>

          {/* music controls */}
          <View style={styles.musicControlsContainer}>
            <TouchableOpacity onPress={() => {}}>
              <Ionicons
                name="play-skip-back-outline"
                size={35}
                color="#FFD369"
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => tooglePlayBack(playbackState)}>
              <Ionicons
                name={
                  playbackState === State.Playing
                    ? 'ios-play-circle'
                    : 'ios-pause-circle'
                }
                size={75}
                color="#FFD369"
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {}}>
              <Ionicons
                name="play-skip-forward-outline"
                size={35}
                color="#FFD369"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomIconWrapper}>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="heart-outline" size={30} color="#888888" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="repeat" size={30} color="#888888" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="share-outline" size={30} color="#888888" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}}>
            <Ionicons name="ellipsis-horizontal" size={30} color="#888888" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default musicPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222831',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    width: width,
    alignItems: 'center',
    paddingVertical: 15,
    borderTopColor: '#393E46',
    borderWidth: 1,
  },
  bottomIconWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  imageWrapper: {
    width: 300,
    height: 340,
    marginTop: 20,
  },
  mainImageWrapper: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicImage: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
  },

  //   elevation: {
  //     elevation: 5,
  //     shadowColor: '#ccc',
  //     shadowOffset: {
  //       width: 5,
  //       height: 5,
  //     },
  //     shadowOpacity: 0.5,
  //     shadowRadius: 3.84,
  //   },
  songContent: {
    textAlign: 'center',
    color: '#EEEEEE',
  },
  lowerContainer: {
    marginBottom: '15%',
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  songTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#EEEEEE',
  },
  songArtist: {
    fontSize: 16,
    fontWeight: '300',
  },
  progressBar: {
    width: 350,
    height: 40,
    marginTop: 20,
    flexDirection: 'row',
  },
  progressLevelDuration: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabelText: {
    color: '#FFF',
    fontWeight: '500',
  },
  musicControlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 10,
  },
});

import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useMMKVObject } from 'react-native-mmkv';
import Animated from 'react-native-reanimated';
import { Image, ListItem, ScrollView, Text } from 'tamagui';
import { MediaType } from '~/interfaces/apiresult';

import { Favorite } from '~/interfaces/favorites';
import { Container, Main } from '~/tamagui.config';

const Page = () => {
    const [favorites, setFavorites] = useMMKVObject<Favorite[]>('favorites');

    // console.log('favorites', favorites);

    return (
        <Main>
            <Container>
                <ScrollView>
                    {favorites?.map((fav) => {
                        console.log('fav.mediaType', fav.mediaType);

                        console.log("favorites Page",`${fav.mediaType === MediaType.Movie ? MediaType.Movie : MediaType.TV}-${fav.id}`)
                        return (
                            <Link
                                key={fav.id}
                                href={`/(drawer)/favorites/${fav.mediaType}/${fav.id}`}
                                asChild>
                                <ListItem
                                    key={fav.id}
                                    theme={'alt2'}
                                    title={fav.name}
                                    size={'$3'}
                                    icon={() => (
                                        <Animated.Image
                                            source={{
                                                uri: `https://image.tmdb.org/t/p/w500${fav.thumbnail}`,
                                            }}
                                            style={{ width: 50, height: 50 }}
                                            sharedTransitionTag={`${fav.mediaType === MediaType.Movie ? MediaType.Movie : MediaType.TV}-${fav.id}`}
                                        />
                                    )}
                                />
                            </Link>
                        );
                    })}
                </ScrollView>
            </Container>
        </Main>
    );
};

export default Page;

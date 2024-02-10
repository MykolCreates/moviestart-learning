import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { ImageBackground } from 'react-native';
import { useMMKVBoolean, useMMKVObject } from 'react-native-mmkv';
import Animated from 'react-native-reanimated';
import { Main, ScrollView, YStack, H1, Text, Paragraph, Button, useTheme } from 'tamagui';

import { MediaType } from '~/interfaces/apiresult';
import { Favorite } from '~/interfaces/favorites';
import { getMovieDetails } from '~/services/api';

type DetailsPageProps = {
    id: string;
    mediaType: MediaType;
};

const DetailsPage = ({ id, mediaType }: DetailsPageProps) => {
    const [isFavorite, setIsFavorite] = useMMKVBoolean(`${mediaType}-${id}`);
    const [favorites, setFavorites] = useMMKVObject<Favorite[]>('favorites');
    const theme = useTheme();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['movie', id],
        queryFn: () => getMovieDetails(+id, mediaType),
    });

    const toggleFavorite = () => {
        const current = favorites || [];

        if (!isFavorite) {
            setFavorites([
                ...current,
                { id, mediaType, thumbnail: data.poster_path, name: data.title || data.name },
            ]);
        } else {
            setFavorites(current.filter((fav) => fav.id !== id || fav.mediaType !== mediaType));
        }
        setIsFavorite(!isFavorite);
    };

    console.log("Detail Page",`${mediaType === MediaType.Movie ? MediaType.Movie : MediaType.TV}-${id}`)

    return (
        <Main>
            <Stack.Screen
                options={{
                    headerRight: () => (
                        <Button
                            unstyled
                            onPress={toggleFavorite}
                            mt={10}
                            hoverStyle={{ scale: 0.925 }}
                            pressStyle={{ scale: 0.975 }}
                            animation="bouncy">
                            <Ionicons
                                name={isFavorite ? 'heart' : 'heart-outline'}
                                size={24}
                                color={theme.blue9.get()}
                            />{' '}
                        </Button>
                    ),
                }}
            />
            <ScrollView>
                <ImageBackground
                    source={{ uri: `https://image.tmdb.org/t/p/w200${data?.backdrop_path}` }}>
                    <Animated.Image
                        borderRadius={6}
                        source={{ uri: `https://image.tmdb.org/t/p/w200${data?.poster_path}` }}
                        style={{ width: 200, height: 300, margin: 10 }}
                        sharedTransitionTag={`${mediaType === MediaType.Movie ? MediaType.Movie : MediaType.TV}-${id}`}
                    />
                </ImageBackground>
                <YStack p={10} animation="lazy" enterStyle={{ opacity: 0, y: 10 }}>
                    <H1 color="$blue7">
                        {data?.title || data?.name}
                        <Text fontSize={20}>
                            ({new Date(data?.release_date! || data?.first_air_date!).getFullYear()})
                        </Text>
                    </H1>
                    <Paragraph theme="alt2">{data?.tagline}</Paragraph>
                    <Text fontSize={16}>{data?.overview}</Text>
                </YStack>
            </ScrollView>
        </Main>
    );
};

export default DetailsPage;

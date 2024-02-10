import { useQuery } from '@tanstack/react-query';
import { ImageBackground } from 'react-native';
import Animated from 'react-native-reanimated';
import { Main, ScrollView, Image, YStack, H1, Text, Paragraph } from 'tamagui';

import { MediaType } from '~/interfaces/apiresult';
import { getMovieDetails } from '~/services/api';

type DetailsPageProps = {
    id: string;
    mediaType: MediaType;
};

const DetailsPage = ({ id, mediaType }: DetailsPageProps) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['movie', id],
        queryFn: () => getMovieDetails(+id, mediaType),
    });

    console.log(`${mediaType === 'movie' ? MediaType.Movie : MediaType.TV}-${id}`)

    return (
        <Main>
            <ScrollView>
                <ImageBackground
                    source={{ uri: `https://image.tmdb.org/t/p/w200${data?.backdrop_path}` }}>
                    <Animated.Image
                        borderRadius={6}
                        source={{ uri: `https://image.tmdb.org/t/p/w200${data?.poster_path}` }}
                        style={{ width: 200, height: 300, margin: 10 }}
                        sharedTransitionTag={`${mediaType === 'movie' ? MediaType.Movie : MediaType.TV}-${id}`}
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

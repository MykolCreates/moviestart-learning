import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Input, ScrollView, Spinner, YStack } from 'tamagui';

import MovieCard from '~/components/MovieCard';
import { getSearchResults, getTrending } from '~/services/api';
import { Container, Main, Subtitle, Title } from '~/tamagui.config';
import useDebounce from '~/utils/useDebounce';

const Page = () => {
    const [searchString, setSearchString] = useState('');
    const debounceString = useDebounce(searchString, 300);

    const trendingQuery = useQuery({
        queryKey: ['trending'],
        queryFn: getTrending,
    });

    const searchQuery = useQuery({
        queryKey: ['search', debounceString],
        queryFn: () => getSearchResults(debounceString),
        enabled: debounceString.length > 1,
    });

    useEffect(() => {
        console.log('Search String', searchString);
    }, [searchString]);

    const isLoading = trendingQuery.isLoading || searchQuery.isLoading;

    return (
        <Main>
            <ImageBackground
                source={{
                    uri: 'https://media.themoviedb.org/t/p/w1920_and_h600_multi_faces/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg',
                }}
                style={{ width: '100%', height: 200 }}
                onError={(err) => {
                    console.log('err', err);
                }}>
                <Container>
                    <YStack>
                        <Title
                            color="#fff"
                            enterStyle={{ opacity: 0, scale: 2.5, y: -10 }}
                            animation="quick">
                            Trending
                        </Title>
                        <Input
                            placeholder="Search for a Movie, TV Show Person"
                            placeholderTextColor="#fff"
                            borderWidth={4}
                            size="$4"
                            value={searchString}
                            onChangeText={setSearchString}
                        />
                    </YStack>
                </Container>
            </ImageBackground>

            <Subtitle p={10} enterStyle={{ opacity: 0 }} animation="lazy">
                {searchQuery.data?.results ? 'Search Results' : 'Trending'}
            </Subtitle>

            {isLoading && <Spinner py={14} size="large" color="$blue10" />}

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                py={40}
                contentContainerStyle={{ gap: 14, paddingLeft: 14 }}>
                {!isLoading &&
                    (searchQuery.data?.results
                        ? searchQuery.data?.results.map((item) => (
                              <MovieCard key={item.id} movie={item} />
                          ))
                        : trendingQuery.data?.results &&
                          trendingQuery.data?.results.map((item) => (
                              <MovieCard key={item.id} movie={item} />
                          )))}
            </ScrollView>
        </Main>
    );
};

export default Page;

const styles = StyleSheet.create({});

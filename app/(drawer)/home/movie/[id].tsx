import { useLocalSearchParams } from 'expo-router';

import DetailsPage from '~/components/DetailsPage';
import { MediaType } from '~/interfaces/apiresult';

const Page = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    console.log('🚀 ~ Page ~ id:', id);
    return <DetailsPage id={id} mediaType={MediaType.Movie} />;
};

export default Page;

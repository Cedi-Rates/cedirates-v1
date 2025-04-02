import Header from '@/components/navbar/Header';
import LatestNewsStories from '@/components/news/latest-stories';
import { getUser } from '@/utils/helpers/api';
import { cookies } from 'next/headers';

const page = async () => {
    const user = await getUser(cookies().toString());

    return (
        <div>
            <Header user={user} />
            <LatestNewsStories />
        </div>
    )
}

export default page
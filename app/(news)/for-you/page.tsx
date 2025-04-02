import Header from '@/components/navbar/Header'
import ForYouNews from '@/components/news/for-you';
import { getUser } from '@/utils/helpers/api';
import { cookies } from 'next/headers';

const page = async () => {
    const user = await getUser(cookies().toString());

    return (
        <div>
            <Header user={user} />
            <ForYouNews />
        </div>
    )
}

export default page
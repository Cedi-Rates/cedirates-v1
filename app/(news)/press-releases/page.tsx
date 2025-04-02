import Header from '@/components/navbar/Header';
import PressReleasesNews from '@/components/news/press-release';
import { getUser } from '@/utils/helpers/api';
import { cookies } from 'next/headers';

const page = async () => {
    const user = await getUser(cookies().toString());

    return (
        <div>
            <Header user={user} />
            <PressReleasesNews />
        </div>
    )
}

export default page
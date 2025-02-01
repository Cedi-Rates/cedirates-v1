import Developer from '@/components/developer/dev';
import NavbarLight from '@/components/navbar/NavbarLight';
import { getUser } from '@/utils/helpers/api';
import { cookies } from 'next/headers';

const page = async () => {
    const user = await getUser(cookies().toString());

    return (
        <div>
            <NavbarLight user={user} />
            <Developer user={user} />
        </div>
    )
}

export default page

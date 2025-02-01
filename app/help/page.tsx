import React from 'react'
import style from '../../assets/styles/help.module.css'
import NavbarLight from '@/components/navbar/NavbarLight'
import Image from 'next/image'
import { getUser } from '@/utils/helpers/api'
import { cookies } from 'next/headers'
import GoogleOneTapLogin from '@/components/auth/GoogleOneTapLogin'
const logo = require('../../assets/images/cedirates-logotype.png')

const Help = async () => {
  const user = await getUser(cookies().toString());

  return (
    <div className={style.help}>
      <GoogleOneTapLogin user={user} />
      <NavbarLight user={user} />
      <div className={style["help-container"]}>
        <div className={style.text}>
          <h1>
            Need help with anything CediRates, want to make enquiries or
            contributions?
          </h1>
          <p>
            Click{" "}
            <a
              href="https://t.me/cedirates"
              target="_blank"
              rel="noreferrer noopener"
            >
              here
            </a>{" "}
            to join our telegram channel and interact with the CediRates team.
          </p>
        </div>
        <Image src={logo} alt='logo' />
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default Help
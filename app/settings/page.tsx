import Header from "@/components/navbar/Header";
import NavbarLight from "@/components/navbar/NavbarLight";
import SettingsPage from "@/components/settings/SettingsPage";
import { getUser } from "@/utils/helpers/api";
import { cookies } from "next/headers";

const Settings = async () => {
  const user = await getUser(cookies().toString());

  return (
    <>
      <Header user={user} />
      <SettingsPage user={user} />
    </>
  );
};

export default Settings;
import UserMetaCard from "../../components/UserMetaCard";
import UserInfoCard from "../../components/UserInfoCard";
import UserAddressCard from "../../components/UserAddressCard";
import { useUser } from "../../context/UserContext";
import { dotPulse } from "ldrs";
dotPulse.register();

export default function UserProfiles() {
  const { user, loading } = useUser();
  if (loading)
    return (
      <div className="h-[80vh] w-full flex items-center justify-center">
        <l-dot-pulse size="43" speed="1.3" color="black"></l-dot-pulse>
      </div>
    );
  if (!user) return <p>Utente non trovato o non loggato.</p>;
  return (
    <>
      <div className=" bg-white p-5 lg:p-6">
        <h3 className="mb-5 text-3xl font-marcellus font-semibold text-gray-800 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard />
          <UserInfoCard />
        </div>
      </div>
    </>
  );
}

import { getProfileById } from "@/app/apiCalls";
import ChatHeader from "@/components/chat/ChatHeader";
import { Member, selectMembers } from "@/features/member/MembersSlice";
import { Profile, selectUserProfile } from "@/features/profile/ProfileSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const MemberIdPage = () => {
  const params = useParams();
  const [targetUserProfile, setTargetUserProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const currentUserProfile: Profile = useSelector(selectUserProfile);
  const members: Member[] = useSelector(selectMembers);
  const currentMember = members.find((member) => member.profileId === currentUserProfile?._id);
  const targetMember = members.find((member) => member._id === params?.memberId);

  useEffect(() => {
    const fetchData = async () => {
      if (!targetMember) return;
      setLoading(true);
      setError(null);
      try {
        const profile = await getProfileById(targetMember.profileId);
        setTargetUserProfile(profile);
      } catch (err) {
        setError("Failed to load user profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [targetMember]);

  if (loading) {
    return <div className="text-center text-gray-500 mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-5">{error}</div>;
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-screen">
      {targetUserProfile && (
        <ChatHeader 
          serverId={params?.id} 
          name={targetUserProfile?.username} 
          imageUrl={targetUserProfile?.imageUrl} 
          type="conversation" 
        />
      )}
    </div>
  );
};

export default MemberIdPage;

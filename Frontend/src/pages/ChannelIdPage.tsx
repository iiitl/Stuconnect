import ChatHeader from "@/components/chat/ChatHeader";
import ChatSection from "@/components/chat/ChatSection";
import { Channel, selectChannels } from "@/features/channel/ChannelsSlice";
import { selectServers, Server } from "@/features/server/ServerSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ChannelIdPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);

  const servers: Server[] = useSelector(selectServers);
  const channels: Channel[] = useSelector(selectChannels);
  const channel: Channel | undefined = channels.find((channel) => channel._id === params.channelId);
  const server: Server | undefined = servers.find((server) => server._id === params.id);

  useEffect(() => {
    if (server && channel) {
      setLoading(false);
    }
  }, [server, channel]);

  if (loading) {
    return <div className="text-center text-gray-500 mt-5">Loading...</div>;
  }

  if (!server || !channel) {
    return <div className="text-center text-red-500 mt-5">Channel or Server not found.</div>;
  }

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-screen w-full">
      <ChatHeader 
        serverId={server._id} 
        name={channel.name} 
        type="channel" 
        imageUrl={server?.serverImage?.url} 
        channelType={channel.type} 
      />
      <ChatSection />
    </div>
  );
};

export default ChannelIdPage;

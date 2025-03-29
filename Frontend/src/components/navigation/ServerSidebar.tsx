import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { selectServers, Server } from "@/features/server/ServerSlice";
import { Button } from "@/components/ui/button";
import ServerChannels from "@/components/navigation/ServerChannels";

const ServerHeader = ({ server }: { server: Server }) => {
    return (
        <div className="flex flex-col w-full bg-white dark:bg-[#2B2D31] shadow-md border-b border-gray-300 dark:border-gray-700 p-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{server.name}</h2>
            <div className="flex gap-2 mt-2">
                <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                    Members
                </Button>
                <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
                    Invite People
                </Button>
                <Button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
                    Leave Server
                </Button>
            </div>
        </div>
    );
};

const ServerSidebar = () => {
    const { id } = useParams<{ id: string }>();
    const servers = useSelector(selectServers);

    const [server, setServer] = useState<Server | undefined>();
    useEffect(() => {
        const selectedServer = servers.find((server: Server) => server._id === id);
        setServer(selectedServer);
    }, [id, servers]);

    if (!server) {
        return null;
    }

    return (
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
            {/* Server Header with Buttons */}
            <ServerHeader server={server} />

            {/* Server Channels */}
            <div className="m-2">
                <ServerChannels />
            </div>
        </div>
    );
};

export default ServerSidebar;

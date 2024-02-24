"use client";

import RulesCards from "./RulesCards";
import MemberCard from "./MemberCard";
import MessageCard from "./MessageCard";
import RuleForm from "./RuleForm";
import MessageForm from "./MessageForm";
import PendingRequestsCard from "./PendingRequestsCard";
import CommunityHelpRequestForm from "./CommunityHelpRequestForm";
import HelpWantedCard from "./HelpWantedCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Loading } from "../ComponentExporter";
import BecomeMember from "./BecomeMember";
import MakeAdmin from "./MakeAdmin";
import { IoReloadCircle } from "react-icons/io5";

const CommunityOne = ({ name }) => {
  const [checksData, setChecksData] = useState({});
  const [loading, setLoading] = useState(false);
  const [reloadAll, setReloadAll] = useState(false);

  const [toggleChecksState, setToggleChecksState] = useState(false);
  const [toggleRulesState, setToggleRulesState] = useState(false);
  const [toggleMessageState, setToggleMessageState] = useState(false);
  const [toggleHelpState, setToggleHelpState] = useState(false);
  const [addedNewMember, setAddedNewMember] = useState(false);

  const handleReload = () => {
    setReloadAll((prev) => !prev);
    setToggleChecksState((prev) => !prev);
  };

  const handleChecks = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/user/request/community/check-user-status`,
        { communityName: name }
      );
      if (res.data.success) {
        setChecksData((prev) => res.data.user_checks);
      } else {
        alert("Error while checking your member status");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleChecks();
  }, [toggleChecksState]);

  return (
    <>
      {loading ? (
        <Loading msg={"Wait Checking your membership"} />
      ) : (
        checksData && (
          <>
            <div className="w-full flex flex-col items-start">
              <h2 className="font-black text-black text-3xl md:text-4xl lg:text-5xl p-3 m-2 flex flex-col items-start w-full uppercase">
                {checksData?.name}
                <span className="text-xs md:text-sm font-thin text-gray-700 mx-1 my-2 lowercase">
                  {checksData?.desc}
                </span>
              </h2>
            </div>
            <div className="w-full">
              <div className="my-1 p-1">
                <div className="flex flex-row items-center justify-end my-2 px-1">
                  <IoReloadCircle
                    onClick={handleReload}
                    className="text-black font-black cursor-pointer hover:animate-spin my-2 ml-2 text-3xl"
                  />
                  <span className="text-black font-semibold">Reload</span>
                </div>
                {!checksData?.joined ? (
                  <>
                    <BecomeMember
                      comName={name}
                      reload={reloadAll}
                      updateState={setToggleChecksState}
                    />
                  </>
                ) : (
                  <>
                    <h4 className="p-2 rounded-full text-white bg-green-700 font-black text-lg w-fit">
                      🦄 You are{" "}
                      {!checksData?.isAdmin ? <>member</> : <>Admin</>}
                    </h4>
                    <MakeAdmin
                      communityName={name}
                      toggleCurrentMembers={setAddedNewMember}
                    />
                  </>
                )}
              </div>
              <div className="my-2 p-2 flex flex-col items-start w-full">
                <div className="flex flex-col items-start w-full p-2">
                  <h3 className="font-semibold text-xl capitalize">Rules</h3>
                  <hr className="bg-black h-[3px] my-1 w-full" />
                  {checksData?.isAdmin && (
                    <RuleForm
                      comName={name}
                      updateState={setToggleRulesState}
                    />
                  )}
                  <div className="flex flex-col w-full max-h-[100vh] overflow-auto">
                    <RulesCards
                      comName={name}
                      states={[toggleRulesState, reloadAll]}
                    />
                  </div>
                </div>
                {checksData?.joined && (
                  <>
                    <div className="flex flex-col items-start w-full p-2">
                      <h3 className="font-semibold text-xl capitalize">
                        Current Members
                      </h3>
                      <hr className="bg-black h-[3px] my-1 w-full" />
                      <div className="flex flex-row w-full flex-wrap max-h-[100vh] overflow-auto">
                        <MemberCard
                          comName={name}
                          states={[addedNewMember, reloadAll]}
                        />
                      </div>
                    </div>
                    {checksData?.isAdmin && (
                      <div className="flex flex-col items-start w-full p-2">
                        <h3 className="font-semibold text-xl capitalize">
                          Pending Requests
                        </h3>
                        <hr className="bg-black h-[3px] my-1 w-full" />
                        <div className="flex flex-row w-full flex-wrap max-h-[100vh] overflow-auto">
                          <PendingRequestsCard
                            comName={name}
                            reload={reloadAll}
                            updateState={setAddedNewMember}
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}
                {checksData?.joined && (
                  <div className="flex flex-col items-start w-full p-2">
                    <h3 className="font-semibold text-xl capitalize">
                      Messages
                    </h3>
                    <hr className="bg-black h-[3px] my-1 w-full" />
                    {checksData?.isAdmin && (
                      <MessageForm
                        comName={name}
                        updateState={setToggleMessageState}
                      />
                    )}
                    <div className="flex flex-col w-full max-h-[100vh] overflow-auto">
                      <MessageCard
                        comName={name}
                        states={[toggleMessageState, reloadAll]}
                      />
                    </div>
                  </div>
                )}
                {checksData?.joined && (
                  <div className="flex flex-col items-start w-full p-2">
                    <h3 className="font-semibold text-xl capitalize">
                      Help Wanted
                    </h3>
                    <hr className="bg-black h-[3px] my-1 w-full" />
                    <CommunityHelpRequestForm
                      comName={name}
                      updateState={setToggleHelpState}
                    />
                    <div className="flex flex-col w-full max-h-[100vh] overflow-auto">
                      <HelpWantedCard
                        comName={name}
                        states={[toggleHelpState, reloadAll]}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )
      )}
    </>
  );
};

export default CommunityOne;

import RulesCard from "./RulesCard";
import MemberCard from "./MemberCard";
import MessageCard from "./MessageCard";
import RuleForm from "./RuleForm";
import MessageForm from "./MessageForm";
import PendingRequestsCard from "./PendingRequestsCard";
import CommunityHelpRequestForm from "./CommunityHelpRequestForm";
import HelpWantedCard from "./HelpWantedCard";

const CommunityOne = () => {
  const isAdmin = true;
  const joined = true;
  const requests = [1, 2, 3];
  const members = [1, 2, 3, 4, 5];
  const helpwanted = [1, 2, 3, 4];
  const rules = ["Rule 1", "Rule 2", "Rule 3", "Rule 4", "Rule 5"];
  const messages = [
    { time: "01-01-2024 1:00 P.M", msg: "message 1" },
    { time: "02-01-2024 1:30 P.M", msg: "message 2" },
    { time: "03-01-2024 4:50 P.M", msg: "message 3" },
    { time: "05-01-2024 5:00 P.M", msg: "message 4" },
  ];

  return (
    <>
      <div className="w-full">
        <div className="my-1 p-1">
          {!joined ? (
            <>
              <button
                type="button"
                className="text-blue-700 text-lg font-black bg-white border-2 border-solid border-blue-600 px-1 py-2"
              >
                Become a member
              </button>
            </>
          ) : (
            <>
              <h4 className="p-2 rounded-full text-white bg-green-700 font-black text-lg w-fit">
                🦄 You are {!isAdmin ? <>member</> : <>Admin</>}
              </h4>
            </>
          )}
        </div>
        <div className="my-2 p-2 flex flex-col items-start w-full">
          {isAdmin && (
            <div className="flex flex-col items-start w-full p-2">
              <h3 className="font-semibold text-xl capitalize">
                Pending Requests
              </h3>
              <hr className="bg-black h-[3px] my-1 w-full" />
              <div className="flex flex-row w-full flex-wrap max-h-[100vh] overflow-auto">
                {requests.map((request, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <PendingRequestsCard />
                  </div>
                ))}
              </div>
            </div>
          )}
          {joined && (
            <div className="flex flex-col items-start w-full p-2">
              <h3 className="font-semibold text-xl capitalize">
                Current Members
              </h3>
              <hr className="bg-black h-[3px] my-1 w-full" />
              <div className="flex flex-row w-full flex-wrap max-h-[100vh] overflow-auto">
                {members.map((member, i) => (
                  <MemberCard key={i} />
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-col items-start w-full p-2">
            <h3 className="font-semibold text-xl capitalize">Rules</h3>
            <hr className="bg-black h-[3px] my-1 w-full" />
            {isAdmin && <RuleForm />}
            <div className="flex flex-col w-full max-h-[100vh] overflow-auto">
              {rules.map((rule, i) => (
                <div key={i} className="flex flex-col items-start">
                  <RulesCard n={i + 1} desc={rule} />
                </div>
              ))}
            </div>
          </div>
          {joined && (
            <div className="flex flex-col items-start w-full p-2">
              <h3 className="font-semibold text-xl capitalize">Messages</h3>
              <hr className="bg-black h-[3px] my-1 w-full" />
              {isAdmin && <MessageForm />}
              <div className="flex flex-col w-full max-h-[100vh] overflow-auto">
                {messages.map((message, i) => (
                  <MessageCard key={i} time={message.time} desc={message.msg} />
                ))}
              </div>
            </div>
          )}
          {joined && (
            <div className="flex flex-col items-start w-full p-2">
              <h3 className="font-semibold text-xl capitalize">Help Wanted</h3>
              <hr className="bg-black h-[3px] my-1 w-full" />
              <CommunityHelpRequestForm />
              <div className="flex flex-col w-full max-h-[100vh] overflow-auto">
                {helpwanted.map((help, i) => (
                  <HelpWantedCard key={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CommunityOne;

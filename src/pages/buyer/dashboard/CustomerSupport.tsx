import ChatBubble from "../../../components/reuseable/ChatBubble";

const CustomerSupport = () => {
  return (
    <div>
      <header className="mb-16">
        <h1 className="text-[23px] capitalize font-medium ">
          Customer Support
        </h1>
        <p className="text-[#303030] text-sm mt-4">
          Do you have any issues concerning my balance? Feel free to drop a
          message here and we will reply you instantly.
        </p>
      </header>
      <div>
        <h1 className="text-lg font-bold capitalize ">
          This is a chat between you and MyBalance
        </h1>
        <div>
          <ChatBubble user={true} />
          <ChatBubble user={false} />
        </div>
      </div>
    </div>
  );
}

export default CustomerSupport
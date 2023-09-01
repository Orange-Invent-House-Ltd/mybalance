import { useForm } from "react-hook-form";
import { Button } from "../../../components/reuseable/Button";
import ChatBubble from "../../../components/reuseable/ChatBubble";
import MultilineTextField from "../../../components/reuseable/MultilineTextField";

const CustomerSupport = () => {
  const { handleSubmit, control } = useForm();

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
        <h1 className="text-lg font-bold capitalize mb-10 ">
          This is a chat between you and MyBalance
        </h1>
        <div className="space-y-10 ">
          <ChatBubble user={true} />
          <ChatBubble user={false} />
          <ChatBubble user={true} />
          <ChatBubble user={false} />
          <ChatBubble user={true} />
          <ChatBubble user={false} />
          <ChatBubble user={true} />
          <ChatBubble user={false} />
          <ChatBubble user={true} />
          <ChatBubble user={false} />
          <ChatBubble user={true} />
          <ChatBubble user={false} />
        </div>
        <div>
          <MultilineTextField
            control={control}
            name="description"
            rules={{ required: "this field is required" }}
            label="Type in the box below"
          />
          <div className="w-[343px] ml-auto">
            <Button fullWidth>send chat</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;

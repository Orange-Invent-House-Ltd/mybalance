import { useState } from "react";
import TextField from "../../../components/reuseable/TextField";
import { Button } from "../../../components/reuseable/Button";
import back from "../../../assets/Icons/back.svg";
import { Link } from "react-router-dom";

const CreateEscrowLink = () => {
  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <div className="flex gap-4 items-center mb-4">
        <Link to="/seller/dashboard">
          <img src={back} alt="back"/>
        </Link>
        <h6 className="h6">Create an Escrow Link</h6>
      </div>
      <p className="text-[16px] text-[#303030] font-normal mb-8">Create your one-time escrow link and share with your prospective customers.</p>
      <h1 className="text-[#EDEDED] text-lg font-medium">
        ITEM(S) INFORMATION
      </h1>
      <div className="mt-6 flex flex-col gap-4">
        <TextField label="Purpose of escrow" placeholder="e.g 20,000" />
        <TextField
          label="Type of item(s)"
          placeholder="****"
        />
        <TextField
          label="Number of item(s)"
          placeholder="give a description"
        />
        <TextField
          label="Amount"
          placeholder="give a description"
        />
        <TextField
          label="Delivery timeline"
          placeholder="Select number of days"
        />
      </div>
      <h1 className="mt-6 text-[#EDEDED] text-lg font-medium">
        VENDOR ACCOUNT INFORMATION
      </h1>
      <div className="mt-6 flex flex-col gap-4">
        <TextField label="Select bank" placeholder="Access Bank" />
        <TextField label="Select account name" placeholder="e.g JMusty Feet"/>
        <TextField label="Enter account number" placeholder="1234567890"/>
        <TextField
          label="Phone number"
          placeholder="090123456789"
          value={value}
          onChange={handleChange}
        />
      </div>
      <div className="mt-6 mb-16">
        <Button
          disabled={value ? false : true}
          fullWidth
        >
          Share escrow link
        </Button>
      </div>
    </div>
  );
};

export default CreateEscrowLink;

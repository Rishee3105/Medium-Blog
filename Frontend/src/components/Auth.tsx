import { SignupInput } from "@rishee_30/common-app";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate=useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    email: "",
    password: "",
    name: "",
  });

  async function sendRequest(){
    try {
      const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs); 
      const token=response.data.token;
      localStorage.setItem("token",token);
      navigate("/blogs");

    } catch (e) {
      alert("Error while signing up")
    }
  }

  return (
    <div className=" h-screen flex flex-col justify-center">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">Create an account</div>
            <div className="text-slate-400 px-5 pt-2">
              {type==="signup"?"Already have an account?": "Don't have an account?"}
              <Link className="pl-2 underline" to={type==="signin"?"/signup":"/signin"}>
                {type==="signin"?"Sign up": "Sign in"}
              </Link>
            </div>
          </div>
          <div className="pt-4">
            {type==="signup"?<LabelledInput
              label="Name"
              placeholder="Enter your name"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                });
              }}
            />:null}
            <LabelledInput
              label="Email"
              placeholder="abc@gmail.com"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              type={"password"}
              placeholder="Enter your password"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            <button onClick={sendRequest} type="button" className="mt-5 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup"?"Sign up": "Sign in"}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputProps {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputProps) {
  return (
    <div>
      <div>
        <label className="block mb-2 text-sm font-semibold text-black pt-4">
          {label}
        </label>
        <input
          onChange={onChange}
          type={type || "text"}
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}

export default Auth;

"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../Context/user.context";
import FXForm from "../Components/Form/FXForm";
import { authSchemas } from "../Schemas/auth.schema";
import CustomInput from "../Components/Form/CustomInput";
import CustomButton from "../Components/ui/Button/CustomButton";
import { useUserRegister } from "../hooks/auth.hook";
import Loading from "../Components/ui/Loading/Loading";
import { LuArrowLeft } from "react-icons/lu";
import Lottie from "lottie-react";
import regAnimation from "../assets/Animation/register (1).json";

const CRegisterPage = () => {
  const navigate = useRouter();
  const { setIsLoading: userSetLoading } = useUser();
  const { mutate: handleRegister, isPending, isSuccess } = useUserRegister();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    if (data?.password !== data?.confirmPassword) {
      return toast.error("Password are not same");
    }
    const { confirmPassword, ...payload } = data;
    handleRegister(payload as any);
    userSetLoading(true);
  };
  useEffect(() => {
    if (!isPending && isSuccess) {
      navigate.push("/");
    }
  }, [isPending, isSuccess]);
  return (
    <>
      {isPending && <Loading />}
      <div className="flex  flex-col-reverse md:flex-row md:flex md:justify-center gap-4 items-center min-h-screen light:text-lightText">
        <div>
          <Lottie
            animationData={regAnimation}
            loop={true}
            autoplay={true}
          ></Lottie>
        </div>

        <div className=" space-y-6 rounded-lg  p-10 shadow-lg mt-5 w-screen sm:max-w-lg">
          <div className="flex flex-col space-y-1">
            <h3 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <LuArrowLeft
                onClick={() => navigate.push("/login")}
                className="cursor-pointer"
              />{" "}
              Register
            </h3>
            <p className="text-sm light:text-lightText">
              Please fill in the form to create an account.
            </p>
          </div>
          <div>
            <FXForm
              onSubmit={onSubmit}
              resolver={zodResolver(authSchemas.signupSchema)}
            >
              <div>
                <CustomInput
                  name="name"
                  label="Name"
                  type="text"
                  isLabelColor={true}
                />
              </div>
              <div>
                <CustomInput
                  name="email"
                  label="Email"
                  type="email"
                  isLabelColor={true}
                  placeholder={"abc@gmail.com"}
                />
              </div>

              {/* password  */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <CustomInput
                    name="password"
                    label="password"
                    type="password"
                    isLabelColor={true}
                    placeholder={"password"}
                  />
                </div>
                <div>
                  <CustomInput
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    isLabelColor={true}
                    placeholder={"password"}
                  />
                </div>
              </div>
              <CustomButton name="Register" customCss="w-full" />
            </FXForm>
            <div className="text-center mt-4 ">
              <span>
                <span className="light:text-lightText">
                  Already have an account
                </span>{" "}
                <span
                  onClick={() => {
                    navigate.push("/login");
                  }}
                  className="text-sky-500 underline hover:cursor-pointer"
                >
                  ?Signin
                </span>{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CRegisterPage;

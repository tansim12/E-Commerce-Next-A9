"use client";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUser } from "../Context/user.context";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FXForm from "../Components/Form/FXForm";
import { authSchemas } from "../Schemas/auth.schema";
import CustomInput from "../Components/Form/CustomInput";
import CustomButton from "../Components/ui/Button/CustomButton";
import { useUserLogin } from "../hooks/auth.hook";
import Loading from "../Components/ui/Loading/Loading";
import { Button } from "@nextui-org/button";
import { LuArrowLeft } from "react-icons/lu";
import Lottie from "lottie-react";
import regAnimation from "../assets/Animation/register (1).json";

const CLoginPage = () => {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect");
  const { setIsLoading: userSetLoading } = useUser();

  const { mutate: handleLogin, isPending, isSuccess } = useUserLogin();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleLogin(data as any);
    userSetLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        navigate.push(redirect);
      } else {
        navigate.push("/");
      }
    }
  }, [isPending, isSuccess]);

  const loginDemo = (data: any) => {
    handleLogin(data as any);
    userSetLoading(true);
  };

  return (
    <>
      {isPending && <Loading />}

      <div className="flex  flex-col md:flex-row md:flex md:justify-center gap-10 items-center min-h-screen  ">
        <div className="space-y-6 rounded-lg  p-10 shadow-lg mt-5 w-screen sm:max-w-lg">
          {/* Left side form */}
          <h2 className="mb-6 text-3xl font-bold tracking-tight light:text-lightText flex items-center gap-3">
            <LuArrowLeft
              onClick={() => navigate.push("/")}
              className="cursor-pointer"
            />{" "}
            Sign In
          </h2>

          <div>
            <div className="mb-6">
              <h2 className="mb-3 text-blue-500">Login Demo Credential:</h2>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() =>
                    loginDemo({
                      email: "u1@gmail.com",
                      password: "password123",
                    })
                  }
                >
                  User Credentials
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() =>
                    loginDemo({
                      email: "v1@gmail.com",
                      password: "password123",
                    })
                  }
                >
                  Vendor Credentials
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() =>
                    loginDemo({
                      email: "a1@gmail.com",
                      password: "password123",
                    })
                  }
                >
                  Admin Credentials
                </Button>
              </div>
            </div>
          </div>

          <FXForm
            onSubmit={onSubmit}
            resolver={zodResolver(authSchemas.loginSchema)}
          >
            <div className="  ">
              <CustomInput
                name="email"
                label="Email"
                type="email"
                //   isLabelColor={true}
                placeholder={"abc@gmail.com"}
              />
              <CustomInput
                name="password"
                label="password"
                type="password"
                isLabelColor={true}
                placeholder={"password"}
              />
            </div>
            <div className="mb-6 flex items-center space-x-2 accent-sky-600">
              <input type="checkbox" id="keep_signed_in" />
              <label
                className="select-none text-sm font-medium light:text-lightText"
                htmlFor="keep_signed_in"
              >
                Keep me signed in
              </label>
            </div>

            <CustomButton name="Login" customCss="w-full" />
          </FXForm>

          <div className="text-center mt-4 ">
            <span>
              <span className="light:text-lightText">
                If you don&apos;t already have an account click the button below
                to create your account.
              </span>{" "}
              <span
                onClick={() => {
                  navigate.push("/register");
                }}
                className="text-sky-500 underline hover:cursor-pointer"
              >
                ?Register
              </span>{" "}
            </span>
          </div>
        </div>

        {/* Right side content */}
        <div>
          <div>
            <Lottie
              animationData={regAnimation}
              loop={true}
              autoplay={true}
            ></Lottie>
          </div>
        </div>
      </div>
    </>
  );
};

export default CLoginPage;

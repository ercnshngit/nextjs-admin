"use client";
import { Input } from "@/components/ui/input";
import { login } from "@/services/auth";
import { Login } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

export default function Home() {
  const cookies = new Cookies();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const mutation = useMutation({
    mutationFn: (data: Login) => login(data),
    onSuccess: (response) => {
      cookies.set("token", response.data.token, { path: "/" });
      cookies.set("user", JSON.stringify(response.data.user), { path: "/" });
      try {
        router.push("/dashboard");
      } catch (error) {
        console.log("Navigation error:", error);
      }

      toast.success("Giriş başarılı");
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onError: (error) => {
      toast.error(
        JSON.stringify((error as unknown as any).response.data.message.TR)
      );
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Login> = (data) => {
    setIsLoading(true);
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="md:w-[860px] w-[480px] h-[520px] border-2 flex flex-row items-center rounded-lg shadow-lg">
        <div
          className="md:flex  flex-col md:w-[380px] hidden  h-[520px] md:p-12 rounded-md"
          style={{ backgroundColor: "#3040D6" }}
        >
          <div className="mt-1 mb-8 font-sans text-3xl text-white">
            Hoş Geldiniz
          </div>
          <p className="mt-8 mb-8 font-sans text-sm text-white">
            Uygulamanız için tüm verilerinizi tek bir yerden yönetmenizi
            sağlayan yönetici paneli.
          </p>
        </div>
        <div className="flex flex-col justify-start items-start w-[480px] h-[520px] p-12 rounded-md text-black">
          <div className="flex flex-row w-[200px] justify-between items-center mb-14">
            <div className="items-center text-2xl">AdminPaneli</div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input placeholder="Username" {...field} />
              )}
            />

            <Controller
              name="password"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Password" type="password" />
              )}
            />

            <button
              type="submit"
              className="m-28 mt-5 w-[125px] h-[34px] text-white rounded-sm py-1"
              style={{ backgroundColor: "#3040D6" }}
            >
              Giriş
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

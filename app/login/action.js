"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(prevState, formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const res = await axios.post(
      `${process.env.STRAPI_BASE_URL}/api/auth/local`,
      {
        identifier: email,
        password,
      }
    );

    cookies().set("token", res.data.jwt);
    
  } catch (error) {
    console.log("error", error.response);
    let errorMessage = "";
    if (error.response && error.response.data.error.message) {
      errorMessage = error.response.data.error.message;
    }
    return { message: errorMessage || "Login fail" };
  }

  redirect('/special-blog');
}

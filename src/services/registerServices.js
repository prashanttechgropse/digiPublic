import httpService from "./httpService";
import { toast } from "react-toastify";

export async function createAccount(formData) {
  try {
    await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/register`,
      formData
    );
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/otpGeneration`,
      {
        email: formData.email,
      }
    );
    toast.success(data.message);
    if (!data.message) toast.success(data);
    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data);
    return { error };
  }
}

export async function createAccountSecondaryUser(formData) {
  try {
    await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/registerSecondaryUser`,
      formData
    );
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/otpGeneration`,
      {
        email: formData.email,
      }
    );
    toast.success(data.message);
    if (!data.message) toast.success(data);
    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data);
    return { error };
  }
}

export async function setUpProfileService(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/setUpProfile`,
      formData
    );
    toast.success(data.message);
    if (!data.message) toast.success(data);
    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data);
    return { error };
  }
}

export async function editProfileService(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/editProfile`,
      formData
    );
    toast.success(data.message);
    if (!data.message) toast.success(data);
    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data);
    return { error };
  }
}

export async function setUpSecondarUserProfileService(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/setUpSecondaryUserProfile`,
      formData
    );
    toast.success(data.message);
    if (!data.message) toast.success(data);
    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data);
    return { error };
  }
}

export async function uploadBankDetails(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/addBankDetails`,
      formData
    );
    toast.success(data.message);
    if (!data.message) toast.success(data);
    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data);
    return { error };
  }
}

export async function authentication(formData) {
  try {
    const { data, headers } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/login`,
      {
        email: formData.email,
        password: formData.password,
      }
    );
    await localStorage.removeItem("token");
    await localStorage.setItem("token", headers["x-auth-token"]);

    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data);
    return { error };
  }
}

export async function otpVerification(formData, email) {
  try {
    const { data, headers } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/otpVerification`,
      {
        email: email,
        otp: formData.otp,
      }
    );
    if (data) {
      await window.localStorage.removeItem("token");
      await window.localStorage.setItem("token", headers["x-auth-token"]);
      toast.success(data.message);
      if (!data.message) toast.success(data);
      return { data };
    }
  } catch (error) {
    if (error.response) toast.error(error.response.data);
    return { error };
  }
}

export async function otpGeneration(email) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/otpGeneration`,
      {
        email: email,
      }
    );
    toast.success(data.message);
    if (!data.message) toast.success(data);
    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data);
    return { error };
  }
}

export async function resetPassword(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/resetPassword`,
      formData
    );
    toast.success(data.message);
    if (!data.message) toast.success(data);
    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data);
    return { error };
  }
}

export async function changePassword(formData) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/changePassword`,
      formData
    );
    toast.success(data.message);
    if (!data.message) toast.success(data);
    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data);
    return { error };
  }
}

export async function adminAuthentication(formData) {
  try {
    console.log(process.env);
    const { data, headers } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/admin/login`,
      {
        email: formData.email,
        password: formData.password,
      }
    );
    await localStorage.removeItem("token");
    await localStorage.setItem("token", headers["x-auth-token"]);
    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data);
    return { error };
  }
}

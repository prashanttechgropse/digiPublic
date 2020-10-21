import httpService from "./httpService";
import { toast } from "react-toastify";

export async function createTender(formData) {
  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/customer/createTender`,
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

export async function editSavedTender(formData) {
  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/customer/editSavedTender`,
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

export async function acceptTender(reqDetails) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/customer/acceptTender`,
      reqDetails
    );
    toast.success(data.message);
    if (!data.message) toast.success(data);
    return { data };
  } catch (error) {
    if (error.response) toast.error(error.response.data);
    return { error };
  }
}

export async function cancelTender(id) {
  try {
    const { data, error } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/customer/cancelTender`,
      {
        tenderId: id,
      }
    );
    if (data) {
      toast.success(data.message);
      if (!data.message) toast.success(data);
      return { data: data };
    } else return { error: error };
  } catch (error) {
    if (error.response) toast.error(error.response.data);
    return;
  }
}

export async function publishSavedTender(id) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/customer/publishSavedTender`,
      {
        tenderId: id,
      }
    );
    toast.success(data.message);
    if (!data.message) toast.success(data);
    return;
  } catch (error) {
    if (error.response) toast.error(error.response.data);
    return;
  }
}

export async function ignoreSavedTender(id) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/customer/ignoreSavedTender`,
      {
        tenderId: id,
      }
    );
    toast.success(data.message);
    if (!data.message) toast.success(data);
    return;
  } catch (error) {
    if (error.response) toast.error(error.response.data);
    return;
  }
}

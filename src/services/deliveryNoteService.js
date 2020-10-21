import httpService from "./httpService";
import { toast } from "react-toastify";

export async function createDeliveryNote(
  profileType,
  formData,
  tenderId,
  status
) {
  try {
    const { data } = await httpService.post(
      `${process.env.REACT_APP_APIENDPOINT}/${profileType}/createDeliveryNote/${tenderId}/${status}`,
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

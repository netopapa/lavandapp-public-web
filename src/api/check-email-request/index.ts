import axios, { AxiosError } from "axios";
import { CONSTANTS } from "../../constants";
import { CheckEmailResponseDTO } from "../dto/check-email-response.dto";
import { CustomError } from "../dto/custom-error";

const checkEmailRequest = async (
  code: string,
  type: "laundry" | "customer"
): Promise<CheckEmailResponseDTO> => {
  try {
    return (
      await axios.get<CheckEmailResponseDTO>(
        CONSTANTS.CORE_BASE_URL +
          `pre-registration-${type}/check-email/${code}`
      )
    ).data;
  } catch (e) {
    const error = e as AxiosError;

    let customError: CustomError = {
      msg: "Erro ao validar email",
      httpStatus: error.status,
      apiMessage: error.message,
    };
    
    throw customError;
  }
};

export default checkEmailRequest;

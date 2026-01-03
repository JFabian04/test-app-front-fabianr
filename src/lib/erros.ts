export type ErrorCode = 
  | "USER_ALREADY_EXISTS"
  | "INVALID_EMAIL"
  | "UNKNOWN_ERROR";

export const errorMessages: Record<ErrorCode, Record<"en" | "es", string>> = {
  USER_ALREADY_EXISTS: {
    en: "User already exists",
    es: "El usuario ya existe",
  },
  INVALID_EMAIL: {
    en: "Invalid email address",
    es: "Correo electrónico no válido",
  },
  UNKNOWN_ERROR: {
    en: "Something went wrong",
    es: "Algo salió mal",
  },
};

export function getErrorMessage(code: string, lang: "en" | "es" = "es") {
  return (errorMessages[code as ErrorCode]?.[lang]) || errorMessages["UNKNOWN_ERROR"][lang];
}

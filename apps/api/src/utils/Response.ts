export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string | any;
}

export const successResponse = <T>(
  data: T,
  message = "Success"
): ApiResponse<T> => ({
  success: true,
  data,
  message,
});

export const errorResponse = (
  error: any,
  message = "Error"
): ApiResponse<null> => ({
  success: false,
  error,
  message,
});

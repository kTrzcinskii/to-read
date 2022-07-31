import { createProtectedRouter } from "./context";
import { IReturnManyBooks, SearchTermInput } from "../schema/book.schema";
import { API_BASE_LINK } from "../../utils/constants";
import mapQueryKeys from "../../utils/helpers/mapQueryKeys";
import axios from "axios";
import { TRPCError } from "@trpc/server";

export const bookRouter = createProtectedRouter().query("get-books", {
  input: SearchTermInput,
  async resolve({ input }) {
    const { mainQuery, ...rest } = input;
    const API_KEY = process.env.GOOGLE_API_KEY;

    let queryLink = `${API_BASE_LINK}key=${API_KEY}&q=${mainQuery}`;
    for (const [key, value] of Object.entries(rest)) {
      if (value) {
        const newKeyName = mapQueryKeys(key);
        queryLink += `+${newKeyName}:${value}`;
      }
    }

    try {
      const response = await axios.get<IReturnManyBooks>(queryLink);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      } else {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }
  },
});

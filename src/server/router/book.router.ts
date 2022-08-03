import { createProtectedRouter } from "./context";
import { IReturnManyBooks, SearchTermInput } from "../schema/book.schema";
import { API_BASE_LINK, MAX_RESULTS } from "../../utils/constants";
import mapQueryKeys from "../../utils/helpers/mapQueryKeys";
import axios from "axios";
import { TRPCError } from "@trpc/server";

export const bookRouter = createProtectedRouter().query("get-books", {
  input: SearchTermInput,
  async resolve({ input }) {
    const { mainQuery, startIndex, langCode, ...rest } = input;
    const API_KEY = process.env.GOOGLE_API_KEY;

    let queryLink = `${API_BASE_LINK}?key=${API_KEY}&maxResults=${MAX_RESULTS}&startIndex=${startIndex}&q=${mainQuery}`;
    for (const [key, value] of Object.entries(rest)) {
      if (value) {
        const newKeyName = mapQueryKeys(key);
        queryLink += `+${newKeyName}:${value}`;
      }
    }

    if (langCode !== "") {
      queryLink += `&langRestrict=${langCode}`;
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

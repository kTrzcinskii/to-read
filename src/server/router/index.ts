// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { bookRouter } from "./book.router";
import { userRouter } from "./user.router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("books.", bookRouter)
  .merge("users.", userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;

import { AddBookToAccountInput } from "../schema/user.schema";
import { createProtectedRouter } from "./context";

export const userRouter = createProtectedRouter()
  .mutation("add-book-to-account", {
    input: AddBookToAccountInput,
    async resolve({ ctx, input }) {
      const userId = ctx.session.user.id!;
      await ctx.prisma.simpleBook.create({
        data: { ...input, User: { connect: { id: userId } } },
      });

      return { successful: true };
    },
  })
  .query("get-my-books", {
    async resolve({ ctx }) {
      const userId = ctx.session.user.id!;

      const books = await ctx.prisma.simpleBook.findMany({
        where: {
          userId,
        },
      });

      const toRead = books.filter((book) => book.status === "WANT_TO_READ");
      const inProgress = books.filter((book) => book.status === "IN_PROGRESS");
      const completed = books.filter((book) => book.status === "COMPLETED");

      return { toRead, inProgress, completed };
    },
  });

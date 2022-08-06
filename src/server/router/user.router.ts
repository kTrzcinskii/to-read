import { TRPCError } from "@trpc/server";
import {
  AddBookToAccountInput,
  DeleteBookInput,
  MoveBookInput,
} from "../schema/user.schema";
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
  })
  .mutation("delete-book", {
    input: DeleteBookInput,
    async resolve({ ctx, input }) {
      const userId = ctx.session.user.id!;

      const bookToDelete = await ctx.prisma.simpleBook.findUnique({
        where: { id: input.bookId },
        select: { userId: true },
      });

      if (!bookToDelete || bookToDelete.userId !== userId) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      await ctx.prisma.simpleBook.delete({ where: { id: input.bookId } });

      return { successful: true };
    },
  })
  .mutation("move-book", {
    input: MoveBookInput,
    async resolve({ ctx, input }) {
      const userId = ctx.session.user.id!;

      const bookToEdit = await ctx.prisma.simpleBook.findUnique({
        where: { id: input.bookId },
        select: { userId: true },
      });

      if (!bookToEdit || bookToEdit.userId !== userId) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      await ctx.prisma.simpleBook.update({
        where: { id: input.bookId },
        data: { status: input.moveTo },
      });

      return { successful: true };
    },
  });

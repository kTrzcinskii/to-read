import { z } from "zod";

export const AddBookToAccountInput = z.object({
  googleId: z.string(),
  title: z.string(),
  authors: z.array(z.string()),
  pages: z.number().optional(),
  imgLink: z.string(),
});

export const DeleteBookInput = z.object({
  bookId: z.string(),
});

export const MoveBookInput = z.object({
  bookId: z.string(),
  moveTo: z.enum(["COMPLETED", "IN_PROGRESS", "WANT_TO_READ"]),
});

export const IsBookInMyCollectionInput = z.object({
  googleId: z.string(),
});

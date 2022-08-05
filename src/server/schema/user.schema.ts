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

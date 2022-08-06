import { BookStatus } from "@prisma/client";

export default function transformFromStatusToHeading(
  s: BookStatus
): "Want To Read" | "In Progress" | "Completed" {
  switch (s) {
    case "COMPLETED":
      return "Completed";
    case "IN_PROGRESS":
      return "In Progress";
    case "WANT_TO_READ":
      return "Want To Read";
  }
}

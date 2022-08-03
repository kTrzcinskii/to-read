import { ReactNode } from "react";
import { z } from "zod";

export const SearchTerm = z.object({
  mainQuery: z.string(),
  author: z.string().optional(),
  title: z.string().optional(),
  category: z.string().optional(),
  publisher: z.string().optional(),
  langCode: z.string().optional(),
});

export type ISearchTerm = z.TypeOf<typeof SearchTerm>;

export const SearchTermInput = z.object({
  mainQuery: z.string(),
  author: z.string().optional(),
  title: z.string().optional(),
  category: z.string().optional(),
  publisher: z.string().optional(),
  langCode: z.string().optional(),
  startIndex: z.number().default(0),
});

export const GetSingleBookInput = z.object({
  bookId: z.string(),
});

interface VolumeInfo {
  title: string;
  authors: string[];
  publishedDate: number;
  industryIdentifiers: { type: string; identifier: string }[];
  readingModes: { text: boolean; image: boolean };
  printType: string;
  categories: string[];
  maturityRating: string;
  allowAnonLogging: boolean;
  contentVersion: string;
  panelizationSummary: {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
  };
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  thumbnail: string;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
}

interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
}

export interface ReturnManyBooksSingleEleemt {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: any; //dont care about it
  searchInfo: any; //dont care about it
}

export interface IReturnManyBooks {
  kind: string;
  totalItems: number;
  items: ReturnManyBooksSingleEleemt[];
}

interface SingleVolumeInfo {
  title: string;
  subtitle: string;
  authors: string[];
  publishedDate: string;
  publisher: string;
  description: string;
  industryIdentifiers: { type: string; identifier: string }[];
  readingModes: { text: boolean; image: boolean };
  pageCount: number;
  printedPageCount: number;
  printType: string;
  categories: string[];
  maturityRating: string;
  allowAnonLogging: boolean;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
  };
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
  language: string;
}

export interface IReturnSingleBook {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: SingleVolumeInfo;
  layerInfo: any;
  salesInfo: any;
  accessInfo: any;
}

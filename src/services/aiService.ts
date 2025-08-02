import axios from "axios";
import { OPENAI_GET_DATA } from "./consts";

export interface AiSearchResult {
  result: { gmail: any; google: any };
  isPagination?: boolean;
}

export async function fetchAiResult(question: string): Promise<any> {
  try {
    const response = await axios.post(
      OPENAI_GET_DATA,
      { question },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (e: any) {
    console.log(e.message);
    throw new Error("faild to fetch ai result");
  }
}

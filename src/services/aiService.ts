import axios from "axios";

export interface AiSearchResult {
  result: { gmail: any; google: any };
  isPagination?: boolean;
}

export async function fetchAiResult(question: string): Promise<any> {
  try {
    const response = await axios.post(
      "http://localhost:3000/openai/getAiFiles",
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

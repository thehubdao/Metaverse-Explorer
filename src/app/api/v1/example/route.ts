import {GetExample, PostExample} from "../../../../server/api-handler/v1/example.api-handler";

export function GET(req: Request) {
  return GetExample(req);
}

export function POST(req: Request) {
  return PostExample(req);
}
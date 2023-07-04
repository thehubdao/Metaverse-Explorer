import {JsonResponse, TryGetReqBody} from "../../utils/api-response.util";
import {DefaultApiMessage} from "../../enums/api.enum";
import {GetExampleInterface, PostExampleInterface} from "../../../interfaces/api.interface";

enum GetParams {
  Title= 'title'
}

export function GetExample(req: Request) {
  const {searchParams} = new URL(req.url);
  const title = searchParams.get(GetParams.Title);
  
  return JsonResponse<GetExampleInterface>({
    success: true,
    message: DefaultApiMessage.GetSuccess,
    data: {
      msg: "Hello from The Hub!",
      param: `Have a nice ${title == null ? 'day' : title}`,
    }
  }, "Successful");
}

interface PostBody {
  name: string | undefined;
}

export async function PostExample(req: Request) {
  const {searchParams} = new URL(req.url);
  const title = searchParams.get(GetParams.Title);
  const {name} = await TryGetReqBody<PostBody>(req);

  return JsonResponse<PostExampleInterface>({
    success: true,
    message: DefaultApiMessage.PostSuccess,
    data: {
      msg: "Hello from The Hub!",
      body: `${name != undefined ? name + ', h' : 'H'}ow are you?`,
      param: `Have a nice ${title == null ? 'day' : title}`,
    }
  }, "Successful");
}
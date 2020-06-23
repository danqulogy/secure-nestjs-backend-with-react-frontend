import { createParamDecorator } from '@nestjs/common'
import {IUser} from "../db/user.document";

export const GetAuthUser = createParamDecorator((data, req):IUser => {
  return req.user
});



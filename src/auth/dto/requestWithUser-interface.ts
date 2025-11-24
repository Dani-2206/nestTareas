export interface requestWithUser extends Request{
  user:{
    email:string,
    rol:string,
    user:string
  }
}

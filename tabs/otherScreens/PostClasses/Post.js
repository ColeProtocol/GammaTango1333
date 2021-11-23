export default class Post {
  /*
    every message will really only ever have its own content and then replies to that content
  */

  content = "";
  replies = [];
  constructor(cont, repls) {
    this.content = cont;
    this.replies = repls;
  }
  //This method is for adding a reply to a post
  addContentToReplies(reply) {
    this.replies.push(reply);
  }
}

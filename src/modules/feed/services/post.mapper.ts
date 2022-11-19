import { MessageAudioElement, MessageElement, MessageImageElement, MessageTextElement, MessageVideoElement, MessageYoutubeElement, Post, PostData, PostMessage } from '../post.model';

export class PostMapper {
  map(data: PostData): Post {
    return {
      ...data,
      message: this.parseMessage(`${data.message} ${data.attachementUrl ? data.attachementUrl : ''}`)
    }
  }

  private parseMessage(message: string): PostMessage {
    // TODO rajouter png jpg et gif
    const pictureRegex = /http[s]?:\/\/.+\.(jpeg|jpg|gif|png)/gmi;
    // const pictureRegex = /(http(s?):)([\/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/g

     // TODO mp4,wmv,flv,avi,wav
    const videoRegex = /http[s]?:\/\/.+\.(mp4|ogg|3gp|wmv|webm|flv|avi*|wav|vob*)$/gmi;
    // const videoRegex =/(?:((?:https|http):\/\/)|(?:\/)).+(?:.mp3|mp4|3gp|ogg|wmv|webm|flv|avi*|wav|vob*) /gm

     // TODO mp3,ogg,wav
    const audioRegex = /^(https?|ftp|file):\/\/(www.)?(.*?)\.(mp3)$/gmi;

    const youtubeRegex = /(http[s]?:\/\/)?www\.(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
    const attachements: MessageElement[] = [];

    const pictureMatche = pictureRegex.exec(message);
    if (pictureMatche) {
     // TODO ajouter un attachement de type image dans attachements
       const pictureId = pictureMatche[0];
       attachements.push({
        type: 'image',
        url: pictureId
       } as MessageImageElement)

    }

    const videoMatche = videoRegex.exec(message)
    if (videoMatche) {
      const videoId = videoMatche[0];
     // TODO ajouter un attachement de type video dans attachements
     attachements.push({
      type: 'video',
      url: videoId
     } as MessageVideoElement)
    }

    const audioMatche = audioRegex.exec(message)
    if (audioMatche) {
      const audioId = audioMatche[0];
     // TODO ajouter un attachement de type audio dans attachements
     attachements.push({
      type: 'audio',
      url: audioId
     } as MessageAudioElement)
    }

    const youtubeMatche = youtubeRegex.exec(message)
    if (youtubeMatche) {
     // TODO ajouter un attachement de type youtube dans attachements
     const youtubeId = youtubeMatche[2]
     attachements.push({
      type: 'youtube',
      videoId: youtubeId
     })
    }

    return {
      text: {
        type: 'text',
        content: message
      } as MessageTextElement,
      attachements
    };
  }
}

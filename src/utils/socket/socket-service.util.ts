import {Metaverse} from "../../enums/heatmap.enum";

export class SocketService {
  socket: WebSocket | null = null;
  messageHandlers: any = {};
  
  constructor(
    socketUrl: string,
    onConnect: any,
    onNewLand: any,
    onDisconnect?: any
  ) {
    this.socket = new WebSocket(socketUrl)
    this.onMessage()
    this.onError()
    this.onConnect(onConnect)
    this.onDisconnect((ev: any) => { console.log(ev.reason) })
    this.pingPong()
    this.onNewLand(onNewLand)
  }

  onMessage() {

    if (!this.socket) return

    this.socket.onmessage = ({ data: receivedData }) => {
      const parsedData = receivedData.toString()
      const [message, messageRawData] = parsedData.split('|')
      const messageHandler = this.messageHandlers[message]

      if (!messageHandler) return

      const messageData = messageRawData?.split(',')

      messageHandler(messageData)

    }
  }

  pingPong() {
    this.messageHandlers['ping'] = () => { this.socket?.send('pong') }
  }

  onError() {
    if (!this.socket) return

    this.socket.onerror = err => console.log(err, new Date().toISOString())
  }

  onConnect(callback: any) {

    if (!this.socket) return

    this.socket.onopen = callback
  }

  onDisconnect(callback: any) {

    if (!this.socket) return

    this.socket.onclose = callback
  }

  onNewLand(callback: any) {
    this.messageHandlers['new-land-data'] = callback;
  }

  onGiveLand(callback: any) {
    this.messageHandlers['give-land'] = callback
  }

  getLand(metaverse: Metaverse, tokenId: string | undefined) {
    // TODO fix
    if (tokenId == undefined) return;
    this.socket?.send(`get-land|${metaverse};${tokenId}`)
  }

  onRenderFinish(callback: any) {
    const renderFinishCallback = () => {
      console.log('render finish', new Date().toISOString())
      callback()
      this.disconnect()
    }
    this.messageHandlers['render-finish'] = renderFinishCallback
  }

  renderStart(metaverse: Metaverse, landIndex: number) {
    console.log(this.socket, 'Emit render', metaverse, landIndex, new Date().toISOString());
    this.socket?.send(`render-start|${metaverse};${landIndex}`);
  }

  disconnect() {
    /* this.socket?.disconnect() */
  }
}

let socketService: SocketService | null = null

export function GetSocketService(socketUrl: string, onConnect: any, onNewLand: any) {
  socketService = new SocketService(socketUrl, onConnect, onNewLand);
  return socketService;
}
import {LogError, LogWarning} from "../logging.util";
import {Module} from "../../enums/logging.enum";
import {Metaverse} from "../../enums/heatmap.enum";
import {CastStringToInteger} from "../common.util";
import {Coords, LandData} from "../../interfaces/land.interface";
import {LandType} from "../../types/heatmap/land.type";

type LandSocketFunction = (landData?: string, landKeyIndex?: number) => (void | Promise<void>);

const enum LandSocketEvent {
  Ping = 'ping',
  NewLand = 'new-land-data',
  GiveLand = 'give-land',
  RenderFinish = 'render-finish',
}

class LandSocket {
  private static _instance: LandSocket;
  private _socket: WebSocket | undefined;
  private _messageHandler: Partial<Record<LandSocketEvent, LandSocketFunction>> = {};
  
  public static Instance() {
    if (LandSocket._instance === undefined)
      LandSocket._instance = new LandSocket();
    
    return LandSocket._instance;
  }
  
  public Socket() {
    if (this._socket == undefined) {
      const landSocketUrl = process.env.NEXT_PUBLIC_SOCKET_SERVICE;
      if (landSocketUrl == undefined)
        return void LogError(Module.Heatmap, "Missing SocketService env value!");
      
      this._socket = new WebSocket(landSocketUrl);
    }
    
    return this._socket;
  }
  
  public FreeSocket() {
    this._socket?.close();
    this._socket = undefined;
  }
  
  public Handler() {
    return this._messageHandler;
  }
  
  public SetEventHandler(eventName: LandSocketEvent, event: LandSocketFunction) {
    this._messageHandler[eventName] = event;
  }
}

export function InitLandSocket(onConnect: () => void) {
  const socket = LandSocket.Instance().Socket();
  if (socket == undefined)
    return void LogError(Module.LandSocket, "Error initializing Socket!");
  
  SetOnOpen(socket, onConnect);
  SetOnMessage(socket);
  SetOnError(socket);
  SetOnClose(socket);
  SetPingPong(socket);
}

function SetOnOpen(socket: WebSocket, callback: () => void) {
  socket.onopen = callback;
}

function SetOnError(socket: WebSocket) {
  socket.onerror = (err) => {
    LogError(Module.LandSocket, "Error while executing socket.", err);
  };
}

function SetOnClose(socket: WebSocket) {
  socket.onclose = (closeEvent) => {
    LogWarning(Module.LandSocket, `Socket just closed... ${closeEvent.reason}`, closeEvent);
  };
}

function SetPingPong(socket: WebSocket) {
  LandSocket.Instance().SetEventHandler(LandSocketEvent.Ping, () => {
    socket.send('pong');
  });
}

export function FreeSocket() {
  LandSocket.Instance().FreeSocket();
}

function SetOnMessage(socket: WebSocket) {
  socket.onmessage = (messageEvent) => {
    const data = messageEvent.data as string;
    const [message, realData] = data.split('|');
    
    const messageHandler = LandSocket.Instance().Handler()[message as LandSocketEvent];
    if (messageHandler == undefined)
      return LogWarning(Module.LandSocket, "Not function found for event!", `Missing "${message}" event function!`);
    
    if (realData == undefined) {
      void messageHandler();
      return;
    }
      
    const [landRawData, landKeyIndex] = realData.split(',');
    const landIndexNum = CastStringToInteger(landKeyIndex);
    if (landIndexNum == undefined)
      return LogWarning(Module.LandSocket, "Land index not a number!");
    
    void messageHandler(landRawData, landIndexNum);
  }
}

export function RenderStart(metaverse: Metaverse, landIndex: number) {
  const socket = LandSocket.Instance().Socket();
  if (socket == undefined)
    return void LogError(Module.LandSocket, "Missing socket on RenderStart!");
  
  socket.send(`render-start|${metaverse};${landIndex}`);
}

export function SetOnFinish(onFinish: LandSocketFunction) {
  LandSocket.Instance().SetEventHandler(LandSocketEvent.RenderFinish, onFinish);
}

export function SetOnNewLand(metaverse: Metaverse, onNewLand: LandSocketFunction) {
  LandSocket.Instance().SetEventHandler(LandSocketEvent.NewLand, onNewLand);
}
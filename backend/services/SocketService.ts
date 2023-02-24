import { io, Socket } from 'socket.io-client'
import { Metaverse } from '../../lib/metaverse'

class SocketService {
    socket: Socket | null = null
    constructor(
        socketUrl: string,
        onConnect: any,
        onNewLand: any,
        onDisconnect?: any
    ) {
        this.socket = io(socketUrl, {
            transports: ['websocket']
         }
         )
        this.onError()
        this.onConnect(onConnect)
        this.pingPong()
        this.onNewLand(onNewLand)

    }

    pingPong() {
        this.socket?.on('ping', () => {
            this.socket?.emit('pong')
        })
        console.log(this.socket)
    }

    onError() {
        this.socket?.on('connect_error', err => console.log(err, new Date().toISOString()))
        this.socket?.on('connect_failed', err => console.log(err, new Date().toISOString()))
        this.socket?.on('disconnect', err => console.log(err, new Date().toISOString()))
    }

    onConnect(callback: any) {
        this.socket?.on('connect', callback)
    }

    onDisconnect(callback: any) {
        this.socket?.on('disconnect', callback)
    }

    onNewLand(callback: any) {
        this.socket?.on('new-land-data', callback)
    }

    onRenderFinish(callback: any) {
        this.socket?.on('render-finish', callback)
    }

    offNewLand() {
        this.socket?.off('new-land-data')
    }

    renderStart(metaverse: Metaverse, landIndex:number) {
        console.log(this.socket, 'Emit render', metaverse, landIndex, new Date().toISOString())
        this.socket?.on('render-finish', () => this.disconnect())
        this.socket?.emit('render-start', metaverse, landIndex)
    }

    disconnect() {
        this.socket?.disconnect()
    }
}

let socketService: SocketService | null = null

const getSocketService = (
    socketUrl: string,
    onConnect: any,
    onNewLand: any
) => {
    socketService = new SocketService(socketUrl, onConnect, onNewLand)
    return socketService
}
export { getSocketService }

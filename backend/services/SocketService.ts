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
        this.socket = io(socketUrl)
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
    onConnect(callback: any) {
        this.socket?.on('connect', callback)
    }

    onDisconnect(callback: any) {
        this.socket?.on('disconnect', callback)
    }

    onNewLand(callback: any) {
        this.socket?.on('new-land-data', callback)
    }
    offNewLand() {
        this.socket?.off('new-land-data')
    }
    startRender(metaverse: Metaverse) {
        console.log(this.socket, 'Emit render', metaverse)
        this.socket?.on('render-finish', () => this.disconnect())
        this.socket?.emit('render-start', metaverse)
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

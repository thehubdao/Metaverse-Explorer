import * as PushAPI from '@pushprotocol/restapi'
import { Signer } from 'ethers'

const pushChannel = process.env.CHANNEL_PUSH_ADDRESS

const checkSubscription = async (address: string) => {
    const subscriptions = await PushAPI.user.getSubscriptions({
        user: `eip155:137:${address}`,
        env: 'prod',
    })
    let isSubscribed = subscriptions.filter(
        (subscription: any) => subscription.channel === pushChannel
    )
    isSubscribed = isSubscribed.length == 1

    return isSubscribed
}

const subscribeToChannel = async (
    signer: Signer,
    onSuccess?: any,
    onError?: any
) => {
    const address = await signer.getAddress()
    console.log(address, signer, 'SUBSCRIBE', pushChannel)
    await PushAPI.channels.subscribe({
        signer: signer as any,
        channelAddress: 'eip155:137:' + pushChannel,
        userAddress: 'eip155:137:' + address,
        onSuccess,
        onError,
        env: 'prod',
    })
}

const unSubscribeToChannel = async (signer: Signer) => {
    const address = await signer.getAddress()
    await PushAPI.channels.unsubscribe({
        signer: signer as any,
        channelAddress: 'eip155:137:' + pushChannel,
        userAddress: 'eip155:137:' + address,
        env: 'prod',
    })
}

export { subscribeToChannel, checkSubscription }

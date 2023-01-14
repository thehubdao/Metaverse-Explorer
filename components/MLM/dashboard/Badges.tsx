import React, { useState, useEffect } from 'react'
import Badge from '../badge'
import axios from 'axios'
import { getBalance } from '../../../backend/services/BadgesContractService'
import { useProvider, useAccount } from 'wagmi'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light-border.css'
import { Grid, Navigation, Scrollbar } from 'swiper'

const eventTypesArray = {
    'Created a proposal': {
        id: 'Created a proposal',
        toClaim: false,
    },
    'Purchased a wearable': {
        id: 'Purchased a wearable',
        toClaim: false,
    },
    'Deployed a scene': {
        id: 'Deployed a scene',
        toClaim: false,
    },
    'Attended an event': {
        id: 'Attended an event',
        toClaim: false,
    },
    'Voted for a proposal': {
        id: 'Voted for a proposal',
        toClaim: false,
    },
}

export const Badges = () => {
    const [badges, setBadges] = useState<any>('')
    const provider = useProvider()
    const account = useAccount()
    const [eventTypes, setEventTypes] = useState<any>(eventTypesArray)
    const [claimedID, setClaimedID] = useState<any>('')

    useEffect(() => {
        const getBadges = async () => {
            const badges = (
                    await axios.get(
                        process.env.MLM_BACKEND_URL +
                            '/ipfs/getPins'
                    )
                ).data,
                userBadges = await getBalance(account.address, provider)
            const availableBadges = (
                await axios.get(
                    process.env.MLM_BACKEND_URL +
                        '/db/getAvailableBadges?walletAddress=' +
                        account.address
                )
            ).data
            setBadges({
                badges,
                userBadges,
                availableBadges,
            })
        }

        if (account.isConnected) getBadges()
    }, [badges])

    useEffect(() => {
        let id
        if (badges)
            for (let i = 0; i < badges.availableBadges.badges.length; i++) {
                id = badges.availableBadges.badges[i]
                if (eventTypes[id].toClaim != true && claimedID != id)
                    setEventTypes({
                        ...eventTypes,
                        [id]: {
                            id: id,
                            toClaim: true,
                        },
                    })
            }
    }, [badges])

    const badgeNotification = (id: any) => {
        setClaimedID(id)
        if (eventTypes[id].toClaim == true)
            setEventTypes((prevState: any) => ({
                ...prevState,
                [id]: {
                    ...prevState[id],
                    toClaim: false,
                },
            }))
        setBadges({
            undefined,
        })
    }

    // tippy("#infoButton", {
    //   content: `These badges are an important way to demonstrate one's reputation within the metaverse, and they can serve as a symbol of status and achievement.
    // 	As non-fungible tokens (NFTs), the MGH Badges are unique and can be collected, traded, and displayed as a testament to a user's standing within the community.
    // 	In the metaverse, reputation is an essential currency, and these badges serve as a way to demonstrate and recognize the contributions and engagement of its holders.`,
    //   theme: "light-border",
    //   placement: "right",
    // });

    return (
        <>
            <div className="bg-grey text-white max-w-full max-h-full rounded-2xl space-y-3 p-4">
                <div className="pb-11 pt-6">
                    <div className="flex flex-row">
                        <h2 className="text-4xl pl-4 pb-4">Badges</h2>
                        <button
                            className="flex mx-4 mt-4 border-solid border-2 w-6 h-6 text-xs rounded-full cursor-help items-center justify-center"
                            id="infoButton"
                        >
                            i
                        </button>
                    </div>
                    {!badges ? (
                        <div className="flex flex-col justify-center max-w-full items-center">
                            <div className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900  rounded-lg inline-flex items-center">
                                <svg
                                    role="status"
                                    className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="#1C64F2"
                                    />
                                </svg>
                                Loading...
                            </div>
                            <p className="p-mlm w-full text-center text-white">
                                This may take a few seconds.
                            </p>
                        </div>
                    ) : (
                        <>
                            <Swiper
                                slidesPerView={5}
                                grid={{
                                    rows: 2,
                                    fill: 'row',
                                }}
                                spaceBetween={1}
                                scrollbar={{
                                    hide: false,
                                    draggable: true,
                                }}
                                modules={[Navigation, Grid, Scrollbar]}
                                className="mySwiper mb-4"
                            >
                                {badges.badges.map((badge: any, index: any) => {
                                    const { userBadges } = badges
                                    let image
                                    try {
                                        if (
                                            userBadges &&
                                            userBadges[index] >= 1
                                        )
                                            image =
                                                'https://ipfs.io/ipfs/' +
                                                badge.image.split('ipfs://')[1]
                                        else image = '/images/BadgeBlocked.svg'
                                    } catch (error) {}
                                    return (
                                        <>
                                            <SwiperSlide>
                                                <Badge
                                                    claim={
                                                        eventTypes[
                                                            Object.keys(
                                                                eventTypes
                                                            )[index]
                                                        ]
                                                    }
                                                    badgeNotification={
                                                        badgeNotification
                                                    }
                                                    src={image}
                                                    index={(
                                                        index + 1
                                                    ).toString()}
                                                    key={index + 1}
                                                ></Badge>
                                            </SwiperSlide>
                                        </>
                                    )
                                })}
                            </Swiper>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

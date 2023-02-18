import React, { useEffect, useState } from 'react'
import { BiDislike, BiLike } from 'react-icons/bi'
import { BsTwitter } from 'react-icons/bs'
import {
  dislikeLand,
  getValuationScores,
  likeLand,
} from '../../lib/FirebaseUtilities'
import { Metaverse } from '../../lib/metaverse'
import { useAppSelector } from '../../state/hooks'

export interface Score {
  likes: string[]
  dislikes: string[]
}

interface Props {
  landId: string
  metaverse: Metaverse
  twitterLink: string
}
const LandLikeBox = ({ landId, metaverse, twitterLink }: Props) => {
  const { address } = useAppSelector((state) => state.account)
  const [score, setScore] = useState<Score>()
  const [refetch, setRefetch] = useState(false)
  const [userReacted, setUserReacted] = useState({
    liked: false,
    disliked: false,
  })
  const [connectToVote, setConnectToVote] = useState(false)

  const like = async () => {
    if (!score) return
    if (!address) {
      setConnectToVote(true)
      return setTimeout(() => setConnectToVote(false), 1100)
    }
    // If user already liked take like away
    if (userReacted.liked) {
      /////// Instant Feedback
      setUserReacted({ liked: false, disliked: false })
      setScore({
        likes: score?.likes.filter((wallet) => wallet !== address),
        dislikes: score?.dislikes.filter((wallet) => wallet !== address),
      })
      // taking like out
      await likeLand(landId, address, metaverse)
    } else {
      /////// Instant Feedback
      setUserReacted({ liked: true, disliked: false })
      setScore({
        likes: [...score.likes, address],
        dislikes: score?.dislikes.filter((wallet) => wallet !== address),
      })
      // liking
      await likeLand(landId, address, metaverse)
    }
    setRefetch(!refetch)
  }

  const dislike = async () => {
    if (!score) return
    if (!address) {
      setConnectToVote(true)
      return setTimeout(() => setConnectToVote(false), 1100)
    }
    // If user already dislike then take dislike out
    if (userReacted.disliked) {
      /////// Instant Feedback
      setUserReacted({ liked: false, disliked: false })
      setScore({
        likes: score.likes.filter((wallet) => wallet !== address),
        dislikes: score.dislikes.filter((wallet) => wallet !== address),
      })
      // taking dislike out
      await dislikeLand(landId, address, metaverse)
    } else {
      /////// Instant Feedback
      setUserReacted({ liked: false, disliked: true })
      setScore({
        likes: score.likes.filter((wallet) => wallet !== address),
        dislikes: [...score?.dislikes, address],
      })
      // disliking
      await dislikeLand(landId, address, metaverse)
    }
    setRefetch(!refetch)
  }

  useEffect(() => {
    const fetchLikes = async () => {
      if (!landId) return
      const score = (await getValuationScores(landId, metaverse)) as
        | Score
        | undefined
      if (!score) return setRefetch(!refetch)
      setScore(score)
      if (!address) return
      const liked = score?.likes.includes(address) || false
      const disliked = score?.dislikes.includes(address) || false
      setUserReacted({ liked: liked, disliked: disliked })
    }
    fetchLikes().then()
  }, [landId, refetch, address])

  return (
    <div className='flex relative text-center w-full justify-start items-end font-medium gap-6 text-gray-400'>
      {connectToVote && (
        <div className='absolute'>
          <span className='font-medium min-w-max absolute w-fit p-3 pt-4 bg-black/50 backdrop-blur-xl rounded-xl -top-1/2'>
            Connect Wallet to Vote!
          </span>
        </div>
      )}
      {/* Like */}
      <div className='flex items-end gap-3'>
        <BiLike
          onClick={like}
          role='button'
          className={
            'h-8  w-8 hover:text-green-500 transition-all' +
            (userReacted.liked ? 'text-green-500' : '')
          }
        />
        <p className='text-green-500 text-xl font-medium'>
          {score?.likes.length || 0}
        </p>
      </div>
      {/* Dislike */}
      <div className='flex items-end gap-3'>
        {/* <div> */}
        <BiDislike
          onClick={dislike}
          role='button'
          className={
            'h-8 w-8 hover:text-red-500 transition-all' +
            (userReacted.disliked && 'text-red-500')
          }
        />
        <p className='text-red-500 font-medium text-xl'>
          {score?.dislikes.length || 0}
        </p>
      </div>
      <div className='grow' />
      <BsTwitter
        title='Share Valuation'
        onClick={() => window.open(twitterLink)}
        className='h-6 md:h-8 w-auto text-gray-400 hover:text-blue-400 transition duration-300 cursor-pointer'
      />
    </div>
  )
}

export default LandLikeBox

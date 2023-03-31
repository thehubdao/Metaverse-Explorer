import React, { useEffect, useRef, useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import {
  approveTokens,
  buyRoleB2B,
  buyRoleB2C,
} from '../../backend/services/RoleContractService'
import Button from './Button'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import { setAccountToken } from '../../state/account'
import web3authService from '../../backend/services/Web3authService'


interface PriceButtonProps {
  label: string
  amount: number
  handleSubmitCurrency: Function,
  intervals: number
}

const PriceButton = ({ label, amount, handleSubmitCurrency, intervals }: PriceButtonProps) => {
  return (
    <Button
      label={`${label}`}
      onClick={() => {
        handleSubmitCurrency(amount, intervals)
      }}
    />
  )
}

const InputCurrency = (props: any) => {
  const [inputValue, setInputValue] = useState()
  const element: any = useRef<any>(null)
  const { setState } = props
  const { data: signer } = useSigner()
  const dispatch = useAppDispatch()
  const { token }: any = useAppSelector((state) => state.account.accessToken);
  const {address} = useAccount()

  const handleB2BSubmitCurrency = async (amount: number, intervals: number) => {
    if (amount < props.min) return
    await approveTokens(props.currency, signer!, amount)
    await buyRoleB2B(1001, props.currency, signer!)
    const newToken = await web3authService.updateToken(token)
    dispatch(setAccountToken(newToken))
    props.actionProvider.handleLastMessage(address,`$${amount}`,web3authService.getB2CRole?.endDate)
    setState((state: any) => ({ ...state, amount: amount }))
  }

  const handleB2CSubmitCurrency = async (amount: number, intervals: number) => {
    if (amount < props.min) return
    await approveTokens(props.currency, signer!, amount)
    console.log(1, intervals, props.currency)
    await buyRoleB2C(1, intervals, props.currency, signer!)
    const newToken = await web3authService.updateToken(token)
    dispatch(setAccountToken(newToken))
    console.log(web3authService.getB2CRole?.endDate)
    props.actionProvider.handleLastMessage(address,`$${amount}`,web3authService.getB2CRole?.endDate)
    setState((state: any) => ({ ...state, amount: amount }))
  }

  const handleSubmitCurrency = props.buyType == 'B2B' ? handleB2BSubmitCurrency : handleB2CSubmitCurrency

  const handleChange = (event: any) => {
    setInputValue(event.target.value)
  }

  useEffect(() => {
    element.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    })
  }, [element])

  return (
    <div className="w-full flex flex-col" ref={element}>
      <div className="w-full grid grid-cols-4 mt-11 gap-2">
        {
          props.showInputAmount && <>
            <input
              className={`bg-grey-sidebar rounded-xl p-3 focus:outline-none text-center ${inputValue ? 'col-span-3' : 'col-span-full'
                }`}
              type="number"
              placeholder={`Enter Amount ${props.currency} or select below`}
              value={inputValue}
              onChange={handleChange}
              min={0}
            />
            {inputValue && (
              <Button
                label="Submit"
                onClick={() => {
                  handleSubmitCurrency(inputValue, 0)
                }}
              />
            )}
          </>
        }
      </div>
      <div className="flex w-full justify-center gap-2 mt-4">
        {props.buttonsInfo.map((item: { label: string, amount: number, intervals: number }, index: number) => {
          return (
            <PriceButton
              key={index}
              amount={item.amount}
              label={item.label}
              intervals={item.intervals}
              handleSubmitCurrency={handleSubmitCurrency}
            />
          )
        })}
      </div>
    </div>
  )
}

export default InputCurrency

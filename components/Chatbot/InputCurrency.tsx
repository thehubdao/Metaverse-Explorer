import React, { useEffect, useRef, useState } from 'react'
import { useSigner } from 'wagmi'
import {
  approveTokens,
  buyRoleB2B,
  buyRoleB2C,
} from '../../backend/services/RoleContractService'
import Button from './Button'


interface PriceButtonProps {
  label: string
  amount: number
  handleSubmitCurrency: Function
}

const PriceButton = ({ label, amount, handleSubmitCurrency }: PriceButtonProps) => {
  return (
    <Button
      label={`${label}`}
      onClick={() => {
        handleSubmitCurrency(350)
      }}
    />
  )
}

const InputCurrency = (props: any) => {
  const [inputValue, setInputValue] = useState()
  const element: any = useRef<any>(null)
  const { setState } = props
  const { data: signer } = useSigner()

  const handleB2BSubmitCurrency = async (amount: number) => {
    if (amount < props.min) return
    await approveTokens(props.currency, signer!, amount)
    await buyRoleB2B(1001, 'USDC', signer!)
    props.actionProvider.handleLastMessage(`$${amount}`)
    setState((state: any) => ({ ...state, amount: amount }))
  }

  const handleB2CSubmitCurrency = async (amount: number) => {
    if (amount < props.min) return
    await approveTokens(props.currency, signer!, amount)
    await buyRoleB2C(1, 'USDC', signer!)
    props.actionProvider.handleLastMessage(`$${amount}`)
    setState((state: any) => ({ ...state, amount: amount }))
  }

  const handleSubmitCurrency = props.buyType =='B2B' ? handleB2BSubmitCurrency: handleB2CSubmitCurrency

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
                  handleSubmitCurrency(inputValue)
                }}
              />
            )}
          </>
        }
      </div>
      <div className="flex w-full justify-center gap-2 mt-4">
        {props.buttonsInfo.map((item: { label: string, amount: number }, index: number) => {
          return (
            <PriceButton
              key={index}
              amount={item.amount}
              label={item.label}
              handleSubmitCurrency={handleSubmitCurrency}
            />
          )
        })}
      </div>
    </div>
  )
}

export default InputCurrency

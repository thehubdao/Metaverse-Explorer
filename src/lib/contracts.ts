import { Interface } from 'ethers/lib/utils'

import AxieLandAbi from '../backend/abi/AxieLand.json'

export const Contracts = {
  // Sandbox
  LAND: {
    ETHEREUM_MAINNET: {
      oldAddress: '0x50f5474724e0Ee42D9a4e711ccFB275809Fd6d4a',
      newAddress: '0x5cc5b05a8a13e3fbdb0bb9fccd98d38e50f90c38',
    },
    POLYGON_MAINNET: {
      address: '0x9d305a42a3975ee4c1c57555bed5919889dce63f'
    }
  },
  // Decentraland
  PARCEL: {
    ETHEREUM_MAINNET: {
      address: '0xF87E31492Faf9A91B02Ee0dEAAd50d51d56D5d4d',
    },
    POLYGON_MAINNET: {
      address: ''
    }
  },
  AXIE_LANDS: {
    RONIN_MAINNET: {
      address: '0x8c811e3c958e190f5ec15fb376533a3398620500',
      abi: new Interface(AxieLandAbi),
    },
    POLYGON_MAINNET: {
      address: ''
    }
  },
  // Somnium Space:
  CUBES: {
    ETHEREUM_MAINNET: {
      address: '0x913ae503153d9a335398d0785ba60a2d63ddb4e2'
    },
    POLYGON_MAINNET: {
      address: ''
    }
  }
}

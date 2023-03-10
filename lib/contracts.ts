import { Interface } from 'ethers/lib/utils'

import stakingAbiMaticTestnet from '../backend/abi/stakingAbiMaticTestnet.json'
import tokenAbiMaticTestnet from '../backend/abi/tokenAbiMaticTestnet.json'
import stakingAbiMaticMainnet from '../backend/abi/stakingAbiMaticMainnet.json'
import tokenAbiMaticMainnet from '../backend/abi/tokenAbiMaticMainnet.json'

import tokenAbiETHRinkeby from '../backend/abi/tokenAbiETHRinkeby.json'
import stakingAbiETHRinkeby from '../backend/abi/stakingAbiETHRinkeby.json'
import tokenAbiETHMainnet from '../backend/abi/tokenAbiETHMainnet.json'

import AxieLandAbi from '../backend/abi/AxieLand.json'

export const Contracts = {
  MGH_TOKEN: {
    MATIC_TESTNET: {
      address: '0xA26fcc9847F24C7D78f4e77Ba39A37B8A9eaFB02',
      abi: new Interface(tokenAbiMaticTestnet),
    },
    MATIC_MAINNET: {
      address: '0xc3C604F1943B8C619c5D65cd11A876e9C8eDCF10',
      abi: new Interface(tokenAbiMaticMainnet),
    },
    ETHEREUM_RINKEBY: {
      address: '0xe72bcCFCAbc7B62548d774D8F0208d1673454aC1',
      abi: new Interface(tokenAbiETHRinkeby),
    },
    ETHEREUM_MAINNET: {
      address: '0x8765b1a0eb57ca49be7eacd35b24a574d0203656',
      abi: new Interface(tokenAbiETHMainnet),
    },
  },
  MGH_STAKING: {
    MATIC_TESTNET: {
      address: '0x7d267713502F979ffE3c49622fd0DC24d6D607D0',
      abi: new Interface(stakingAbiMaticTestnet),
    },
    MATIC_MAINNET: {
      address: '0xb2Cc21271f2D3Ac2Aaaffa8Ed2F40fDe1C63d894',
      abi: new Interface(stakingAbiMaticMainnet),
    },
    ETHEREUM_RINKEBY: {
      address: '0x328475d10EC94310497F8796A990D3b04024ad82',
      abi: new Interface(stakingAbiETHRinkeby),
    },
    ETHEREUM_MAINNET: {
      address: '0x4b945f3fCbC1De8310D14d826DD5052e8f9375C2',
      abi: new Interface(stakingAbiETHRinkeby),
    },
  },
  // Sandbox
  LAND: {
    ETHEREUM_MAINNET: {
      oldAddress: '0x50f5474724e0Ee42D9a4e711ccFB275809Fd6d4a',
      newAddress: '0x5cc5b05a8a13e3fbdb0bb9fccd98d38e50f90c38',
    },
    POLYGON_MAINNET: {
      address: '0x79393A9318F83d75d29EA7123aCC52F4a9d2404A'
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

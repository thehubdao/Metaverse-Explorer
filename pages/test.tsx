import { useState } from "react";
import CardsChoise from "../components/General/Choicer/CardsChoise";
import CollectionsChoise from "../components/General/Choicer/CollectionsChoise";
import GeneralSection from "../components/GeneralSection";
import InitChoice from "../components/InitChoice";

export default function Test() {
  const [collection, setCollection] = useState(null)

  const headerList = [
    {
      name: 'Portfolio',
      route: 'portfolio'
    },
    {
      name: 'Watchlist',
      route: 'watchlist'
    },
    {
      name: 'Analytics',
      route: 'analytics'
    },
  ]

  const chooserList1 = [
    {
      name: 'Sandbox',
      logo: '/images/the-sandbox-sand-logo.png'
    },
    {
      name: 'Decentraland',
      logo: '/images/decentraland-mana-logo.png'
    },
    /* {
      name: 'Axie Infinity',
      logo: '/images/axie-infinity-axs-logo.png'
    }, */
    {
      name: 'Somnium Space',
      logo: '/images/somnium-space-cube-logo.webp'
    },
  ]

  const chooserList2 = [
    {
      name: 'Collection Name 1',
      logo: 'https://fluf-compressed.s3.eu-west-1.amazonaws.com/QmWfgnTiMDxjJJpYV2APPvZnPxGSNEdUXuZUX2T6qVVzoV_432_432.png',
      creator: 'Collection Creator',
      nItems: 999
    },
    {
      name: 'Collection Name 2',
      logo: 'https://fluf-compressed.s3.eu-west-1.amazonaws.com/QmZgbe7Cej9k86j3AQ2Ent7wMN9fwn4RkKGakbzG8nu9pz_432_432.png',
      creator: 'Collection 2 Creator',
      nItems: 999
    },
    {
      name: 'Collection Name 3',
      logo: 'https://fluf-compressed.s3.eu-west-1.amazonaws.com/QmUnyFufR3JJ85tUcyHQrYBWdiAdkYyevKCERoFw8s2eFm_432_432.png',
      creator: 'Collection 3 Creator',
      nItems: 999
    },
    {
      name: 'Collection Name 4',
      logo: 'https://fluf-compressed.s3.eu-west-1.amazonaws.com/QmUnyFufR3JJ85tUcyHQrYBWdiAdkYyevKCERoFw8s2eFm_432_432.png',
      creator: 'Collection 4 Creator',
      nItems: 999
    },
  ]

  return (
    <div>
      <div className="min-h-[6rem]">
        {/* {imagen && imagen} */}
      </div>

      <GeneralSection
        sectionTitle={"LAND Valuation"}
        optionList={headerList}
        backgroundClass={collection ? '' : 'bg-grey-lightest'}
      >
        {
          collection ? (
            <>Collection view</>
          ) : (
            <InitChoice title="Choose a Metaverse">
              {/* <CardsChoise options={chooserList1} /> */}
              <CollectionsChoise options={chooserList2} setCollection={setCollection} />
            </InitChoice>
          )
        }
      </GeneralSection>
    </div>
  )
}
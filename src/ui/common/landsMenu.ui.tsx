import { ButtonForm } from "../../enums/common.enum";
import Image from "next/image";
import { MetaverseOptions, MetaverseOptionsKey } from "../../enums/metaverses.enum";


interface LandsMenuUIProps {
  metaverse: MetaverseOptions;
  setMetaverse: (metaverse: MetaverseOptionsKey) => void;
  form: ButtonForm;
  isBorder: boolean
}

export default function LandsMenuUI({ metaverse, setMetaverse, form, isBorder }: LandsMenuUIProps) {
  return (
    <div className={`w-full flex items-center justify-center  py-16 ${isBorder ? "border-b border-nm-remark" : ""}`}>
      {
        form == ButtonForm.Horizontal ?
          <>
            {(Object.keys(MetaverseOptions) as Array<MetaverseOptionsKey>).map((key) => {
              return <button
                key={key}
                type="button"
                className={`flex items-center py-3 px-10 text-sm font-bold focus:outline-none rounded-xl mx-3 transition ease-in-out duration-300 bg-lm-fill  ${metaverse === MetaverseOptions[key] ? "shadow-hollow-8  text-nm-dm-icons" : " shadow-relief-12 hover:shadow-relief-32 text-nm-dm-remark"}`}
                onClick={() => {
                  setMetaverse(key)}}
              >
                {MetaverseOptions[key] === MetaverseOptions.sandbox && <Image src="/images/mgh_logo/mgh_logo.svg" width={24} height={24} alt="sandbox" className={`mr-4 ${metaverse === MetaverseOptions[key] ? 'grayscale-0' : 'grayscale'}`} />}
                {MetaverseOptions[key] === MetaverseOptions.decentraland && <Image src="/images/decentraland-mana-logo.png" width={24} height={24} alt="sandbox" className={`mr-4 ${metaverse === MetaverseOptions[key] ? 'grayscale-0' : 'grayscale'}`} />}
                {/* {MetaverseOptions[key] === MetaverseOptions.AXIE && <Image src="/images/axie-infinity-axs-logo.png" width={24} height={24} alt="sandbox" className={`mr-4 ${metaverse === MetaverseOptions[key] ? 'grayscale-0': 'grayscale'}`}/>} */}
                {MetaverseOptions[key] === MetaverseOptions["somnium-space"] && <Image src="/images/somnium-space-cube-logo.webp" width={24} height={24} alt="sandbox" className={`mr-4 ${metaverse === MetaverseOptions[key] ? 'grayscale-0' : 'grayscale'}`} />}
                {MetaverseOptions[key].toUpperCase()}
              </button>

            }
            )}
          </>
          :
          <>
            {(Object.keys(MetaverseOptions) as Array<MetaverseOptionsKey>).map((key) => {
              if (MetaverseOptions[key] === MetaverseOptions.all) {
                return null;
              }
              return (
                <button
                  key={key}
                  type="button"
                  className={`flex flex-col items-center justify-center rounded-3xl cursor-pointer w-[240px] h-[320px] mx-10 focus:outline-none shadow-relief-32 hover:shadow-relief-12 transition ease-in-out duration-300 grayscale hover:grayscale-0 ${metaverse === MetaverseOptions[key] ? "grayscale-0" : ""}`}
                  onClick={() => setMetaverse(key)}
                >
                  {MetaverseOptions[key] === MetaverseOptions.sandbox && <Image src="/images/the-sandbox-sand-logo.png" width={100} height={100} alt="sandbox" />}
                  {MetaverseOptions[key] === MetaverseOptions.decentraland && <Image src="/images/decentraland-mana-logo.png" width={100} height={100} alt="sandbox" />}
                  {/* {MetaverseOptions[key] === MetaverseOptions.AXIE && <Image src="/images/axie-infinity-axs-logo.png" width={100} height={100} alt="sandbox"/>} */}
                  {MetaverseOptions[key] === MetaverseOptions["somnium-space"] && <Image src="/images/somnium-space-cube-logo.webp" width={100} height={100} alt="sandbox" />}
                  <p className="mt-14 text-lg font-semibold text-lm-text">
                    {MetaverseOptions[key].toUpperCase()}
                  </p>
                </button>
              );
            })}
          </>

      }
    </div>
  )
}
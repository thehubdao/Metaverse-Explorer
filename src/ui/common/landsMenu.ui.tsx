import { ButtonForm } from "../../enums/common.enum";
import Image from "next/image";
import { MetaverseOptions, MetaverseOptionsKey } from "../../enums/metaverses.enum";
import { typedKeys } from "../../utils/common.util";


interface LandsMenuUIProps {
  metaverse: MetaverseOptions;
  setMetaverse: (metaverse: MetaverseOptionsKey) => void;
  form: ButtonForm;
  isBorder: boolean
}

export default function LandsMenuUI({ metaverse, setMetaverse, form, isBorder }: LandsMenuUIProps) {
  
  return (
    <div className={`w-full flex items-center justify-center  py-16 ${isBorder ? "border-b border-nm-remark dark:border-nm-dm-fill" : ""}`}>
      {
        form == ButtonForm.Horizontal ?
          <>
            {typedKeys(MetaverseOptions).map((key) => {
              return <button
                key={key}
                type="button"
                className={`flex items-center py-3 px-10 text-sm font-bold focus:outline-none rounded-xl mx-3 transition ease-in-out duration-300 bg-lm-fill dark:bg-nm-dm-fill  ${metaverse === MetaverseOptions[key] ? "shadow-hollow-8 dark:shadow-dm-hollow-8  text-nm-dm-icons dark:text-nm-fill" : " shadow-relief-12 dark:shadow-dm-relief-12 hover:shadow-relief-32 dark:hover:shadow-dm-relief-32 text-nm-dm-remark dark:text-nm-fill"}`}
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
            {typedKeys(MetaverseOptions).map((key) => {
              if (MetaverseOptions[key] === MetaverseOptions.all) {
                return null;
              }
              return (
                <button
                  key={key}
                  type="button"
                  className={`flex flex-col items-center justify-center rounded-3xl cursor-pointer w-[240px] h-[320px] mx-10 focus:outline-none transition ease-in-out duration-300 grayscale hover:grayscale-0 shadow-relief-32 hover:shadow-relief-12 dark:shadow-dm-relief-32 dark:hover:shadow-dm-relief-12 ${metaverse === MetaverseOptions[key] ? "grayscale-0" : ""}`}
                  onClick={() => setMetaverse(key)}
                >
                  {MetaverseOptions[key] === MetaverseOptions.sandbox && <Image src="/images/the-sandbox-sand-logo.png" width={100} height={100} alt="sandbox" />}
                  {MetaverseOptions[key] === MetaverseOptions.decentraland && <Image src="/images/decentraland-mana-logo.png" width={100} height={100} alt="sandbox" />}
                  {/* {MetaverseOptions[key] === MetaverseOptions.AXIE && <Image src="/images/axie-infinity-axs-logo.png" width={100} height={100} alt="sandbox"/>} */}
                  {MetaverseOptions[key] === MetaverseOptions["somnium-space"] && <Image src="/images/somnium-space-cube-logo.webp" width={100} height={100} alt="sandbox" />}
                  <p className="mt-14 text-lg font-semibold text-lm-text dark:text-nm-fill">
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
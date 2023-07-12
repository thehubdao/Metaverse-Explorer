import { Metaverses } from "../../enums/enums";
import Image from "next/image";

interface LandsMenuUIProps{
    metaverse: Metaverses;
    setMetaverse: React.Dispatch<React.SetStateAction<Metaverses>>;
}

export default function LandsMenuUI ({metaverse, setMetaverse}: LandsMenuUIProps){

    return(
        <div className='w-full flex items-center justify-center space-x-5 py-16 border-b border-nm-remark'>
            {(Object.keys(Metaverses) as Array<keyof typeof Metaverses>).map((key) => (
                <button
                    key={key}
                    type="button"
                    className={`flex items-center py-3 px-10 text-sm font-bold focus:outline-none rounded-3xl  transition ease-in-out duration-300  ${metaverse === Metaverses[key] ? "shadow-inset  text-nm-dm-icons" : "hover:shadow-relief-12 text-nm-dm-remark"}`}
                    onClick={() => setMetaverse(Metaverses[key])}
                >
                    {Metaverses[key] === Metaverses.SANDBOX && <Image src="/images/mgh_logo/mgh_logo.svg" width={24} height={24} alt="sandbox" className="mr-4"/>}
                    {Metaverses[key] === Metaverses.DECENTRALAND && <Image src="/images/decentraland-mana-logo.png" width={24} height={24} alt="sandbox" className="mr-4"/>}
                    {/* {Metaverses[key] === Metaverses.AXIE && <Image src="/images/axie-infinity-axs-logo.png" width={24} height={24} alt="sandbox" className="mr-4"/>} */}
                    {Metaverses[key] === Metaverses.SOMNIUM && <Image src="/images/somnium-space-cube-logo.webp" width={24} height={24} alt="sandbox" className="mr-4"/>}
                    {Metaverses[key].toUpperCase()}
                </button>
            ))}
        </div>
    )
}
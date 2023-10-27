import Image from "next/image";
import { Metaverses } from "../../enums/metaverses.enum";
import { METAVERSE_LABEL } from "../../constants/common.constant";

interface MapChooseMetaverseUIProps {
  metaverse: Metaverses | undefined;
  setMetaverse: (metaverse: Metaverses | undefined) => void;
  selectMetaverse: boolean;
  setSelectMetaverse: (metaverseState: boolean) => void;
  setSelectFilter?: (filterState: boolean) => void;
  setSelectCoord: (coordState: boolean) => void;
}

export default function MapChooseMetaverseUI({ metaverse, setMetaverse, selectMetaverse, setSelectMetaverse, setSelectFilter, setSelectCoord }: MapChooseMetaverseUIProps) {
  const handleButtonClick = () => {
    setSelectMetaverse(!selectMetaverse);
    if (setSelectFilter) setSelectFilter(false);
    setSelectCoord(false);
  };

  const handleMetaverse = (newMetaverse: Metaverses) => {
    setMetaverse(newMetaverse);
    setSelectMetaverse(false);
  };

  return (
    <div className="relative">
      <button onClick={() => handleButtonClick()}>
        {Object.values(Metaverses).map((iterateMetaverse, index) => {
          if (iterateMetaverse === metaverse) {
            return (
              <div key={index} className={`flex bg-nm-fill dark:bg-nm-dm-fill items-center justify-center rounded-full w-12 h-12 ${selectMetaverse && "rounded-b-none h-[60px] pb-3"}`}>
                {iterateMetaverse === Metaverses.SandBox && 
                  <Image src="/images/the-sandbox-sand-logo.png" width={30} height={30} alt={`${METAVERSE_LABEL[iterateMetaverse]} logo`} />
                }
                {iterateMetaverse === Metaverses.Decentraland &&
                  <Image src="/images/decentraland-mana-logo.png" width={30} height={30} alt={`${METAVERSE_LABEL[iterateMetaverse]} logo`} />
                }
                {iterateMetaverse === Metaverses.SomniumSpace &&
                  <Image src="/images/somnium-space-cube-logo.webp" width={30} height={30} alt={`${METAVERSE_LABEL[iterateMetaverse]} logo`} />
                }
              </div>
            );
          }
        })}
      </button>
      {selectMetaverse && 
        <div className={`flex flex-col space-y-4 absolute bg-nm-fill dark:bg-nm-dm-fill rounded-xl rounded-tl-none p-3 pt-5`}>
          {Object.values(Metaverses).map((iterateMetaverse, index) => (
            iterateMetaverse !== metaverse &&
            <button
              key={index}
              className="flex gap-2 md:gap-4 bg-opacity-100 items-center font-medium text-lm-text dark:text-nm-highlight hover:text-nm-dm-remark dark:hover:text-nm-dm-remark whitespace-nowrap min-w-max rounded-xl"
              onClick={() => handleMetaverse(iterateMetaverse)}
            >
              {iterateMetaverse === Metaverses.SandBox && 
                <Image src="/images/the-sandbox-sand-logo.png" width={25} height={25} alt={`${METAVERSE_LABEL[iterateMetaverse]} logo`} />
              }
              {iterateMetaverse === Metaverses.Decentraland && 
                <Image src="/images/decentraland-mana-logo.png" width={25} height={25} alt={`${METAVERSE_LABEL[iterateMetaverse]} logo`} />
              }
              {iterateMetaverse === Metaverses.SomniumSpace && 
                <Image src="/images/somnium-space-cube-logo.webp" width={25} height={25} alt={`${METAVERSE_LABEL[iterateMetaverse]} logo`} />
              }
              <span className="text-sm md:text-base">
                {METAVERSE_LABEL[iterateMetaverse]}
              </span>
            </button>
          ))}
        </div>
      }
    </div>
  );
}

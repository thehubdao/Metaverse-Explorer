import Image from "next/image";
import { Metaverses, METAVERSE_LABEL } from "../../enums/metaverses.enum";
import { useState } from "react";

interface MapChooseMetaverseUIProps {
  metaverse: Metaverses | undefined;
  setMetaverse: (metaverse: Metaverses | undefined) => void;
}

export default function MapChooseMetaverseUI({
  metaverse,
  setMetaverse,
}: MapChooseMetaverseUIProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative z-50">
      <button onClick={() => setIsOpen(!isOpen)}>
        {Object.values(Metaverses).map((iterateMetaverse) => {
          if (iterateMetaverse === metaverse) {
            return (
              <div
                key={iterateMetaverse}
                className={`flex bg-nm-fill dark:bg-nm-dm-fill items-center justify-center rounded-full w-12 h-12 ${isOpen ? "rounded-b-none h-15" : ""
                  }`}
              >
                {iterateMetaverse === Metaverses.SandBox && (
                  <Image src="/images/the-sandbox-sand-logo.png" width={30} height={30} alt="sandbox" />
                )}
                {iterateMetaverse === Metaverses.Decentraland && (
                  <Image src="/images/decentraland-mana-logo.png" width={30} height={30} alt="decentraland" />
                )}
                {iterateMetaverse === Metaverses.SomniumSpace && (
                  <Image src="/images/somnium-space-cube-logo.webp" width={30} height={30} alt="somnium" />
                )}
              </div>
            );
          }
        })}
      </button>
      {isOpen && (
        <>
          <div className="absolute top-[48px] left-[48px] w-3 h-3">
            <Image
              src={"/images/heatmap/curve.svg"}
              layout="fill"
              alt="heatmap image"
            />
          </div>
          <div
            className={`flex flex-col space-y-4 absolute bg-nm-fill dark:bg-nm-dm-fill rounded-xl rounded-tl-none p-3 pt-5`}
          >
            {Object.values(Metaverses).map((iterateMetaverse) => (
              <button
                key={iterateMetaverse}
                className="flex gap-2 md:gap-4 bg-opacity-100 items-center font-medium text-lm-text dark:text-nm-highlight hover:text-nm-dm-remark dark:hover:text-nm-dm-remark whitespace-nowrap min-w-max rounded-xl"
                onClick={() => {setMetaverse(iterateMetaverse); setIsOpen(!isOpen);} }
              >
                {iterateMetaverse === Metaverses.SandBox && (
                  <Image src="/images/the-sandbox-sand-logo.png" width={25} height={25} alt="sandbox" />
                )}
                {iterateMetaverse === Metaverses.Decentraland && (
                  <Image src="/images/decentraland-mana-logo.png" width={25} height={25} alt="decentraland" />
                )}
                {iterateMetaverse === Metaverses.SomniumSpace && (
                  <Image src="/images/somnium-space-cube-logo.webp" width={25} height={25} alt="somnium" />
                )}
                <span className="text-sm md:text-base">
                  {METAVERSE_LABEL[iterateMetaverse]}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Wearable } from "../../MLM/wearable";
import axios from "axios";
import { useAccount } from "wagmi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Grid, Navigation, Scrollbar } from "swiper";

export const Inventory = () => {
  const [wearables, setWearables] = useState<any>();
  const account = useAccount();

  useEffect(() => {
    const getWearables = async () => {
      console.log(">> get wearables");
      setWearables(
        (
          await axios.get(
            process.env.MLM_BACKEND_URL +
              "/wearables?address=" +
              account.address
          )
        ).data.wearables
      );
    };
    getWearables();
    console.log("Wearables", wearables);
  }, [account.isConnected]);

  return (
    <div className="bg-grey text-white max-w-full max-h-full rounded-2xl space-y-3">
      <div className="p-8">
        <h2 className="text-2xl pl-4">Inventory</h2>
        <div className="flex flex-col gap-8 justify-center pt-4 max-w-full max-h-full items-center">
          {!wearables ? (
            <div className="flex flex-col align-center max-w-full items-center">
              <div className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900  rounded-lg inline-flex items-center">
                <svg
                  role="status"
                  className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                Loading...
              </div>
              <p className="p-mlm w-full text-center text-white truncate">
                This may take a few seconds.
              </p>
            </div>
          ) : (
            <>
              <Swiper
                slidesPerView={2}
                grid={{
                  rows: 2,
                  fill: "row",
                }}
                spaceBetween={1}
                scrollbar={{
                  hide: false,
                  draggable: true,
                }}
                modules={[Navigation, Grid, Scrollbar]}
                className="mySwiper mb-4"
              >
                {wearables &&
                  wearables.map((wearable: any) => (
                    <SwiperSlide>
                      <Wearable
                        wearable={wearable}
                        url={wearable.image}
                        title={wearable.title}
                        image_class={`group-hover/item:opacity-40 hover:opacity-40 transition duration-300 ease-in-out object-contain`}
                      />
                    </SwiperSlide>
                  ))}

                {(!wearables || wearables?.length === 0) && (
                  <div>Your inventory is empty</div>
                )}
              </Swiper>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

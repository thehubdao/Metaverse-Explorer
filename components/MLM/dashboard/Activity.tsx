import React, { useState, useEffect } from "react";
import { RewardModal } from "../modals/RewardModal";
import axios from "axios";
import { useAccount } from "wagmi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Grid, Navigation, Scrollbar } from "swiper";

export const Activity = () => {
  const [activities, setActivities] = useState<any>();
  const [activity, setActivity] = useState<any>();
  const [openModal, setOpenModal] = useState<any>(false);
  const account = useAccount();

  useEffect(() => {
    const getActivities = async () => {
      setActivities(
        (
          await axios.get(
            process.env.REACT_APP_WALLETCONNECT_BACKEND_URL +
              "/db/read-wallet-last?walletAddress=" +
              account.address
          )
        ).data
      );
    };
    getActivities();
    for (const iterator in activities) {
      setActivity(activities[iterator]);
    }
  }, [account.isConnected]);

  const chargeModal = (number: any) => {
    setOpenModal(true);
  };

  return (
    <>
      {openModal && (
        <RewardModal
          onDismiss={() => setOpenModal(false)}
          activity={activity}
        />
      )}
      <div className="flex flex-col space-y-3 max-w-full max-h-full text-white">
        <h2 className="text-xl truncate ">ACTIVITY</h2>
        {!activities ? (
          <div className="flex flex-col justify-center max-w-full items-center">
            <div
              className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900  rounded-lg inline-flex items-center"
            >
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
            <p className="w-full text-center text-white truncate">
              This may take a few seconds.
            </p>
          </div>
        ) : (
          <>
            <Swiper
              slidesPerView={1}
              grid={{
                rows: 3,
                fill: "row",
              }}
              spaceBetween={12}
              scrollbar={{
                hide: false,
                draggable: true,
              }}
              modules={[Navigation, Grid, Scrollbar]}
              className="mySwiper mb-4"
            >
              {activities &&
                activities.map((activity: any) => (
                  <SwiperSlide>
                    <div className="flex h-10 w-full bg-grey rounded-[15px] space-x-0 justify-between">
                      <div className="gradientbox2 font-fire py-1 px-2 m-1 text-md text-center sm:scale-85 lg:scale-90 xl:scale-100 rounded-[12px]">
                        <h2 className="text-[15px]">
                          +{activity.points_earned}
                        </h2>
                      </div>
                      <p className="font-fire text-md py-2 truncate">
                        {activity.metadata.eventType}
                      </p>
                      <div className="flex px-3 py-2">
                        <div className="relative w-30 flex sm:scale-85 lg:scale-90 xl:scale-100 font-medium items-center border-solid  border-2 rounded-[10px] px-3 border-white">
                          <h2 className="text-[11px] truncate">DCLAND</h2>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
            {(!activities || activities?.length === 0) && (
              <>
                <div className="flex h-10 bg-grey rounded-[15px] space-x-0 justify-between">
                  <p className="font-fire text-md py-2 pl-4 truncate">
                    Your activity is empty
                  </p>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

import React from "react";

export const Wearable = ({
  wearable,
  url,
  title,
  image_class,
  onClick,
}: any) => {
  const frame: any = document.getElementById("frame");
  window.addEventListener("message", subscribe);
  document.addEventListener("message", subscribe);

  function subscribe(event: any) {
    const json = event.data;
    if (json?.source !== "avatar-generator") {
      return;
    }
    // Event ready recieved and inmediatly subscribing
    if (json.eventName === "ready") {
      console.log(json);
      frame.contentWindow.postMessage(
        {
          target: "avatar-generator",
          eventName: "subscribe",
        },
        "*"
      );
    }
    if (json.eventName === "exported") {
      console.log(json);
    }
  }

  const avatarWearable = () => {
    let tempId;
    switch (wearable.data.category) {
      case "hat":
        tempId = "HeadAcc";
        break;
      case "upper_body":
        tempId = "Chest";
        break;
      case "lower_body":
        tempId = "Legs";
        break;
    }
    frame.contentWindow.postMessage(
      {
        target: "avatar-generator",
        eventName: "change",
        payload: {
          id: tempId,
          val: wearable.name,
          detail: wearable.data.representations[0].contents[0].url,
        },
      },
      "*"
    );
  };
  return (
    <div
      key={url}
      onClick={onClick ? () => onClick() : () => {}}
      className={`flex flex-col bg-[#262626] relative text-center mx-1 mb-6 items-center justify-center space-y-1 
            sm:space-y-2 lg:w-35 xl:w-40 lg:h-35 xl:h-40 rounded ${
              onClick ? "cursor-pointer" : "cursor-default"
            } 
            group/item hover:scale-110 transition duration-200 ease-linear`}
    >
      <img alt={title} src={url} className={image_class} />
      <button
        className="z-10 border-solid absolute !opacity-100 border-y-2 w-[100%] h-9 text-[17px] border-white 
                group/edit invisible group-hover/item:visible hover:border-[#C7FFF6] hover:text-[#C7FFF6]"
        onClick={avatarWearable}
      >
        Wear
      </button>
    </div>
  );
};

import * as React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function App() {
  // const roomID = getUrlParams().get("roomID") || randomID(5);
  const roomID = "abcde";
  const elementRef = React.useRef(null);

  React.useEffect(() => {
    const myMeeting = async () => {
      // generate Kit Token
      const appID = 1596941807;
      const serverSecret = "3614045be9fb4a63e28633c789e68478";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        randomID(5),
        randomID(5)
      );

      // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      // Check if zp object is defined before calling joinRoom
      if (zp) {
        // start the call
        zp.joinRoom({
          container: elementRef.current,
          sharedLinks: [
            {
              name: "Personal link",
              url:
                window.location.protocol +
                "//" +
                window.location.host +
                window.location.pathname +
                "?roomID=" +
                roomID,
            },
          ],
          scenario: {
            mode: ZegoUIKitPrebuilt.GroupCall,
            // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
          },
        });
      }
    };

    myMeeting();
  }, [roomID]);

  return (
    <div
      className="myCallContainer"
      ref={elementRef}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}

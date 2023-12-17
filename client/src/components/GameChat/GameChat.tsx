import React, {
  ChangeEvent,
  MutableRefObject,
  useEffect,
  useState,
} from "react";
import styles from "./GameChat.module.scss";
import { IoClose, IoChatbox, IoSendSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "@/services";
import { GameChatMessage, RunningGameType } from "@/types";
import { useAccount } from "wagmi";

type PropTypes = {
  runningGame: RunningGameType | undefined;
  gameChannelRef: MutableRefObject<RealtimeChannel | undefined>;
};

export const GameChat = ({ runningGame, gameChannelRef }: PropTypes) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  const { address } = useAccount();

  useEffect(() => {
    if (!runningGame?.chat) return;
    console.log(runningGame.chat);
  }, [runningGame?.chat]);

  if (!runningGame) return null; // todo:

  const handleSendMessage = async () => {
    const newMessage: GameChatMessage = {
      player: address,
      time: "10:22",
      message,
    };

    const { error } = await supabase
      .from("running_games")
      .update({
        chat: [...runningGame.chat, newMessage],
      })
      .eq("uuid", runningGame.uuid);

    if (error) {
      console.log(error, "error");
      return;
    }

    setMessage("");
  };

  return (
    <motion.div
      className={styles.wrap}
      animate={{ width: isOpen ? 350 : 50 }}
      initial={false}
    >
      {isOpen ? (
        <>
          <div className={styles.header}>
            <p>Chat</p>
            <IoClose onClick={() => setIsOpen(false)} />
          </div>

          <div className={styles.content}>
            {runningGame.chat.map((message: GameChatMessage, index: number) => (
              <div
                key={index} // todo
                className={`${styles.messageWrap} ${
                  message.player === address && styles.sender
                }`}
              >
                {message.player !== address && (
                  <div
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 25,
                      background: "red",
                    }}
                  />
                )}

                <div
                  style={{ display: "flex", flexDirection: "column", flex: 1 }}
                >
                  {message.player !== address && (
                    <p>{`${message.player.slice(0, 5)}...${message.player.slice(
                      -4
                    )}`}</p>
                  )}
                  <p>{message.message}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.chatInputWrap}>
            <input
              value={message}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setMessage(e.target.value)
              }
            />
            <button
              className={message && styles.sendable}
              onClick={handleSendMessage}
            >
              <IoSendSharp />
            </button>
          </div>
        </>
      ) : (
        <IoChatbox
          className={styles.chatTrigger}
          onClick={() => setIsOpen(true)}
        />
      )}
    </motion.div>
  );
};

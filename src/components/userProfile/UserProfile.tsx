import { useMachine } from "@xstate/react";
import axios from "axios";
import * as React from "react";
import { useEffect } from "react";
import { assign, Machine } from "xstate";
import { PreferencesIcon } from "../../icons/Preferences";
import { IGitHubUser } from "./IGitHubUser";
import { IUserInfo, UserProfileSettings } from "./UserProfileSettings";

const loadProfile = async (username: string): Promise<IGitHubUser | null> => {
  return axios
    .get(`https://api.github.com/users/${username}`)
    .then(({ data }) => data)
    .catch(() => null);
};

interface Context {
  username: string;
  user: IGitHubUser;
}

const machine = Machine<Context>({
  initial: "idle",
  states: {
    idle: {
      on: {
        CONFIG: "config",
        SET_USER: {
          actions: assign({ user: (_, event) => event.value })
        }
      }
    },
    config: {
      on: {
        SET_USERNAME: {
          actions: assign({ username: (_, event) => event.value })
        },
        IDLE: "idle"
      }
    }
  }
});

export function UserProfile() {
  const [state, send] = useMachine(machine, {
    context: {
      username: JSON.parse(localStorage.getItem("dial/user/username") ?? `"singuerinc"`)
    }
  });

  useEffect(() => {
    if (state.context.username !== "") {
      loadProfile(state.context.username).then(user => {
        send({ type: "SET_USER", value: user });
      });
    }
  }, [state.context.username]);

  const handleClose = ({ username }: IUserInfo) => {
    send({ type: "SET_USERNAME", value: username });
    send({ type: "IDLE" });
  };
  const handleClick = () => window.open(state.context.user.url);
  const handleOnConfig = () => send("CONFIG");

  return (
    <div>
      {state.matches("config") && (
        <UserProfileSettings username={state.context.username} onClose={handleClose} />
      )}
      {state.matches("idle") && (
        <>
          <img
            src={state.context.user?.avatar_url}
            className="w-16 h-16 rounded-full"
            title={state.context.user?.name}
          />
          <h1 className="text-lg cursor-pointer" onClick={handleClick}>
            {state.context.user?.name}
          </h1>
          <h2 className="text-base">{state.context.user?.bio}</h2>
          <button
            className="w-6 h-6 stroke-current text-oc-gray-800 hover:text-oc-red-600"
            onClick={handleOnConfig}
          >
            <PreferencesIcon />
          </button>
        </>
      )}
    </div>
  );
}

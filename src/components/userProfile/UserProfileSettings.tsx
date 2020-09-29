import { useMachine } from "@xstate/react";
import * as React from "react";
import { assign, Machine } from "xstate";
import * as store from "store2";

export type IUserInfo = {
  username: string;
};

const machine = Machine<IUserInfo>(
  {
    initial: "idle",
    states: {
      idle: {
        on: {
          SAVE: { actions: ["save"] },
          USERNAME_UPDATE: { actions: ["updateUsername"] }
        }
      }
    }
  },
  {
    actions: {
      save: context => store.set("dial/user/username", context.username),
      updateUsername: assign({ username: (_, event) => event.value })
    }
  }
);

export type IProps = IUserInfo & {
  onClose: (info: IUserInfo) => void;
};

export function UserProfileSettings({ onClose, username }: IProps) {
  const [state, send] = useMachine(machine, {
    context: {
      username
    }
  });

  const handleOnClose = () => {
    send({ type: "SAVE" });
    onClose(({ username } = state.context));
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    send({ type: "USERNAME_UPDATE", value: event.target.value });

  return (
    <div className="settings">
      <h1>User</h1>
      <form>
        <h2>Username</h2>
        <input value={state.context.username} onChange={handleUsernameChange} />
      </form>
      <button onClick={handleOnClose}>Save</button>
    </div>
  );
}

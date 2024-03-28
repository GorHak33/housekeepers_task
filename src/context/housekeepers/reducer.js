import { CREATE_TASK, DELETE_TASK } from "./types";

const reducer = (state, action) => {
  switch (action.type) {
    case CREATE_TASK:
      const newState = { ...state };
      const newKeepers = [...newState.keepers];
      if (action.keeperId) {
        const index = newKeepers.findIndex(
          keeper => keeper.id === action.keeperId
        );
        newKeepers[index].tasks = [
          ...newKeepers[index].tasks,
          { ...action.payload },
        ];
      }
      localStorage.setItem(
        "housekeepersState",
        JSON.stringify(newState.keepers)
      );

      return newState;

    case DELETE_TASK:
      const updatedKeepers = state.keepers.map(keeper => {
        return {
          ...keeper,
          tasks: keeper.tasks.filter(task => task.taskId !== action.payload),
        };
      });
      console.log(updatedKeepers);
      localStorage.setItem("housekeepersState", JSON.stringify(updatedKeepers));
      return {
        ...state,
        keepers: updatedKeepers,
      };

    default:
      return state;
  }
};

export default reducer;

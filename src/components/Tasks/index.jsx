import { useContext } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import TaskDialog from "./components/TaskDialog";
import { HousekeepersContext } from "../../context/housekeepers/index";
import { generateTaskId } from "../../utils/index";
import { CREATE_TASK, DELETE_TASK } from "../../context/housekeepers/types";

function Tasks() {
  const { dispatch, state } = useContext(HousekeepersContext);
  const [openDialog, setOpenDialog] = useState(false);

  const onOpenDialog = () => {
    setOpenDialog({
      title: "",
      description: "",
    });
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleChange = ({ target }) => {
    setOpenDialog({
      ...openDialog,
      [target.name]: target.value,
    });
  };

  const onSave = duration => {
    const newTask = {
      title: openDialog.title,
      description: openDialog.description,
      time: `${openDialog.startTime}-${openDialog.endTime}`,
      duration: duration ? duration : undefined,
      taskId: generateTaskId(),
    };

    dispatch({
      type: CREATE_TASK,
      payload: newTask,
      keeperId: openDialog.keeperId,
    });
  };
  const handleDelete = id => {
    console.log(id);
    dispatch({
      type: DELETE_TASK,
      payload: id,
    });
  };
  console.log(state);
  return (
    <>
      <Typography variant="h4" align="center" sx={{ mb: 4 }}>
        TASKS
      </Typography>
      <Button
        variant="contained"
        onClick={onOpenDialog}
        sx={{ margin: "0 auto" }}
      >
        Create Task
      </Button>

      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Housekeepers
      </Typography>
      <Grid container spacing={3} alignItems="stretch">
        {state.keepers.map(keeper => (
          <Grid key={keeper.id} item xs={12} sm={6} md={3} lg={2}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ textAlign: "center" }}
                >
                  {keeper?.fullName}
                </Typography>
                {keeper?.tasks?.map(task => (
                  <Card key={task?.taskId} sx={{ mt: 2 }}>
                    <CardContent>
                      <Typography variant="body1" gutterBottom>
                        {task.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {task.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ mt: 1 }}
                      >
                        Duration: {task.time}
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{ mt: 2 }}
                        onClick={() => handleDelete(task.taskId)}
                      >
                        Delete
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {openDialog && (
        <TaskDialog
          handleChange={handleChange}
          open={!!openDialog}
          handleClose={handleClose}
          data={openDialog}
          setOpenDialog={setOpenDialog}
          onSave={onSave}
        />
      )}
    </>
  );
}

export default Tasks;

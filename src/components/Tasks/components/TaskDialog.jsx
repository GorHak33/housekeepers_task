import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useMemo } from "react";
import { HousekeepersContext } from "../../../context/housekeepers";

import { times } from "../../../constants";
import {
  filterKeepersWithoutAssignment,
  sortKeepersByWorkload,
  calculateDuration,
} from "../../../utils";
import { Typography } from "@mui/material";

export default function TaskDialog({
  open,
  handleClose,
  handleChange,
  onSave,
  data,
  setOpenDialog,
}) {
  const { dispatch, state } = useContext(HousekeepersContext);

  const countDuration = () => {
    if (data.startTime && data.endTime) {
      const result = calculateDuration(data.startTime, data.endTime);
      return `${result.hours ? result.hours + " hours" : ""} 
      ${result.minutes ? result.minutes + " minutes" : ""}`;
    } else {
      return "";
    }
  };

  const getHousekeepers = useMemo(() => {
    let keepers = state.keepers;

    if (data.startTime && data.endTime) {
      keepers = filterKeepersWithoutAssignment(
        state.keepers,
        data.startTime,
        data.endTime
      );
    }

    return (
      <Grid item xs={12}>
        <Typography variant="subtitle1">Choose Housekeeper</Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={data.keeperId ? data.keeperId : ""}
          label="Housekeepers"
          name="keeperId"
          fullWidth
          onChange={handleChange}
        >
          <MenuItem value="">None</MenuItem>
          {sortKeepersByWorkload(keepers).map(el => (
            <MenuItem key={el.id} value={el.id}>
              {el.fullName} - {`busy ${el.totalDuration} hours`}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    );
  }, [data]);

  const handleSubmit = () => {
    let duration;
    if ((data.startTime, data.endTime)) {
      const res = calculateDuration(data.startTime, data.endTime);
      duration = res.hours + (res.minutes ? 0.5 : 0);
    }
    onSave(duration);
    setOpenDialog(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ textAlign: "center" }}>Task</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ padding: "10px" }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="description"
                  onChange={handleChange}
                  value={data.description}
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle1">
                  Choose task start time
                </Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={data.startTime}
                  label="Start time"
                  name="startTime"
                  fullWidth
                  onChange={handleChange}
                >
                  {times.map(el => (
                    <MenuItem value={el}>{el}</MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="subtitle1">
                  Choose task end time
                </Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={data.endTime}
                  label="End time"
                  name="endTime"
                  fullWidth
                  onChange={handleChange}
                >
                  {times.map(el => (
                    <MenuItem value={el}>{el}</MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={12}>
                Duration: {countDuration()}
              </Grid>
              {getHousekeepers}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

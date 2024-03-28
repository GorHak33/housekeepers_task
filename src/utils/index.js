export function filterKeepersWithoutAssignment(keepers, startTime, endTime) {
  return keepers.filter(keeper => {
    for (const task of keeper.tasks) {
      const [taskStart, taskEnd] = task.time.split('-');
      const taskStartTime = new Date(`2000-01-01T${taskStart}`);
      const taskEndTime = new Date(`2000-01-01T${taskEnd}`);
      const filterStartTime = new Date(`2000-01-01T${startTime}`);
      const filterEndTime = new Date(`2000-01-01T${endTime}`);
      if ((taskStartTime <= filterStartTime && taskEndTime > filterStartTime) ||
        (taskStartTime < filterEndTime && taskEndTime >= filterEndTime) ||
        (taskStartTime >= filterStartTime && taskEndTime <= filterEndTime)) {
        return false;
      }
    }
    return true;
  });
}

export function sortKeepersByWorkload(keepers) {
  // Calculate total duration of tasks for each keeper
  const keepersWithWorkload = keepers.map(keeper => {
    const totalDuration = keeper.tasks.reduce((acc, task) => acc + task.duration, 0);
    return { ...keeper, totalDuration };
  });

  // Sort keepers by total duration (least busy first)
  keepersWithWorkload.sort((a, b) => a.totalDuration - b.totalDuration);

  return keepersWithWorkload;
}

export function calculateDuration(startTime, endTime) {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const totalStartMinutes = startHour * 60 + startMinute;
  const totalEndMinutes = endHour * 60 + endMinute;

  const durationInMinutes = totalEndMinutes - totalStartMinutes;

  const durationHours = Math.floor(durationInMinutes / 60);
  const durationMinutes = durationInMinutes % 60;

  return { hours: durationHours, minutes: durationMinutes };
}


export function generateTaskId() {
  const randomNumber = Math.random().toString(36).substr(2, 9);
  const timestamp = Date.now().toString(36);
  const uniqueId = timestamp + '-' + randomNumber;
  return uniqueId;
}

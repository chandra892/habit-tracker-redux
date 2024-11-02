import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../store/store'
import { Box, Button, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import { Habit, toggleHabit } from "../store/habit-slice";
import { removeHabit } from "../store/habit-slice";


const HabitList: React.FC = () => {
    const habits = useSelector((state: RootState) => state.habits.habits);
    const dispatch = useDispatch<AppDispatch>();
    const today = new Date().toISOString().split("T")[0]; // Ensure correct date format

    const getStreak = (habit: Habit) => {
        let streak = 0;
        const currentDate = new Date();

        while (true) {
            const dateString = currentDate.toISOString().split("T")[0];
            if (habit.completedDates.includes(dateString)) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else {
                break;
            }
        }

        return streak;
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
            {habits.map((habit) => {
                const isCompletedToday = habit.completedDates.includes(today);
                const streak = getStreak(habit); // Calculate streak based on current state

                return (
                    <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
                        <Grid container alignItems="center">
                            <Grid xs={12} sm={6}>
                                <Typography variant="h6">{habit.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {habit.frequency.charAt(0).toUpperCase() +
                                        habit.frequency.slice(1)}
                                </Typography>
                            </Grid>

                            <Grid xs={12} sm={6}>
                                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                                    <Button
                                        variant="outlined"
                                        color={isCompletedToday ? "success" : "primary"}
                                        startIcon={<CheckCircleIcon />}
                                        onClick={() => {
                                            dispatch(toggleHabit({ id: habit.id, date: today }));
                                        }}
                                    >
                                        {isCompletedToday ? "Completed" : "Mark Complete"}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => dispatch(removeHabit(habit.id))}
                                        startIcon={<DeleteIcon />}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2">
                                Current Streak: {streak} days
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={(streak / 30) * 100}
                                sx={{ mt: 1 }}
                            />
                        </Box>
                    </Paper>
                );
            })}
        </Box>
    );
};

export default HabitList;
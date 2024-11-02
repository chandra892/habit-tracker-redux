import { Container, Typography } from "@mui/material"
import AddHabitForm from "./components/AddHabitForm"
import HabitList from "./components/HabitList"
import HabitStats from "./components/HabitStats"

function App() {
  return (
    <Container maxWidth="md">
      <Typography component="h1" variant="h2" align="center">
        Habit Tacker
      </Typography>
      <AddHabitForm />
      <HabitList/>
      <HabitStats />
    </Container>

  )
}

export default App
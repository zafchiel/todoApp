import { Modal, Box, Button } from "@mui/material"
import { useEffect, useState } from "react"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 300,
  bgcolor: "#fdf5df",
  boxShadow: 24,
  p: 3,
}

function ListItem({ task, deleteTask, selectTask }) {
  const [modalOpened, setModalOpened] = useState(false)

  return (
    <div className="flex gap-5 w-50 justify-between items-center">
      <div onClick={() => selectTask(task.id)} className="h-15 b-1">
        {task.task}
      </div>
      <div
        className="i-mdi:trash-can-outline text-3xl cursor-pointer"
        onClick={() => setModalOpened(true)}
      ></div>
      <Modal open={modalOpened} onClose={() => setModalOpened(false)}>
        <Box sx={style}>
          <div className="flex flex-col gap-3">
            <h3>Delete:</h3>
            <p>{task.task}</p>
            <div className="flex justify-between">
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  deleteTask(task.id)
                  setModalOpened(false)
                }}
              >
                Delete
              </Button>
              <Button variant="outlined" onClick={() => setModalOpened(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default ListItem

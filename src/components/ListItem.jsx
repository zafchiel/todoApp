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
    <>
      <div
        onClick={() => selectTask(task.id)}
        className="cursor-pointer p-5 bg-#FDF0DF rounded-lg w-100% flex gap-5 justify-between items-center"
      >
        <div className="font-bold">{task.task}</div>
        <div
          className="i-mdi:trash-can-outline text-3xl cursor-pointer"
          onClick={() => setModalOpened(true)}
        ></div>
      </div>
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
    </>
  )
}

export default ListItem

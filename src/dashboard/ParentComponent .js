// import React, { useState } from "react";
// import { Button } from "@mui/material";
// import CreateUser from "./CreateUser"; // Adjust the path as needed

// const ParentComponent = () => {
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       {/* This button triggers the CreateUser dialog */}
//       <Button
//         variant="contained"
//         color="primary"
//         style={{
//           backgroundColor: "#c7253e",
//           color: "#ffffff",
//           position: "fixed",
//           top: 20,
//           right: 20,
//           zIndex: 1000,
//         }}
//         onClick={handleOpen}
//       >
//         Create New User
//       </Button>

//       {/* CreateUser dialog */}
//       <CreateUser open={open} onClose={handleClose} />
//     </div>
//   );
// };

// export default ParentComponent;

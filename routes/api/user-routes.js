const router = require("express").Router();

const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controllers");

router.route("/").get().post();

router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

router.route("/:id/friends/:friendId").post(addFriend).delete(deleteFriend);

router.route("/").get(getAllUser).post(createUser);

module.exports = router;

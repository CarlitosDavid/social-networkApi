const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      match: [/.+@.+\..+/],
      required: true,
    },

    thoughts: {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },

    friends: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const User = model("User", UserSchema);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

module.exports = User;

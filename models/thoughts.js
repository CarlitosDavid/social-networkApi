const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const thoughtSchema = new Schema(
  {
    toughtText: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: {
      type: String,
      required: true,
      enum: ["Like", "Dislike", "Angry", "Sick", "Confused"],
      default: "",
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false,
  }
);

// get total count of comments and replies on retrieval
thoughtSchema.virtual("reactionCount").get(function () {
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length + 1,
    0
  );
});

const thoughts = model("Thoughts", thoughtSchema);

module.exports = thoughts;

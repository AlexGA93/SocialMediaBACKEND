//Bring in express Router
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
//models
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route POST api/posts
//@desc Create a post
//@access Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.body.user,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
//@route PUT api/posts/like/:id
//@desc Like a post
//@access Private
router.put("/like/:id", auth, async (req, res) => {
  //technycally it's updating a post by it ID
  try {
    //Post model array
    const post = await Post.findById(req.params.id);

    //check if the post has been already liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).lenght > //si la long del vector en post.likes (el cual se ha comparado su longitud con la del user logueado) es >0
      0
    ) {
      return res.status(404).json({ msg: "Post already liked" });
    }
    //console.log(post);
    post.likes.unshift({ user: req.user.id }); //adds new items to the beginning of an array
    await post.save();
    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has not yet been liked
    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }

    // remove the like
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//@route GET api/posts
//@desc Get all posts
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    //Extract Posts sorted by date
    const posts = await Post.find(req.params.id).sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route GET api/posts/:id
//@desc Get post by ID
//@access Private

router.get("/:id", auth, async (req, res) => {
  try {
    //Extract post by it Id
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);

    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(500).send("Server Error");
  }
});

//@route DELETE api/posts/:id
//@desc Delete a post by it ID
//@access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    //extract post to delete it
    const post = await Post.findById(req.params.id);
    //check user
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    //remove post
    await post.remove();
    res.json({ msg: "Post Removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route POST api/posts/comment/:id
//@desc Comment on a post
//@access Private
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.body.user,
      };

      post.comments.unshift(newComment);
      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route DELETE api/posts/comment/:id/:comment_id
//@desc Delete a post's comment by their Id
//@access Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    //get post by it id
    const post = await Post.findById(req.params.id);
    //get the comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    ); //comment if exists or false

    //make sure comments exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exists" });
    }

    //Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    //Get remove index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);
    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//exports
module.exports = router;

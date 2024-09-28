const threadModel = require("../models/thread");
const snippetModel = require("../models/snippet");

exports.postThread = async (req, res) => {
  let data = {
    author: req.body.author,
    contents: req.body.contents,
  };
  let message = "Post Created";
  let isPost = true;

  // Add reply/comment attributes
  if ("depth" in req.body) {
    isPost = false;
    data.depth = req.body.depth;
    message = "Reply Created";
    if (!"postId" in req.body || !"parentId" in req.body){
      res.status(500).json({
        message: "Error",
        data: "Reply does not have parent ID or post ID",
      });
    }
    data.postId = req.body.postId;
    data.parentId = req.body.parentId;
  }

  // Add post status
  if ("status" in req.body){
    data.status = req.body.status;
  }

  // Add snippets
  if ("snippets" in req.body){
    try {
      const snippets = await snippetModel.insertMany(req.body.snippets);
      data.snippets = snippets.map(snippet => snippet._id);
    } catch (error) {
      res.status(500).json({
        message: "Error",
        data: error,
      });
    }
  }

  try {
    const thread = await new threadModel(data).save();
  
    if (isPost){
      const newPost = await threadModel.findOneAndUpdate(
        { "_id": thread._id },
        { $set: {"postId": thread._id} },
        { new: true }
      )
      res.json({
        message,
        data: newPost,
      });
    }
    else{
      res.json({
        message,
        data: thread,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error",
      data: error,
    });
  }
};

// GET All Posts (without the comment & reply)
exports.getThreads = async (req, res) => {
  try {
    const datas = await threadModel.find({parentId: null})
      .sort({time: 1}).lean()
      .populate('author')
      .populate('snippets')
      .exec();
    
    res.status(200).json({
      message: "All Posts Retrieved",
      data: datas
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      data: error,
    });
  }
};

// GET One Thread by ID and all its comment & replies
exports.findThread = async (req, res) => {
  const queryId = req.params.id;
  console.log(queryId);
  
  try {
    const datas = await threadModel.find({postId: queryId})
      .sort({time: 1}).lean()
      .populate('author')
      .populate('snippets')
      .exec();
    
    res.status(200).json({
      message: "Post Detail Retrieved",
      data: datas
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
      data: error,
    });
  }
};
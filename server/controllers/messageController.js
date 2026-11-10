import Message from '../models/Message.js';
import User from '../models/User.js';

// @desc    Get messages for a conversation room
// @route   GET /api/messages/room/:roomId
// @access  Private
export const getMessagesByRoom = async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await Message.find({ roomId })
      .populate('sender', 'name email avatar')
      .populate('recipient', 'name email avatar')
      .sort({ createdAt: 1 });

    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
export const sendMessage = async (req, res) => {
  try {
    const { recipientId, projectId, content, fileAttachment } = req.body;

    if (!recipientId || !content) {
      return res.status(400).json({ success: false, message: 'Recipient and content are required' });
    }

    // Room ID is sorted combination of user IDs
    const userIds = [req.user._id.toString(), recipientId.toString()].sort();
    const roomId = projectId ? `${userIds[0]}_${userIds[1]}_${projectId}` : `${userIds[0]}_${userIds[1]}`;

    const message = await Message.create({
      sender: req.user._id,
      recipient: recipientId,
      project: projectId || null,
      roomId,
      content,
      fileAttachment: fileAttachment || { url: '', fileName: '' },
    });

    const populated = await Message.findById(message._id)
      .populate('sender', 'name email avatar')
      .populate('recipient', 'name email avatar');

    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

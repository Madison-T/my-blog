import { TaskItem as BaseTaskItem } from "@tiptap/extension-task-item"

export const TaskItem = BaseTaskItem.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      "li",
      HTMLAttributes,
      [
        "label",
        { contenteditable: "false" },
        ["input", { type: "checkbox" }],
        ["span"],
      ],
      ["div", 0],
    ]
  },
})

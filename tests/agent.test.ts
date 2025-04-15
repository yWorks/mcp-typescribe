import { graph } from "../src/index.js";
import { BaseMessage, isAIMessage } from "@langchain/core/messages";
import { describe, expect, it } from "vitest";

describe("agent", () => {
  it("Basic run", async () => {
    const res = await graph.invoke({
      messages: [
        {
          role: "user",
          content: "Which interface is used for tasks?",
        },
      ],
    });
    expect(
      res.messages.find(
        (message: BaseMessage) =>
          isAIMessage(message) && message._getType() === "tool",
      ),
    ).toBeDefined();
  });
});

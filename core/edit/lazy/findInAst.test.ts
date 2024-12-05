// Generated by continue

import { findInAst } from "./findInAst";
import Parser from "web-tree-sitter";

describe("findInAst", () => {
  it("should find a node matching the criterion", () => {
    const mockAst = createMockSyntaxNode("root", [
      createMockSyntaxNode("child1", []),
      createMockSyntaxNode("function", [createMockSyntaxNode("child2", [])]),
    ]);

    const criterion = (node: Parser.SyntaxNode) => node.type === "function";

    const result = findInAst(mockAst, criterion);

    expect(result).not.toBeNull();
    expect(result!.type).toBe("function");
  });

  it("should return null if no node matches the criterion", () => {
    const mockAst = createMockSyntaxNode("root", [
      createMockSyntaxNode("child1", []),
      createMockSyntaxNode("child2", []),
    ]);

    const criterion = (node: Parser.SyntaxNode) => node.type === "function";

    const result = findInAst(mockAst, criterion);

    expect(result).toBeNull();
  });

  it("should find a nested node matching the criterion", () => {
    const mockAst = createMockSyntaxNode("root", [
      createMockSyntaxNode("child1", [
        createMockSyntaxNode("child2", [createMockSyntaxNode("function", [])]),
      ]),
      createMockSyntaxNode("child3", []),
    ]);

    const criterion = (node: Parser.SyntaxNode) => node.type === "function";

    const result = findInAst(mockAst, criterion);

    expect(result).not.toBeNull();
    expect(result!.type).toBe("function");
  });

  it("should return the first node matching the criterion in depth-first traversal", () => {
    const firstFunctionNode = createMockSyntaxNode("function", []);
    const secondFunctionNode = createMockSyntaxNode("function", []);
    const mockAst = createMockSyntaxNode("root", [
      firstFunctionNode, // First function node
      createMockSyntaxNode("child1", [
        secondFunctionNode, // Second function node
      ]),
    ]);

    const criterion = (node: Parser.SyntaxNode) => node.type === "function";

    const result = findInAst(mockAst, criterion);

    expect(result).not.toBeNull();
    expect(result!.type).toBe("function");
    expect(JSON.stringify(result)).toBe(JSON.stringify(firstFunctionNode)); // Ensure it's the first function node
  });

  it("should return the root node if it matches the criterion", () => {
    const mockAst = createMockSyntaxNode("function", [
      createMockSyntaxNode("child1", []),
      createMockSyntaxNode("child2", []),
    ]);

    const criterion = (node: Parser.SyntaxNode) => node.type === "function";

    const result = findInAst(mockAst, criterion);

    expect(result).not.toBeNull();
    expect(result!.type).toBe("function");
    expect(result).toBe(mockAst);
  });

  it("should return null when searching an empty tree", () => {
    const mockAst = createMockSyntaxNode("root", []);

    const criterion = (node: Parser.SyntaxNode) => node.type === "function";

    const result = findInAst(mockAst, criterion);

    expect(result).toBeNull();
  });
});

function createMockSyntaxNode(
  type: string,
  children: Parser.SyntaxNode[],
): Parser.SyntaxNode {
  // Define minimal properties of SyntaxNode required for the test
  const node: Partial<Parser.SyntaxNode> = {
    type,
    children,
    childCount: children.length,
    child: (index: number) => {
      return children[index] || null;
    },
  };
  return node as Parser.SyntaxNode;
}
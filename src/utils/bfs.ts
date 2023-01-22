import { FamilyMember } from "../interfaces/app.interface";

const bfs = (
  id: string | null,
  familyTree: FamilyMember,
  newTree: FamilyMember
) => {
  const queue: any = [];

  queue.unshift(familyTree);

  while (queue.length > 0) {
    const curNode = queue.pop();

    if (curNode.id === id) {
      curNode.children.push(newTree);

      return { ...familyTree };
    }

    const len = curNode.children.length;

    for (let i = 0; i < len; i++) {
      queue.unshift(curNode.children[i]);
    }
  }
};

export default bfs; 
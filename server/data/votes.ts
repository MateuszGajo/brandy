import { ObjectId } from "mongodb";

export default (userIds: string[], activitesIds: string[]) => {
  const votes: { user: ObjectId; activity: ObjectId; type: "up" | "down" }[] =
    [];
  activitesIds.map((activityId, index) => {
    userIds.map((userId) => {
      const random = Math.min(
        2,
        Math.random() * ((3 * index) / activitesIds.length)
      );
      const letter = random < 0.9 ? "a" : random > 1.1 ? "b" : "c";
      let type: "up" | "down" = "up";
      if (letter === "c") return;
      if (letter === "b") type = "down";
      const vote = {
        user: new ObjectId(userId),
        activity: new ObjectId(activityId),
        type,
      };
      votes.push(vote);
    });
  });
  return votes;
};

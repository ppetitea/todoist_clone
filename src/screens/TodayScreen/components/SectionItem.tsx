import React from "react";
import Container from "../../../components/Container";
import Divider from "../../../components/Divider";
import TodoItem from "./TodoItem";
import Task from "../../../models/Task";

const SectionItem = React.memo((props: any) => {
  const { item }: { item: Task } = props;
  return (
    <Container>
      <TodoItem
        id={item.id}
        title={item.title}
        deadline={item.deadline}
        projectLabel={item.projectLabel}
      />
      <Divider style={{ marginLeft: 50 }} />
    </Container>
  );
}, areEqual);

function areEqual(prevProps: any, nextProps: any) {
  if (prevProps.item.title !== nextProps.item.title) return false;
  if (prevProps.item.deadline !== nextProps.item.deadline) return false;
  if (prevProps.item.projectId !== nextProps.item.projectId) return false;
  return true;
}

export { SectionItem };
export default SectionItem;

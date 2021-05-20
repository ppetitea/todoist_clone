import React from "react";
import Container from "../../../components/Container";
import { useTheme } from "../../../navigation/hooks/ThemeContext";
import Typo from "../../../components/Typo";
import Button from "../../../components/Button";
import Divider from "../../../components/Divider";
import { IDayTaskSection } from "../../../hooks/useCalendarOfTasks";

export interface ISection extends IDayTaskSection {
  rightButtonTitle?: string;
  onPressRightButton?: () => void;
}

const SectionHeader = React.memo((props: any) => {
  const { section }: { section: ISection } = props;
  const theme = useTheme();
  const empty = section.data.length === 0;
  return (
    <Container style={{ backgroundColor: theme.surface0 }}>
      <Container row alignCenter spaceBetween fullWidth style={{ height: 60 }}>
        <Typo h4 bold style={{ color: empty ? theme.text3 : theme.text1 }}>
          {section.title}
        </Typo>
        {section.rightButtonTitle ? (
          <Button
            type="clear"
            title={section.rightButtonTitle}
            onPress={section.onPressRightButton}
            titleStyle={{ letterSpacing: 0.2 }}
          />
        ) : null}
      </Container>
      <Divider />
    </Container>
  );
}, areEqual);

function areEqual(prevProps: any, nextProps: any) {
  if (prevProps.section.title === nextProps.section.title) {
    return true;
  } else return false;
}

export { SectionHeader };
export default SectionHeader;

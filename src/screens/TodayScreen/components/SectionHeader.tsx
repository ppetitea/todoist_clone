import React from "react";
import Container from "../../../components/Container";
import { useTheme } from "../../../navigation/hooks/ThemeContext";
import Typo from "../../../components/Typo";
import Button from "../../../components/Button";
import Divider from "../../../components/Divider";
import { IDayTaskSection } from "../../../hooks/useCalendarOfTasks";
import { TouchableOpacity } from "react-native";
import { IMomentHook } from "../../../hooks/useMoment";
import { moment } from "../../../services";

export interface ISection extends IDayTaskSection {
  rightButtonTitle?: string;
  onPressRightButton?: () => void;
}
export interface SectionHeaderProps {
  section: ISection;
  datePicker: IMomentHook;
}

const SectionHeader = React.memo((props: SectionHeaderProps) => {
  const { section, datePicker } = props;
  const theme = useTheme();
  const empty = section.data.length === 0;
  return (
    <TouchableOpacity onPress={() => datePicker.setValue(moment(section.date))}>
      <Container style={{ backgroundColor: theme.surface0 }}>
        <Container
          row
          alignCenter
          spaceBetween
          fullWidth
          style={{ height: 60 }}
        >
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
    </TouchableOpacity>
  );
}, areEqual);

function areEqual(prevProps: any, nextProps: any) {
  if (prevProps.section.title === nextProps.section.title) {
    return true;
  } else return false;
}

export { SectionHeader };
export default SectionHeader;

import React, { useEffect, useState } from "react";
import { ButtonProps, Icon } from "react-native-elements";
import { useTheme } from "../../../navigation/hooks/ThemeContext";
import Button from "../../../components/Button";

export interface TagButtonProps extends ButtonProps {
  titleColor?: string;
  iconColor: string;
  title: string;
  iconName: string;
}

const TagButton = (props: TagButtonProps) => {
  const { title, titleColor, iconName, iconColor } = props;
  const theme = useTheme();

  return (
    <Button
      title={title}
      icon={
        <Icon
          name={iconName}
          size={18}
          style={{ marginRight: 5 }}
          color={iconColor}
        />
      }
      buttonStyle={{
        height: 36,
		borderRadius: 10,
        borderColor: theme.border,
        marginRight: 10,
      }}
      titleStyle={{
        color: titleColor ?? theme.text2,
        letterSpacing: 0.2,
        fontWeight: "300",
      }}
      type="outline"
    />
  );
};

export default TagButton;

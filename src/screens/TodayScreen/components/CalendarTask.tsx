// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { SectionList } from "react-native";
// import { useTheme } from "../../../navigation/hooks/ThemeContext";
// import { moment } from "../../../services";
// import Task, { ITask } from "../../../models/Task";
// import SectionHeader, {
//   ISection,
//   SectionHeaderProps,
// } from "../components/SectionHeader";
// import SectionItem from "../components/SectionItem";
// import { IDateSelector } from "../hooks/useDateSelector";

// interface CalendarTaskProps {
//   dateSelector: IDateSelector;
// }

// const CalendarTask = (props: CalendarTaskProps) => {
//   const { dateSelector } = props;
//   const theme = useTheme();
//   const sectionListRef = useRef(null);

//   //   useEffect(() => {
//   //     if (sectionListRef.current) {
//   //       const searchedId = datePicker.value.toString();
//   //       const findSectionIndex = (section: ISection) => section.id === searchedId;
//   //       const index = sections.list.findIndex(findSectionIndex);
//   //       if (index >= 0) {
//   //         //@ts-ignore
//   //         sectionListRef.current.scrollToLocation({
//   //           sectionIndex: index,
//   //           itemIndex: 0,
//   //         });
//   //       } else {
//   //         //@ts-ignore
//   //         sectionListRef.current.scrollToLocation({
//   //           sectionIndex: 0,
//   //           itemIndex: 0,
//   //         });
//   //       }
//   //     }
//   //   }, [datePicker.value]);

//   //   type renderHeaderProps = Omit<SectionHeaderProps, "datePicker">;
//   //   const renderSectionHeader = useCallback(
//   //     ({ section }: renderHeaderProps) => (
//   //       <SectionHeader section={section} datePicker={datePicker} />
//   //     ),
//   //     [theme]
//   //   );
//   //   const renderItem = useCallback(
//   //     ({ item }: { item: Task }) => <SectionItem item={item} />,
//   //     []
//   //   );
//   //   const extractKey = useCallback((item) => item.id, []);

//   //   const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
//   //     const selectedDate = moment(viewableItems[0]?.item?.date);
//   //     viewableItems.map((view: any) => {
//   //       console.log({ ...view, data: [], section: [] });
//   //     });
//   //     // console.log({ ...viewableItems, data: [] });
//   //     // if (selectedDate) {
//   //     //   datePicker.setValue(selectedDate);
//   //     // }
//   //   }, []);

//   return (
//     <SectionList
//       ref={sectionListRef}
//       sections={sections.list}
//       keyExtractor={extractKey}
//       renderItem={renderItem}
//       renderSectionHeader={renderSectionHeader}
//       stickySectionHeadersEnabled={true}
//       removeClippedSubviews={true}
//       onViewableItemsChanged={onViewableItemsChanged}
//     />
//   );
// };

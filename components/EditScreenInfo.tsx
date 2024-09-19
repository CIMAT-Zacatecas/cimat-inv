import React from "react";
import { StyleSheet } from "react-native";

import { ExternalLink } from "./ExternalLink";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

import Colors from "@/constants/Colors";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from "./ui/actionsheet";
import { Button, ButtonText } from "./ui/button";

export default function EditScreenInfo({ path }: { path: string }) {
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const handleClose = () => setShowActionsheet(false);

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text style={styles.getStartedText} lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">
          Open up the code for this screen:
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)">
          <MonoText>{path}</MonoText>
        </View>

        <Text style={styles.getStartedText} lightColor="rgba(0,0,0,0.8)" darkColor="rgba(255,255,255,0.8)">
          Change any of the text, save the file, and your app will automatically update.
        </Text>
      </View>

      <View style={styles.helpContainer}>
        <ExternalLink
          style={styles.helpLink}
          href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet">
          <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
            Tap here if your app doesn't automatically update after making changes
          </Text>
        </ExternalLink>
      </View>

      <View style={{ padding: 16 }}>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Note: </Text>
          This file is a placeholder for your own code. It will not be present in the final application.
        </Text>
      </View>
      <View style={{ padding: 16, alignSelf: "center" }}>
        <Text style={{ fontWeight: "bold" }}>salu2</Text>
      </View>
      <View>
        <Button onPress={() => setShowActionsheet(true)}>
          <ButtonText>Open Actionsheet</ButtonText>
        </Button>
        <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
          <ActionsheetBackdrop />
          <ActionsheetContent>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            <ActionsheetItem onPress={handleClose}>
              <ActionsheetItemText>Edit Message</ActionsheetItemText>
            </ActionsheetItem>
            <ActionsheetItem onPress={handleClose}>
              <ActionsheetItemText>Mark Unread</ActionsheetItemText>
            </ActionsheetItem>
            <ActionsheetItem onPress={handleClose}>
              <ActionsheetItemText>Remind Me</ActionsheetItemText>
            </ActionsheetItem>
            <ActionsheetItem onPress={handleClose}>
              <ActionsheetItemText>Add to Saved Items</ActionsheetItemText>
            </ActionsheetItem>
            <ActionsheetItem isDisabled onPress={handleClose}>
              <ActionsheetItemText>Delete</ActionsheetItemText>
            </ActionsheetItem>
          </ActionsheetContent>
        </Actionsheet>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
});

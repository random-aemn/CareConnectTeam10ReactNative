import { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, findNodeHandle, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from "react-native";

import { AppButton } from "@/components/app-button";
import { BottomNav } from "@/components/bottom-nav";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { colors, spacing } from "@/theme";

const providers = [
  { name: "Dr. Sarah Chen", specialty: "Primary Care" },
  { name: "Dr. Marcus Webb", specialty: "Cardiology" },
  { name: "Dr. Priya Nair", specialty: "Endocrinology" },
] as const;

type Message = { id: number; sender: "provider" | "patient"; text: string; time: string };
type Thread = { id: string; provider: (typeof providers)[number]; preview: string; time: string; unread: boolean; messages: Message[] };

const initialThreads: Thread[] = [
  { id: "chen", provider: providers[0], preview: "Your lab results look good. Let us know if you have any questions.", time: "Today", unread: true, messages: [{ id: 1, sender: "provider", text: "Your lab results look good. Let us know if you have any questions.", time: "Today, 9:18 AM" }] },
  { id: "webb", provider: providers[1], preview: "Please remember to track your blood pressure before our visit.", time: "Yesterday", unread: false, messages: [{ id: 2, sender: "provider", text: "Please remember to track your blood pressure before our visit.", time: "Yesterday, 3:42 PM" }] },
];

export default function InboxScreen() {
  const [threads, setThreads] = useState(initialThreads);
  const [activeThread, setActiveThread] = useState<Thread | null>(null);
  const [newMessageVisible, setNewMessageVisible] = useState(false);
  const { width, height } = useWindowDimensions();
  const wide = width >= 700 || width > height;

  function updateThread(updatedThread: Thread) {
    setThreads((currentThreads) => currentThreads.map((thread) => thread.id === updatedThread.id ? updatedThread : thread));
    setActiveThread(updatedThread);
  }

  function createThread(provider: (typeof providers)[number], text: string) {
    const message: Message = { id: Date.now(), sender: "patient", text, time: "Just now" };
    const thread: Thread = { id: `${provider.name}-${Date.now()}`, provider, preview: text, time: "Just now", unread: false, messages: [message] };
    setThreads((currentThreads) => [thread, ...currentThreads]);
    setNewMessageVisible(false);
    setActiveThread(thread);
  }

  return (
    <View style={styles.screen}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={[styles.content, wide && styles.wideContent]}>
        <View style={[styles.titleRow, wide && styles.wideTitleRow]}>
          <View style={styles.flex}><Text selectable accessibilityRole="header" style={styles.title}>Inbox</Text><Text selectable style={styles.subtitle}>Messages with your care team</Text></View>
          <AppButton label="New message" icon={<Text accessible={false} style={styles.buttonIcon}>＋</Text>} onPress={() => setNewMessageVisible(true)} accessibilityLabel="Create a new message" accessibilityHint="Opens the new message form" />
        </View>
        <View style={[styles.threadList, wide && styles.wideThreadList]}>
        {threads.map((thread) => (
          <Pressable key={thread.id} accessible onPress={() => setActiveThread(thread)} style={({ pressed }) => [styles.threadCard, wide && styles.wideThreadCard, pressed && styles.pressed]} accessibilityRole="button" accessibilityLabel={`Open conversation with ${thread.provider.name}`} accessibilityHint="Opens this conversation" accessibilityValue={{ text: `${thread.unread ? "Unread. " : ""}${thread.provider.specialty}. ${thread.preview}. ${thread.time}` }}>
            <View accessible={false} importantForAccessibility="no-hide-descendants" style={styles.avatar}><Text style={styles.avatarText}>{thread.provider.name.split(" ").slice(-2).map((part) => part[0]).join("")}</Text></View>
            <View style={styles.threadBody}>
              <View style={styles.threadHeader}><Text selectable style={styles.provider}>{thread.provider.name}</Text><Text selectable style={styles.time}>{thread.time}</Text></View>
              <Text selectable style={styles.specialty}>{thread.provider.specialty}</Text>
              <Text selectable numberOfLines={2} style={styles.preview}>{thread.preview}</Text>
            </View>
            {thread.unread ? <View accessible={false} importantForAccessibility="no" style={styles.unreadDot} /> : null}
          </Pressable>
        ))}
        </View>
        <View style={styles.emptyHint}><Text selectable style={styles.emptyHintTitle}>Need help from another provider?</Text><Text selectable style={styles.emptyHintText}>Start a new conversation and your care team will respond here.</Text></View>
      </ScrollView>
      <BottomNav />
      <ThreadModal thread={activeThread} wide={wide} onClose={() => setActiveThread(null)} onUpdate={updateThread} />
      <NewMessageModal visible={newMessageVisible} wide={wide} onClose={() => setNewMessageVisible(false)} onSend={createThread} />
    </View>
  );
}

function ThreadModal({ thread, wide, onClose, onUpdate }: { thread: Thread | null; wide: boolean; onClose: () => void; onUpdate: (thread: Thread) => void }) {
  const [reply, setReply] = useState("");
  const reducedMotion = useReducedMotion();
  const titleRef = useRef<Text>(null);

  useEffect(() => {
    if (!thread) return;
    const timer = setTimeout(() => {
      const node = findNodeHandle(titleRef.current);
      if (node) AccessibilityInfo.setAccessibilityFocus(node);
    }, 350);
    return () => clearTimeout(timer);
  }, [thread]);

  function sendReply() {
    const text = reply.trim();
    if (!text || !thread) return;
    onUpdate({ ...thread, preview: text, time: "Just now", unread: false, messages: [...thread.messages, { id: Date.now(), sender: "patient", text, time: "Just now" }] });
    setReply("");
    AccessibilityInfo.announceForAccessibility("Reply sent");
  }

  return (
    <Modal visible={thread !== null} animationType={reducedMotion ? "none" : "slide"} transparent onRequestClose={onClose}>
      <View style={[styles.modalBackdrop, wide && styles.wideModalBackdrop]}><View style={[styles.modalCard, wide && styles.wideModalCard]} accessible={false} accessibilityViewIsModal importantForAccessibility="yes">
        {thread ? <>
          <View style={styles.modalHeader}><View><Text ref={titleRef} accessible accessibilityRole="header" selectable style={styles.modalTitle}>{thread.provider.name}</Text><Text selectable style={styles.specialty}>{thread.provider.specialty}</Text></View><Pressable accessible accessibilityRole="button" accessibilityLabel="Close conversation" accessibilityHint="Returns to the inbox" onPress={onClose} style={styles.closeButton}><Text accessible={false} style={styles.close}>×</Text></Pressable></View>
          <ScrollView accessibilityLabel={`Messages with ${thread.provider.name}`} contentContainerStyle={styles.messages} keyboardShouldPersistTaps="handled">{thread.messages.map((message) => <View accessible accessibilityRole="summary" accessibilityLabel={`${message.sender === "patient" ? "You" : thread.provider.name}, ${message.text}, ${message.time}`} key={message.id} style={[styles.messageBubble, message.sender === "patient" ? styles.patientBubble : styles.providerBubble]}><Text selectable style={message.sender === "patient" ? styles.patientMessage : styles.providerMessage}>{message.text}</Text><Text selectable style={[styles.messageTime, message.sender === "patient" && styles.patientMessageTime]}>{message.time}</Text></View>)}</ScrollView>
          <View style={styles.replyRow}><TextInput accessible accessibilityLabel={`Reply to ${thread.provider.name}`} accessibilityHint="Enter a reply message" placeholder="Write a reply..." placeholderTextColor={colors.muted} value={reply} onChangeText={setReply} multiline style={styles.replyInput} /><AppButton label="Send" onPress={sendReply} accessibilityLabel="Send reply" accessibilityHint={`Sends this reply to ${thread.provider.name}`} disabled={!reply.trim()} /></View>
        </> : null}
      </View></View>
    </Modal>
  );
}

function NewMessageModal({ visible, wide, onClose, onSend }: { visible: boolean; wide: boolean; onClose: () => void; onSend: (provider: (typeof providers)[number], text: string) => void }) {
  const [selectedProvider, setSelectedProvider] = useState<(typeof providers)[number] | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const reducedMotion = useReducedMotion();
  const titleRef = useRef<Text>(null);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      const node = findNodeHandle(titleRef.current);
      if (node) AccessibilityInfo.setAccessibilityFocus(node);
    }, 350);
    return () => clearTimeout(timer);
  }, [visible]);

  function close() { setSelectedProvider(null); setMessage(""); setError(""); onClose(); }
  function send() {
    if (!selectedProvider || !message.trim()) { const errorMessage = "Choose a provider and enter a message to continue."; setError(errorMessage); AccessibilityInfo.announceForAccessibility(errorMessage); return; }
    onSend(selectedProvider, message.trim());
    setSelectedProvider(null);
    setMessage("");
    setError("");
  }

  return (
    <Modal visible={visible} animationType={reducedMotion ? "none" : "slide"} transparent onRequestClose={close}>
      <View style={[styles.modalBackdrop, wide && styles.wideModalBackdrop]}><View style={[styles.modalCard, wide && styles.wideModalCard]} accessible={false} accessibilityViewIsModal importantForAccessibility="yes"><ScrollView contentContainerStyle={styles.modalContent} keyboardShouldPersistTaps="handled">
        <View style={styles.modalHeader}><Text ref={titleRef} accessible accessibilityRole="header" selectable style={styles.modalTitle}>New message</Text><Pressable accessible accessibilityRole="button" accessibilityLabel="Close new message" accessibilityHint="Closes the form without sending" onPress={close} style={styles.closeButton}><Text accessible={false} style={styles.close}>×</Text></Pressable></View>
        <Text nativeID="provider-options-label" selectable style={styles.fieldLabel}>Send to a provider</Text>
        <View accessibilityRole="radiogroup" accessibilityLabelledBy="provider-options-label" style={styles.providerOptions}>{providers.map((provider) => <Pressable key={provider.name} accessible onPress={() => setSelectedProvider(provider)} style={[styles.providerOption, selectedProvider?.name === provider.name && styles.selectedProvider]} accessibilityRole="radio" accessibilityLabel={provider.name} accessibilityHint={`Selects ${provider.specialty} as the message recipient`} accessibilityState={{ selected: selectedProvider?.name === provider.name }}><Text selectable style={styles.optionName}>{provider.name}</Text><Text selectable style={styles.optionSpecialty}>{provider.specialty}</Text></Pressable>)}</View>
        <Text nativeID="new-message-label" selectable style={styles.fieldLabel}>Message</Text>
        <TextInput accessible accessibilityLabel="New message text" accessibilityLabelledBy="new-message-label" accessibilityHint="Enter the message for your provider" aria-invalid={Boolean(error) && !message.trim()} placeholder="Describe what you need help with" placeholderTextColor={colors.muted} value={message} onChangeText={setMessage} multiline numberOfLines={5} style={[styles.input, styles.messageInput]} />
        {error ? <Text accessible selectable accessibilityRole="alert" accessibilityLiveRegion="assertive" style={styles.error}>{error}</Text> : null}
        <View style={styles.modalActions}><AppButton label="Cancel" onPress={close} variant="secondary" accessibilityHint="Closes the form without sending" /><AppButton label="Send message" onPress={send} accessibilityHint="Sends this message to the selected provider" /></View>
      </ScrollView></View></View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, gap: spacing.md, paddingBottom: spacing.xl, width: "100%" },
  wideContent: { alignSelf: "center", maxWidth: 980 },
  titleRow: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: spacing.md },
  wideTitleRow: { flexWrap: "nowrap", alignItems: "flex-start" },
  flex: { flex: 1 },
  title: { color: colors.ink, fontSize: 30, fontWeight: "800" },
  subtitle: { color: colors.muted, fontSize: 16, marginTop: 3 },
  buttonIcon: { color: colors.white, fontSize: 18 },
  threadList: { gap: spacing.md },
  wideThreadList: { flexDirection: "row", flexWrap: "wrap", alignItems: "stretch" },
  threadCard: { flexDirection: "row", alignItems: "center", gap: spacing.md, padding: spacing.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 18 },
  wideThreadCard: { flexGrow: 1, flexBasis: "46%", minWidth: 320 },
  avatar: { width: 48, height: 48, borderRadius: 16, backgroundColor: colors.paleBlue, alignItems: "center", justifyContent: "center" },
  avatarText: { color: colors.navy, fontWeight: "800", fontSize: 15 },
  threadBody: { flex: 1, gap: 3 },
  threadHeader: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  provider: { flex: 1, color: colors.ink, fontSize: 17, fontWeight: "800" },
  specialty: { color: colors.muted, fontSize: 13 },
  time: { color: colors.muted, fontSize: 12 },
  preview: { color: colors.muted, fontSize: 14, lineHeight: 20, marginTop: 5 },
  unreadDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.blue },
  emptyHint: { padding: spacing.md, backgroundColor: colors.paleBlue, borderRadius: 15, gap: spacing.xs },
  emptyHintTitle: { color: colors.navy, fontWeight: "800" },
  emptyHintText: { color: colors.muted, fontSize: 14, lineHeight: 20 },
  pressed: { opacity: 0.72 },
  modalBackdrop: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(15, 28, 46, 0.42)" },
  wideModalBackdrop: { justifyContent: "center", alignItems: "center" },
  modalCard: { width: "100%", maxHeight: "92%", backgroundColor: colors.surface, borderTopLeftRadius: 26, borderTopRightRadius: 26, borderCurve: "continuous" },
  wideModalCard: { width: "92%", maxWidth: 680, alignSelf: "center", borderRadius: 26 },
  modalContent: { padding: spacing.lg, gap: spacing.sm },
  modalHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: spacing.sm },
  modalTitle: { color: colors.ink, fontSize: 23, fontWeight: "800" },
  close: { color: colors.muted, fontSize: 32, lineHeight: 32 },
  closeButton: { minWidth: 44, minHeight: 44, alignItems: "center", justifyContent: "center" },
  messages: { paddingHorizontal: spacing.lg, paddingBottom: spacing.md, gap: spacing.sm },
  messageBubble: { maxWidth: "84%", padding: spacing.md, borderRadius: 16, gap: spacing.xs },
  providerBubble: { alignSelf: "flex-start", backgroundColor: colors.paleBlue, borderBottomLeftRadius: 5 },
  patientBubble: { alignSelf: "flex-end", backgroundColor: colors.navy, borderBottomRightRadius: 5 },
  providerMessage: { color: colors.ink, fontSize: 15, lineHeight: 21 },
  patientMessage: { color: colors.white, fontSize: 15, lineHeight: 21 },
  messageTime: { color: colors.muted, fontSize: 11 },
  patientMessageTime: { color: "#D4DEED" },
  replyRow: { flexDirection: "row", alignItems: "flex-end", gap: spacing.sm, padding: spacing.lg, borderTopWidth: 1, borderTopColor: colors.border },
  replyInput: { flex: 1, minHeight: 48, maxHeight: 100, borderWidth: 2, borderColor: colors.muted, borderRadius: 12, paddingHorizontal: 13, paddingVertical: 11, color: colors.ink, fontSize: 15 },
  fieldLabel: { color: colors.ink, fontSize: 14, fontWeight: "700", marginTop: spacing.sm },
  providerOptions: { gap: spacing.sm },
  providerOption: { minHeight: 44, padding: spacing.md, borderWidth: 2, borderColor: "#60738F", borderRadius: 12, gap: 3 },
  selectedProvider: { borderColor: colors.navy, backgroundColor: colors.paleBlue },
  optionName: { color: colors.ink, fontWeight: "800" },
  optionSpecialty: { color: colors.muted, fontSize: 13 },
  input: { minHeight: 48, borderWidth: 2, borderColor: colors.muted, borderRadius: 11, paddingHorizontal: 13, paddingVertical: 11, color: colors.ink, fontSize: 15, backgroundColor: "#FCFDFE" },
  messageInput: { minHeight: 120, textAlignVertical: "top" },
  error: { color: colors.red, fontWeight: "700", paddingVertical: spacing.sm },
  modalActions: { flexDirection: "row", justifyContent: "flex-end", gap: spacing.sm, marginTop: spacing.md },
});

import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore"
import { db } from "./firebase"

export interface Message {
  id?: string
  conversationId: string
  senderId: string
  senderType: "citizen" | "business"
  content: string
  timestamp: any
  read: boolean
}

export interface Conversation {
  id?: string
  citizenId: string
  businessId: string
  lastMessage?: string
  lastMessageTime?: any
  citizenUnreadCount: number
  businessUnreadCount: number
  status: "active" | "archived"
}

// Create or get existing conversation
export async function getOrCreateConversation(citizenId: string, businessId: string): Promise<string> {
  const conversationsRef = collection(db, "conversations")
  const q = query(conversationsRef, where("citizenId", "==", citizenId), where("businessId", "==", businessId))

  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].id
  }

  // Create new conversation
  const newConversation: Omit<Conversation, "id"> = {
    citizenId,
    businessId,
    citizenUnreadCount: 0,
    businessUnreadCount: 0,
    status: "active",
  }

  const docRef = await addDoc(conversationsRef, newConversation)
  return docRef.id
}

// Send message
export async function sendMessage(
  conversationId: string,
  senderId: string,
  senderType: "citizen" | "business",
  content: string,
): Promise<void> {
  const messagesRef = collection(db, "messages")

  const message: Omit<Message, "id"> = {
    conversationId,
    senderId,
    senderType,
    content,
    timestamp: serverTimestamp(),
    read: false,
  }

  await addDoc(messagesRef, message)

  // Update conversation
  const conversationRef = doc(db, "conversations", conversationId)
  const updateData: any = {
    lastMessage: content,
    lastMessageTime: serverTimestamp(),
  }

  if (senderType === "citizen") {
    updateData.businessUnreadCount = 1
  } else {
    updateData.citizenUnreadCount = 1
  }

  await updateDoc(conversationRef, updateData)
}

// Listen to messages in a conversation
export function subscribeToMessages(conversationId: string, callback: (messages: Message[]) => void) {
  const messagesRef = collection(db, "messages")
  const q = query(messagesRef, where("conversationId", "==", conversationId), orderBy("timestamp", "asc"))

  return onSnapshot(q, (snapshot) => {
    const messages: Message[] = []
    snapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() } as Message)
    })
    callback(messages)
  })
}

// Get conversations for a user
export function subscribeToConversations(
  userId: string,
  userType: "citizen" | "business",
  callback: (conversations: Conversation[]) => void,
) {
  const conversationsRef = collection(db, "conversations")
  const field = userType === "citizen" ? "citizenId" : "businessId"
  const q = query(conversationsRef, where(field, "==", userId), orderBy("lastMessageTime", "desc"))

  return onSnapshot(q, (snapshot) => {
    const conversations: Conversation[] = []
    snapshot.forEach((doc) => {
      conversations.push({ id: doc.id, ...doc.data() } as Conversation)
    })
    callback(conversations)
  })
}

// Mark messages as read
export async function markMessagesAsRead(conversationId: string, userType: "citizen" | "business"): Promise<void> {
  const conversationRef = doc(db, "conversations", conversationId)
  const field = userType === "citizen" ? "citizenUnreadCount" : "businessUnreadCount"

  await updateDoc(conversationRef, {
    [field]: 0,
  })
}

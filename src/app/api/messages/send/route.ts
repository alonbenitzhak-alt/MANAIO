import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { sendAdminChatNotification } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { conversationId, content, senderId } = await req.json();

    if (!conversationId || !content || !senderId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Get conversation details
    const { data: conversation } = await supabase
      .from("conversations")
      .select("*, sender:profiles!messages.sender_id(email, full_name, role), recipient:profiles!conversations.agent_id(email, full_name)")
      .eq("id", conversationId)
      .single();

    if (!conversation) {
      return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
    }

    // Get sender and recipient info
    const { data: senderProfile } = await supabase
      .from("profiles")
      .select("email, full_name, role")
      .eq("id", senderId)
      .single();

    if (!senderProfile) {
      return NextResponse.json({ error: "Sender not found" }, { status: 404 });
    }

    // Get recipient info based on conversation
    const recipientId = conversation.buyer_id === senderId ? conversation.agent_id : conversation.buyer_id;
    const { data: recipientProfile } = await supabase
      .from("profiles")
      .select("email, full_name, role")
      .eq("id", recipientId)
      .single();

    if (!recipientProfile) {
      return NextResponse.json({ error: "Recipient not found" }, { status: 404 });
    }

    // Send email to admin
    try {
      await sendAdminChatNotification({
        senderName: senderProfile.full_name || senderProfile.email,
        senderEmail: senderProfile.email,
        senderRole: senderProfile.role,
        recipientName: recipientProfile.full_name || recipientProfile.email,
        messageContent: content,
        conversationId,
      });
    } catch (emailError) {
      console.error("Failed to send admin notification email:", emailError);
      // Continue even if email fails - don't block message sending
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error in send message route:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
